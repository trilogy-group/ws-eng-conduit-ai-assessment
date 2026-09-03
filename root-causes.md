# Root Causes

Please copy-paste the final answer that you obtained from the AI for each question. The chat interface has a copy button that you can use to copy each message in Markdown format. Please do NOT include images or screenshots.

## Problem 1

**Problem**: The tags are broken up into individual characters on the post view page.

**Question**: What is the underlying issue that causes this problem to occur and from which component (file) of this project does this issue originate?

**Answer**: The backend was building the article’s tag list by spreading the incoming `tagList` value: `article.tagList.push(...dto.tagList)`. When clients send `tagList` as a string, the spread operator splits it into single characters, which then render as individual characters in the UI. This originates in apps/backend/src/article/article.service.ts (create; update had similar risk).


## Problem 2

**Problem**: New tags  are not shown on the home page under "Popular Tags", even after a page refresh.

**Question**: What is the underlying issue that causes this problem to occur and from which component (file) of this project does this issue originate?

**Answer**: The “Popular Tags” endpoint (`GET /tags`) reads from the `Tag` table (apps/backend/src/tag). New article tags were never upserted into this table when creating/updating articles, so recently added tags never appeared after refresh. Root cause is missing tag upsert logic in apps/backend/src/article/article.service.ts and the Article module not wiring the Tag entity, fixed by adding Tag to apps/backend/src/article/article.module.ts and upserting tags during create/update in the service.
