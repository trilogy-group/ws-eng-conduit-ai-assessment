# Conduit - AI Augmented Defect Resolution

In this assessment, you will be presented with a realistic task that closely resembles issues you may face on the job. Your challenge in this assignment is to act as a mentor for and guide GPT to determine the root cause of a defect and then fix it. This repository contains the project to be maintained, which is a full-stack TypeScript application consisting of a NestJS backend and an Angular frontend.

Make sure to provide instructions and context to the AI based on your knowledge, ensuring that the output is technically sound and adheres to typical engineering standards and practices. Ultimately, the solution generated must be something you are comfortable attaching your name to and should represent a joint effort between your expertise and the AI’s capabilities. This assessment uses a stack similar to our projects and we welcome you to leverage AI to fill any knowledge gaps. 

If you believe success hinges primarily on familiarity with specific technologies, this role may not align with your approach.

## Assessment Steps

1. [Start the code in Gitpod](#running-in-gitpod), and take a look at [the defect description](#defect-tags-are-broken-when-a-new-post-is-created) and [the grading criteria](#evaluation-criteria) described below. 
1. Use the GPT interface linked on the Crossover assessment to determine the root cause of each Problem and then fix it. 
   - Imagine that GPT is a "junior" with little context about the project, but good general technical knowledge. 
   - Pass instructions and any needed information to the “junior” (e.g., engineering best practices, guidelines, code snippets, database contents, network request payloads, error logs, online documentation snippets, etc.). 
   - We have included built-in prompts with general information about the project in the chat interface. Feel free to leverage these prompts.
1. Perform the necessary code adjustments to fix the defect based on the GPT's answers.
1. [Submit your work](#submitting-your-work) by following the instructions below.

*Note: The project doesn't include tests, and you're not required to write any.*

## Running in Gitpod

You can sign up for a free Gitpod account here: https://www.gitpod.io/ using your GitHub account. After you sign up, open the following link to launch your environment: https://www.gitpod.io/#https://github.com/trilogy-group/ws-eng-conduit-ai-assessment/tree/rwa/defect-resolution-v3

Gitpod offers a browser-based VSCode interface with pre-configured terminal tasks to seed the database and start the application. Here, "localhost" refers to the remote machine. All "localhost" ports are exposed to a Workspace-specific URL, which is automatically opened if you press any localhost link from the Gitpod terminal, output pane, editor, etc. To open the UI, you can press the `http://localhost:4200/` link in the App terminal (printed once the Angular app spins up) or, alternatively, you can type `gp url 4200` in a new terminal to find the URL manually.

If you are inactive for a while, your Workspace will be "paused". All file changes that you have made to the repository will be saved. You can resume it by refreshing the link or by going here: https://gitpod.io/workspaces. Lastly, if you need to upload a file from your local machine, simply drag and drop the file or right click on the folder --> Upload.

Some Firefox users face a "Security Error" when opening Gitpod; see [this issue for details and workarounds](https://github.com/gitpod-io/gitpod/issues/9386).

This project can also be [run locally](./LOCAL.md); this will require up to 60 minutes of set-up time.

**Hints**:
- You can access the UI at http://localhost:4200 and log in with `jcosten0@purevolume.com` / `password`.
- You can also find the backend API spec at http://localhost:3000/docs.
- You can run nx commands (e.g., for generating components) by running `npm run nx -- <command here>`, e.g., `npm run nx -- g @nx/angular:library something`.

## Defect: Tags are broken when a new post is created
**Summary**: As a user, I want to tag articles such that readers can find my articles more easily.

**Current Behavior**:
 - When creating a new article,
 - **Problem 1**: the tags are broken up into individual characters on the post view page.
 - **Problem 2**: new tags are not shown on the home page under "Popular Tags", even after a page refresh.

**Expected Behavior**:
 - Users can enter tags in a comma-separated list in the "tag" form field.
 - The values are split by commas and trimmed for whitespace.
 - Any tags that do not exist yet from the list are created and visible on the home page (after  - refresh). 
 - Articles can be filtered based on the tags.

**Acceptance Test**:
1. Given that you log in with the John user,
1. And that there is no "testing" tag yet on the home page,
1. When you create a new article with the following tags: coding, testing
1. Then the article is successfully created.
1. When you open the global feed, 
1. **Screenshot**: Then both tags are visible for your post,
1. When you click the "testing" tag,
1. Then you see the new post.

## Submitting your Work
1. Capture screenshots that show that the acceptance tests pass and place them in the `submission` folder in your repository.
1. Export the chat sessions used to fix the defect and place them in the `submission` folder in your repository.
1. Copy the `root-causes.md` file into the `submission` folder in your repository and fill the answers to the questions provided.
1. Run `npm run submit` and follow the instructions.

## Evaluation Criteria
 - **Correctness**: The solution should accurately identify the root cause of each problem and provide a fix that completely solves the problem, without any edge cases or regressions.
 - **Code Quality**: The code to fix the issues should be clean, efficient, consistent with the provided code, respect the existing architecture and responsibility decomposition, and adhere to typical SOLID coding practices, REST API design principles, and relational database best practices.
 - **AI Usage**: The AI should be guided properly, by giving appropriate context, clear inputs, instructions, and feedback.
