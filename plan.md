# Implementation Plan: Article Co-Authors and Edit Locking

User story: As a user, I want to add co-authors to my articles so that multiple people can edit them together.

This plan targets the ADVANCED scope and naturally covers the BASIC scope along the way.

## Plan

1) Analyze and Baseline (done)
- Review backend entities (Article, User, Comment), services and controllers to understand current create/update flow.
- Review migrations layout (Mikro-ORM), DTOs, and frontend editor flow (ArticleEditor, New/Edit pages, conduit service).

2) Data Model Changes (backend)
- Add Article.coAuthors: many-to-many relation to User via a pivot table article_coauthors (article_id, user_id).
- Add optimistic edit-lock fields to Article to support ADVANCED locking:
  - lockedBy: nullable ManyToOne to User (lock owner).
  - lockExpiresAt: nullable datetime (server time). Treated as expired if now > lockExpiresAt.
- Migration: create pivot table and add the two lock columns and foreign keys. Keep existing tables intact.

3) API Contract Changes (backend)
- Extend Create/Update Article DTOs to accept co-authors using two optional fields (supporting BASIC and ADVANCED input styles):
  - coAuthorIds?: number[] (preferred; used by advanced multi-select UI)
  - coAuthorEmails?: string[] (fallback; used by basic comma-separated input)
- Find article endpoints: include coAuthors in the returned payload so the frontend can authorize editing and pre-populate selections.
- New endpoints for locking (ADVANCED):
  - POST /articles/:slug/lock → acquire or refresh lock for current user; returns 200 on success; 423 Locked if held by another active user.
  - POST /articles/:slug/heartbeat → refresh lock (extends expiry to now + 5 minutes) if current user holds it; 423 if not.
  - POST /articles/:slug/unlock → release lock if held by current user (no-op if expired or already released).
- Update semantics for PUT /articles/:slug:
  - If an active lock exists and it is not owned by the current user, return 423 Locked.
  - If no lock or lock is expired or owned by the current user, allow update (BASIC still satisfied: last save wins when no locking is enabled client-side).

4) Backend Implementation Details
- Entity (backend/src/article/article.entity.ts):
  - Add ManyToMany coAuthors: Collection<User> with owner=true, pivot table article_coauthors.
  - Add lockedBy?: User and lockExpiresAt?: Date.
  - Update toJSON() to include coAuthors (serialize using User.toJSON minimal fields), and lock metadata (lockedBy id/username and lockExpiresAt) if helpful to the client.
- DTOs (backend/src/article/dto/create-article.dto.ts):
  - Add coAuthorIds?: number[]; coAuthorEmails?: string[].
- Service (backend/src/article/article.service.ts):
  - create(): resolve coAuthors from coAuthorIds (first) or coAuthorEmails (second). Ignore emails that don’t map to users; do not fail creation.
  - update(): same co-author resolution/update. Enforce active-lock ownership as described. Populate author and coAuthors in responses.
  - findOne()/findAll()/findFeed(): include coAuthors in populate when returning an article payload.
  - Lock helpers:
    - acquireOrRefreshLock(userId, slug): if no lock or expired or owner==userId → set lockedBy=userId and lockExpiresAt=now+5m; else throw 423.
    - heartbeat(userId, slug): if lock owner==userId and not expired → extend by 5m; else throw 423.
    - unlock(userId, slug): if owner==userId → clear fields; ignore otherwise (idempotent).
  - Server-side safety: on every lock check, treat expired locks as cleared (no separate job required).
- Controller (backend/src/article/article.controller.ts):
  - Accept co-author fields on POST/PUT.
  - Add /lock, /heartbeat, /unlock handlers returning simple { ok: true } or 423 with { error: 'Article is currently locked by ...' }.
- User listing (backend/src/user/user.controller.ts):
  - Reuse existing GET /users endpoint with pagination. Frontend will request a large limit (e.g., limit=1000) to build the multi-select.

5) Frontend Types & Services
- Types (frontend/src/types/article.ts):
  - Extend Article with coAuthors: User[] (minimal shape: id, username, email, image).
  - Extend ArticleForEditor with:
    - coAuthorIds?: number[]
    - coAuthorEmailsCsv?: string (for BASIC text input; converted to array on submit)
- Service (frontend/src/services/conduit.ts):
  - createArticle/updateArticle: include coAuthorIds (if any) or coAuthorEmails (parsed from CSV) in the request body.
  - Add functions: lockArticle(slug), heartbeatArticle(slug), unlockArticle(slug).
  - Ensure getArticle decodes coAuthors field.

6) Frontend UI & State
- Editor slice (frontend/src/components/ArticleEditor/ArticleEditor.slice.tsx):
  - Add state: coAuthorIds: number[]; coAuthorEmailsCsv: string; users: User[]; lockError?: string.
  - Actions: setCoAuthorIds, setCoAuthorEmailsCsv, setUsers, setLockError.
- ArticleEditor component (frontend/src/components/ArticleEditor/ArticleEditor.tsx):
  - Add a new field group "Co-Authors":
    - BASIC: a text input placeholder "Comma-separated emails" bound to coAuthorEmailsCsv.
    - ADVANCED: a multi-select/dropdown of users (id + username/email). Implementation: simple <select multiple> populated from users list; dispatch selected ids to coAuthorIds.
  - No heavy third-party components; keep to basic HTML/select to minimize dependencies.
- NewArticle page (frontend/src/components/Pages/NewArticle/NewArticle.tsx):
  - On mount, load users list (GET /users?limit=1000) into editor state for the multi-select.
  - On submit, include coAuthorIds if selected or parse coAuthorEmailsCsv → coAuthorEmails array.
- EditArticle page (frontend/src/components/Pages/EditArticle/EditArticle.tsx):
  - Authorization: allow editing if current user is the original author OR included in article.coAuthors.
  - Lock lifecycle (ADVANCED):
    - On mount: call lockArticle(slug). If 423 → show error (store in editor.errors) and redirect to article view page.
    - Heartbeat: setInterval every 30s to heartbeatArticle(slug). If it fails (423/network), clear interval, show error toast, and redirect to article view.
    - On unmount or after successful save: call unlockArticle(slug) and clear the interval.
  - Form pre-fill: also populate coAuthorIds from article.coAuthors for the multi-select.

7) Locking Semantics
- Online definition: a user is considered online while they hold the article lock and send heartbeats. The lock expires 5 minutes after the last successful heartbeat (or acquisition), satisfying the “5 minutes after last seen online” requirement.
- Error messaging:
  - When attempting to acquire or heartbeat and the lock is held by someone else → show an error message and prevent editing.
  - If a user loses the lock mid-edit (e.g., network loss) → next heartbeat fails; we show an error and redirect to view.

8) Migration & Deployment Considerations
- Create a new Mikro-ORM migration that:
  - Creates article_coauthors (article_id, user_id) with FK constraints and composite PK.
  - Adds locked_by_id (nullable FK to user.id) and lock_expires_at (nullable datetime) to article.
- Seed data doesn’t require changes; legacy articles will simply have no co-authors and no lock fields set.
- The AWS architecture (RDS MySQL + ECS/ECR per provided diagram) requires no infra changes; locking is DB-backed and stateless per application instance.

9) Acceptance Test Mapping
- Test 1 (co-author add + save): Use NewArticle to add John as co-author via multi-select (or email CSV); save; ensure success. Screenshot the creation with co-authors field filled.
- Test 2 (co-author can edit): Log in as John, open the article, acquire lock automatically, edit, and save. Screenshot the edit page with ability to save.
- Test 3:
  - BASIC path: without using locks (if lock endpoints not called), last save wins (already the default semantics of update).
  - ADVANCED path: with lock lifecycle enabled in EditArticle, second user attempting to edit sees an error due to an active lock. Screenshot the error message.

10) Order of Work (estimated timeline)
- Backend data model and migration (20–25m)
- Backend DTOs, service, controller updates inc. lock endpoints (25–35m)
- Frontend types and services (15–20m)
- Frontend Editor slice and UI changes (25–30m)
- Edit page lock lifecycle + auth changes (20–25m)
- Manual testing and screenshots (15–20m)

## Decisions

1) Data model for co-authors
- Decision: Many-to-many (Article ⇄ User) with pivot table article_coauthors.
  - Alternative: Store co-author emails array on Article (ArrayType).
  - Alternative: Denormalized JSON column with user ids.
  - Rationale: A relational pivot is the cleanest, supports joins, constraints, and population with Mikro-ORM, and avoids denormalization pitfalls.

2) Lock representation
- Decision: Columns on Article (lockedBy, lockExpiresAt).
  - Alternative: Separate ArticleLock entity/table with 1:1 relation.
  - Alternative: In-memory/node-level lock (e.g., Map) with TTL.
  - Rationale: Columns on Article are simplest and fully compatible with multi-instance deployments (AWS ECS). A separate table adds complexity; in-memory would break under scaling.

3) Co-author input UX
- Decision: Implement a simple multi-select fed by GET /users for ADVANCED, with a fallback CSV email input for BASIC.
  - Alternative: Add a new searchable typeahead dependency.
  - Alternative: Server-side email search endpoint and chips UI.
  - Rationale: Keep dependencies minimal and scope tight while meeting requirements; a basic multi-select achieves ADVANCED without third-party UI libraries.

## Notes

- Authorization: The original code does not enforce author-only updates on the backend. For the locking story, the backend will enforce the lock owner on update when an active lock exists; otherwise behavior remains unchanged. The frontend will additionally restrict access to Edit page to author or co-author to satisfy the story.
- Unknown co-author emails: When using BASIC CSV input, any email that does not match a user will be ignored (not an error) to keep UX simple.
- Time source: Server-side lock expiry uses DB/server time. Heartbeat interval is ~30s; expiry is 5 minutes after last successful acquisition/heartbeat.
- Non-goals: Displaying co-authors in article read pages or feeds (out of scope). Existing pages continue to show the original author only, per scope note.
- AWS/Infra: No changes needed to the architecture; all new features are API and DB only.


