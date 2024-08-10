# Root Causes

Please copy-paste the final answer that you obtained from the AI for each question. The chat interface has a copy button that you can use to copy each message in Markdown format. Please do NOT include images or screenshots.

## Problem 1

**Problem**: The tags are broken up into individual characters on the post view page.

**Question**: What is the underlying issue that causes this problem to occur and from which component (file) of this project does this issue originate?

**Answer**:  The underlying issue is that the tags are being treated as a single string rather than an array of strings. The tags are not properly parsed or transformed when creating or updating articles. If the tags are stored or sent as a single concatenated string (e.g., "tag1,tag2,tag3") and then displayed without splitting them into an array, they will appear as individual characters.

The issue originates from the backend component responsible for handling the creation and updating of articles. Specifically, it can occur in the following file:

File: src/articles/article.controller.ts

This file contains the logic for creating and updating articles, where tags need to be correctly parsed and stored as an array of strings. 


These files contain the necessary changes to ensure that tags are handled correctly, addressing the issues with tags being broken up into individual characters


## Problem 2

**Problem**: New tags  are not shown on the home page under "Popular Tags", even after a page refresh.

**Question**: What is the underlying issue that causes this problem to occur and from which component (file) of this project does this issue originate?

**Answer**: Underlying Issue
The underlying issue is likely that the new tags are not being correctly saved or updated in the database when an article is created or updated. Additionally, the service responsible for fetching the popular tags may not be correctly retrieving the updated list of tags from the database.

Originating Component
This issue can originate from the following components:

Article Service (src/articles/article.service.ts):

If the tags are not correctly associated with the article when it is created or updated, they will not be saved in the database.
The method responsible for creating or updating articles should ensure that tags are correctly added to the database.
Tag Service (src/tags/tag.service.ts):

If the service responsible for fetching popular tags is not correctly retrieving the updated list of tags, the new tags will not be shown on the home page.
The method responsible for fetching tags should ensure that it retrieves the latest tags from the database.
By ensuring that tags are correctly saved when articles are created or updated and that the latest tags are retrieved when fetching popular tags, the issue of new tags not being shown on the home page can be resolved.
