**Implementation Plan**

This document contains the complete plan for implementing the user story before coding begins, following the required structure.

**Plan**
1. Understand the User Story

The user story requires:

Extending the Article model with new fields needed for creating and editing articles.

Updating backend entities, DTOs, services, and controllers.

Updating the frontend to allow users to create, edit, and display articles with the new fields.

Introducing a new technical pattern as required by the assessment (usually: introduce a shared abstraction, repository wrapper, or data-mapping layer).

Ensuring all changes work within the AWS-based architecture.

2. Backend Data Model Changes

Update the Article entity to include the new fields required by the user story (e.g., summary, subtitle, metadata, or additional content fields).

Generate a new MikroORM migration that adds the columns or tables.

Update the Article DTOs (create/update/read) so the API exposes the new structure.

Update the Article service to handle the new fields consistently.

Update validation in DTOs to enforce constraints at the API boundary.

3. Backend API Changes

Add or update the required endpoints in the Article controller:

POST /articles

PUT /articles/:slug or :id

GET /articles/:slug

Ensure Swagger decorators reflect the updated data structures.

Make sure the API still respects authentication and authorization rules.

Update any repository queries that fetch Article objects to include the new fields.

4. Introduce the Required Technical Pattern

The assessment requires adding a new pattern to the codebase.
For this user story, I will introduce a mapper layer (or pattern chosen by the story) that:

Transforms Article entities ⇄ DTO responses.

Centralizes transformation/formatting logic.

Ensures the frontend receives consistently shaped objects.

Keeps controllers thin and follows clean architecture.

Steps:

Create a ArticleMapper class (or the required pattern).

Use it in controllers to produce responses.

Optionally refactor existing Article endpoints to use the mapper for consistency.

5. Frontend Changes

Update the Article type interface to include the new fields.

Update or create:

Article Editor page/component (for create + edit flows).

Article View page (to display new fields).

Add new form inputs for the added fields.

Update API functions in frontend/src/api/articles.ts to send/receive new fields.

Ensure UI:

Validates required inputs.

Shows proper error messages.

Updates state using React patterns already used in the project.

6. End-to-End Integration Tests (Manual)

Start backend and frontend in Codespaces.

Log in using provided credentials.

Perform full article lifecycle:

Create article (with new fields).

Edit article.

View article.

Confirm data persists by refreshing the page.

Capture required screenshots.

7. Final Steps Before Submission

Ensure all migrations run cleanly.

Ensure Swagger docs match actual API behavior.

Ensure the mapper pattern is applied consistently.

Take screenshots showing acceptance criteria passing.

Push all commits to the correct branch (rwa/design-and-implementation-v2).

Verify Cline history is intact.

Decisions
Decision 1: Modify Existing Article Entity Instead of New Table

Alternatives considered:

A: Modify existing Article table (chosen)

B: Create a separate table and join

C: Store the fields in a JSON column

Rationale:
The new fields logically belong to the Article domain.
Adding columns keeps queries simple, preserves the existing API structure, and follows existing patterns in the codebase.

Decision 2: Introduce a Mapper Layer as the New Technical Pattern

Alternatives considered:

A: Add a dedicated mapper class (chosen)

B: Do mapping directly inside controllers

C: Add mapping inside services

Rationale:
Controller-based mapping creates duplication.
Service-based mapping mixes concerns.
Mapper classes centralize transformation logic, follow clean architecture practices, and allow frontend-facing response objects to stay consistent.

Decision 3: Update Existing Editor Page Instead of Creating a New One

Alternatives considered:

A: Extend existing Article editor (chosen)

B: Build a new editor screen

C: Add new modals/components inside the old UI

Rationale:
The existing editor already contains most UX patterns needed.
Adding fields inside the current editor minimizes code duplication and follows the current design system.

Notes

No AWS architecture changes are required; feature fits inside current Lambda/API Gateway/MySQL structure.

All migrations must be forward/backward compatible.

The frontend and backend must remain aligned with Typescript interfaces/DTOs.

Performance impacts are negligible as articles are small objects and not high-throughput.
