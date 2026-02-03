# Implementation Plan

## Plan

### Phase 1: Data Model (Backend)

1. **Create ArticleCoAuthor junction entity**
   - Fields: articleId, userId, addedAt (timestamp)
   - Proper MikroORM many-to-many relation
   - Migration to create table

2. **Create ArticleLock entity** (separate table for clean separation)
   - Fields: id, articleId (unique), userId, acquiredAt, lastSeenAt
   - One-to-one relation with Article
   - Allows lock history if needed later

### Phase 2: Backend Services & API

3. **Create LockService** (dedicated service)
   - `acquireLock(articleId, userId)` - Atomic acquisition with conflict check
   - `releaseLock(articleId, userId)` - Explicit release
   - `refreshLock(articleId, userId)` - Heartbeat update
   - `isLocked(articleId, excludeUserId?)` - Check lock status
   - `cleanupExpiredLocks()` - Called before any lock operation (5-min timeout)

4. **Create LockGuard** (NestJS Guard)
   - Applied to PUT /articles/:slug
   - Verifies user holds the lock before allowing edit
   - Returns 423 Locked status with lock holder info

5. **Update ArticleService**
   - Add/remove co-authors on create/update
   - Check authorization: author OR co-author can edit

6. **New API Endpoints**
   - GET `/api/users` - List all users for dropdown
   - POST `/api/articles/:slug/lock` - Acquire lock
   - DELETE `/api/articles/:slug/lock` - Release lock
   - PUT `/api/articles/:slug/lock` - Refresh lock (heartbeat)
   - GET `/api/articles/:slug/lock` - Check lock status

7. **Custom Exceptions**
   - ArticleLockedException (423) - Article locked by another user
   - LockExpiredException (409) - Your lock has expired

### Phase 3: Frontend

8. **Create UserService** 
   - Fetch all users for dropdown

9. **Update ArticleEditor component**
   - Multi-select dropdown for co-authors
   - On mount: Call acquire lock API
   - On unmount/navigation: Call release lock API
   - Heartbeat: Refresh lock every 30 seconds
   - Handle lock errors with user-friendly messages

10. **Redux Lock State**
    - Track current lock status
    - Handle lock acquisition/loss
    - Show appropriate UI feedback

### Phase 4: Testing & Screenshots

11. Execute acceptance tests and capture screenshots

## Decisions

### Decision 1: Lock Storage Architecture
- **Selected: Separate ArticleLock entity**
- Alternative A: Add lock fields directly to Article entity
- Alternative B: Separate ArticleLock table (SELECTED)
- Alternative C: In-memory/Redis distributed lock
- Rationale: 
  - Separate entity provides clean separation of concerns
  - Allows future extensibility (lock history, multiple lock types)
  - No Redis in stack, so Alternative C requires infrastructure changes
  - Alternative A mixes article data with transient lock state

### Decision 2: Lock Acquisition Strategy  
- **Selected: Atomic check-and-set with cleanup**
- Alternative A: Simple UPDATE with WHERE clause
- Alternative B: SELECT FOR UPDATE with transaction (SELECTED)
- Alternative C: Optimistic locking with version field
- Rationale:
  - SELECT FOR UPDATE prevents race condition when two users click edit simultaneously
  - Cleanup of expired locks happens atomically in same transaction
  - More robust than simple UPDATE which could have TOCTOU issues

### Decision 3: Co-author Selection UI
- **Selected: Multi-select dropdown with user search**
- Alternative A: Comma-separated email text input (BASIC only)
- Alternative B: Multi-select dropdown from user list (SELECTED)
- Alternative C: Autocomplete with user search
- Rationale:
  - Dropdown prevents typos in email addresses
  - Shows only valid users who can actually be co-authors
  - Better UX than free-text input
  - Simpler than autocomplete while meeting requirements

## Notes

### AWS Architecture
- No changes needed - all changes within existing backend/frontend containers
- Database schema changes handled by MikroORM migrations

### Edge Cases Handled
1. **Browser crash/close**: Lock expires after 5 minutes of no heartbeat
2. **Network failure**: Heartbeat failure triggers warning to user; lock eventually expires
3. **Race condition on edit**: SELECT FOR UPDATE ensures only one user gets lock
4. **User loses lock while editing**: Next save attempt returns 423/409, user sees error with current article content

### Performance Considerations
- Lock cleanup runs lazily (before lock operations) to avoid cron job complexity
- Heartbeat every 30 seconds balances responsiveness vs server load
- User list cached on frontend (doesn't change during session)