# Implementation Plan: Article Co-Authors Feature

## Overview

**User Story:**  
As a user, I want to add co-authors to my articles so that multiple people can edit them together.

This plan covers both BASIC and ADVANCED requirements, and outlines the technical approach, major steps, and rationale for each decision. It is structured to maximize alignment with the assessment's evaluation criteria: plan soundness, code quality, correctness, AI usage, and velocity.

---

## 1. Assessment & Submission Requirements

- **Branch:** All work will be done on `rwa/design-and-implementation-v2`.
- **AI Tool:** All code changes and planning will be guided and executed via Cline, with clear, referenced instructions.
- **Plan:** This plan.md is created before implementation and will be preserved in the repository.
- **Screenshots:** Manual acceptance tests will be run and screenshots placed in the `submission` folder.
- **Cline History:** Cline chat history will be preserved for submission.
- **AWS Compatibility:** All changes will be compatible with the existing AWS-based architecture.
- **No unrelated changes:** Only the user story scope will be addressed.

---

## 2. Evaluation Criteria Mapping

| Criteria         | Plan Approach                                                                                  |
|------------------|----------------------------------------------------------------------------------------------|
| Plan Soundness   | Detailed, step-by-step plan with rationale for each decision.                                 |
| Code Quality     | Clean, modular, and maintainable code; follows project conventions and best practices.        |
| Correctness      | All user story requirements (BASIC & ADVANCED) addressed; acceptance tests mapped to steps.   |
| AI Usage         | All changes guided via Cline, with explicit file references and clear instructions.           |
| Velocity         | Plan enables efficient, focused implementation; checklist for tracking progress.              |

---

## 3. Data Model Changes

### 3.1. Article Entity
- Add a many-to-many relationship between Article and User for co-authors.
  - **Rationale:** Enables flexible assignment of multiple co-authors per article.
- The original author remains as a single "author" field.
- Add a new field: `coAuthors: User[]` (MikroORM: `@ManyToMany`).

### 3.2. Database Migration
- Create a migration to add the join table for article co-authors.
  - **Rationale:** Ensures DB schema is versioned and compatible with AWS deployment.

---

## 4. Backend API Changes

### 4.1. DTOs & Validation
- Update CreateArticleDto and UpdateArticleDto to accept a list of co-author emails (BASIC) or user IDs (ADVANCED).
- Validate that all co-authors exist and are not duplicates.
  - **Rationale:** Prevents invalid or duplicate co-author assignments.

### 4.2. Article Creation
- On article creation, associate co-authors based on provided emails/IDs.
- Only allow the creator to add co-authors.

### 4.3. Article Editing
- Allow editing if the user is the author or a co-author.
- Update permissions logic in the article service/controller.

### 4.4. Article Locking (ADVANCED)
- Implement a locking mechanism:
  - When a co-author opens the edit page, set a lock in the DB (articleId, userId, timestamp).
  - Lock is released on save, navigation away, or after 5 minutes of inactivity.
  - If locked, other co-authors receive an error when attempting to edit.
  - If a user loses the lock (e.g., disconnect), show an error on next action.
  - **Rationale:** Prevents conflicting edits and ensures data integrity.

### 4.5. API Endpoints
- Update POST/PUT /articles endpoints to handle co-authors and locking.
- Add endpoints for:
  - Fetching all users (for multi-select dropdown).
  - Checking/setting/releasing article locks.

---

## 5. Frontend Changes

### 5.1. Create Article Page
- Add a "Co-Authors" field:
  - BASIC: Comma-separated email input.
  - ADVANCED: Multi-select dropdown of users (fetch from backend).
- Validate input and display errors for invalid emails/users.

### 5.2. Edit Article Page
- Allow co-authors to edit if permitted.
- Show error if article is locked by another user (ADVANCED).
- Show which user holds the lock (optional/ADVANCED).

### 5.3. Locking UI (ADVANCED)
- On edit, request lock from backend.
- Show error if lock cannot be acquired.
- Release lock on save, navigation, or after 5 minutes of inactivity.
- Show error if lock is lost.

### 5.4. General
- Ensure all other pages show only the original author as per requirements.

---

## 6. Manual Acceptance Testing & Evidence

- Log in as Zolly, create article, add John as co-author, save. Take screenshot.
- Log in as John, edit article, save. Take screenshot.
- Log in as Zolly in incognito, try to edit:
  - BASIC: Both can edit, last save wins. Take screenshot.
  - ADVANCED: Error if locked. Take screenshot.
- Place all screenshots in the `submission` folder (no subfolders).

---

## 7. Optional Story (For Reference)

- Show which co-author is editing (lock holder).
- Allow original author to forcibly unlock.
- Notify displaced co-author and allow backup of their version.

---

## 8. Key Decisions & Rationale

- Use many-to-many for co-authors for flexibility and future extensibility.
- Locking is managed server-side for reliability and to support distributed/AWS deployment.
- Multi-select dropdown improves UX for ADVANCED.
- All changes are backward-compatible; unrelated features/pages are untouched.
- All code and planning is done via Cline for full AI usage compliance.

---

## 9. Implementation Steps Checklist

- [ ] Update Article entity and create migration for co-authors
- [ ] Update DTOs and validation logic
- [ ] Update backend services/controllers for co-author logic
- [ ] Implement locking mechanism (ADVANCED)
- [ ] Update frontend create/edit article pages for co-author selection
- [ ] Implement frontend logic for locking and error handling (ADVANCED)
- [ ] Manual acceptance tests and screenshots
- [ ] (Optional) Implement optional story features
