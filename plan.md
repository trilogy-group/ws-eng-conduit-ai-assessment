Implementation Plan

This document describes the implementation plan for adding co-authors and collaborative editing with locking to the Article domain.

Plan
High-Level Step-by-Step Plan

Extend the Data Model

Add a Many-to-Many relationship between Article and User to support co-authors.

Add locking fields to the Article entity:

lockedBy (User reference)

lockedAt (timestamp)

Generate and run a database migration.

Update Backend Logic

Update the article creation logic to accept co-author IDs.

Modify edit permissions to allow both the original author and co-authors to edit.

Implement a lock acquisition endpoint:

POST /articles/:slug/lock

Add lock validation during article updates.

Implement automatic lock expiration (5 minutes).

Implement BASIC Frontend Changes

Add a "Co-Authors" field on the Create Article page.

Allow users to enter comma-separated email addresses.

Convert emails to user IDs before submission.

Ensure last-write-wins behavior works naturally.

Implement ADVANCED Frontend Changes

Replace comma-separated input with a multi-select dropdown of all users.

On Edit page load:

Attempt to acquire lock.

Show error if article is locked by another user.

On save:

Validate lock ownership.

Handle lock loss errors gracefully.

Optional Story (Force Unlock)

Add endpoint:

POST /articles/:slug/force-unlock

Only original author can use it.

When triggered:

Transfer lock to original author.

Notify current editor via frontend popup.

Redirect current editor to view page.

Testing

Manually execute all three acceptance tests.

Capture screenshots.

Verify lock expiration behavior.

Ensure existing features remain unaffected.

Decisions
Decision 1: Store Locks in the Database

Alternative: Store locks in memory (per backend instance).

Alternative: Use Redis as a distributed lock store.

Rationale:
Since the production environment runs on AWS ECS with potentially multiple backend instances behind a load balancer, in-memory locks would not work reliably.
Redis would work but introduces unnecessary infrastructure complexity for this scope.
Therefore, we store locks in the MySQL database to ensure consistency across all instances.

Decision 2: Use Many-to-Many Relationship for Co-Authors

Alternative: Store co-author emails as a JSON column.

Alternative: Store co-author IDs as a comma-separated string.

Rationale:
A Many-to-Many relationship maintains referential integrity, supports joins, and keeps the data normalized.
JSON or string-based storage would make querying, validation, and permission checks more complex and less maintainable.

Decision 3: Implement Time-Based Lock Expiry

Alternative: Use WebSockets for real-time presence detection.

Alternative: Use heartbeat polling to maintain active locks.

Rationale:
WebSockets would add complexity and are not required for the acceptance tests.
A simple time-based lock expiration (5 minutes) ensures that locks are eventually released if a user disconnects unexpectedly.
This approach is simpler, scalable, and sufficient for the given requirements.

Notes

No AWS infrastructure changes are required.

The solution remains fully compatible with:

ECS auto-scaling

Aurora MySQL

Stateless backend design

Locking logic is database-driven, ensuring horizontal scalability.

No WebSocket or additional third-party services are introduced.

Existing pages and behaviors remain unchanged, preserving backward compatibility.
