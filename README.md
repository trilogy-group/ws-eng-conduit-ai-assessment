# Conduit - AI Augmented Defect Resolution

In this assessment, you will be presented with a realistic task that closely resembles issues you may face on the job. Your challenge in this assignment is to act as a mentor for and guide GPT to determine the root cause of a defect and then fix it. Your submission should not reflect the capabilities of the AI but should showcase your skills in guiding and leveraging it to fulfill the given requirements. Make sure to provide instructions and context to the AI based on your knowledge, ensuring that the solution generated is something you are comfortable attaching your name to.

This repository contains the project to be maintained, which is a full-stack TypeScript application consisting of a NestJS backend and an Angular frontend. The project uses a stack similar to our products and we welcome you to leverage AI to fill any knowledge gaps. If you believe success hinges primarily on familiarity with specific technologies, our roles may not align with your approach.

## Assessment Steps

1. [Start the code in Gitpod](#running-in-gitpod), and take a look at [the defect description](#defect-tags-are-broken-when-a-new-post-is-created) and [the grading criteria](#evaluation-criteria) described below. Please do NOT fork this repository. You will share your code changes as a git diff at the end.
1. Use the GPT interface linked on the Crossover assessment to determine the root cause of each Problem and then fix it. 
   - Imagine that GPT is a "junior" with little context about the project, but good general technical knowledge. 
   - Pass instructions and any needed information to the "junior" (e.g., guidelines, code, database contents, network request payloads, error logs, doc snippets, etc.). 
   - We have included built-in prompts with general information about the project in the chat interface. Feel free to leverage these prompts.
   - The chat purposefully does NOT support uploading the whole codebase or screenshots; you must use your ability to clearly provide concise instructions to succeed.
1. Perform the necessary code adjustments to fix the defect based on the GPT's answers.
1. [Submit your work](#submitting-your-work) by following the instructions below.

*Note: The project doesn't include tests, and you're not required to write any.*

## Running in Gitpod

You can sign up for a free Gitpod account here: https://www.gitpod.io/ using your GitHub account. After you sign up, open the following link to launch your environment: https://www.gitpod.io/#https://github.com/trilogy-group/ws-eng-conduit-ai-assessment/tree/rwa/defect-resolution-v3 . You may refer to the [running in Gitpod](./GITPOD.md) doc for hints about using Gitpod.

This project can also be [run locally](./LOCAL.md); this will require up to 60 minutes of set-up time. We only recommend using this if you have technical impediments in using Gitpod.

Once the project is running, you can access the UI at http://localhost:4200 and log in with `jcosten0@purevolume.com` / `password`. You can also find the backend API spec at http://localhost:3000/docs.

## Defect: Tags are broken when a new post is created
**Summary**: As a user, I want to tag articles such that readers can find my articles more easily.

**Current Behavior**:
 - When creating a new article,
 - **Problem 1**: the tags are broken up into individual characters on the post view page.
 - **Problem 2**: new tags are not shown on the home page under "Popular Tags", even after a page refresh.

**Expected Behavior**:
 - Users can enter tags in a comma-separated list in the "tag" form field.
 - The values are split by commas and trimmed for whitespace.
 - Any tags that do not exist yet from the list are visible on the home page (after refresh).

**Acceptance Test**:
1. Given that you log in with a user,
1. And that there is no "testing" tag yet on the home page,
1. When you create a new article with the following tags: coding, testing
1. And you refresh the page and open the global feed, 
1. (**Screenshot**) Then both tags are visible for your post and in the "Popular Tags" section. 

## Submitting your Work
1. Capture screenshots indicated above and place them directly in the `submission` folder in your repository.
1. Export the chat sessions used to fix the defect and place them directly in the `submission` folder in your repository.
1. Copy the `root-causes.md` file directly into the `submission` folder and fill in the answers to the questions provided.
1. Do NOT create subfolders in the `submission` folder. Please all of your files directly in this folder.
1. Run `npm run submit` and follow the instructions.

## Evaluation Criteria
 - **Correctness**: The solution should accurately identify the root cause of each problem and provide a fix that completely solves the problem, without any edge cases or regressions.
 - **Code Quality**: The code to fix the issues should be clean, efficient, consistent with the provided code, respect the existing architecture and responsibility decomposition, and adhere to typical SOLID/DRY coding practices, REST API design principles, and relational database best practices.
 - **AI Usage**: The AI should be guided properly, by giving appropriate context, clear inputs, instructions, and feedback.
