# Conduit - AI Augmented Feature Development

In this assessment, you will work on a realistic task that closely resembles issues you may face on the job. Your challenge in this assignment is to guide GPT to extend an existing project with a new feature. Your submission should not reflect the capabilities of the AI but should showcase your skills in guiding and leveraging it to fulfill the given requirements. Make sure to provide instructions and context to the AI based on your knowledge, ensuring that the solution generated is something you are comfortable attaching your name to. 

This repository contains the project to be extended, which is a full-stack TypeScript application consisting of a NestJS backend and an Angular frontend. The project uses a stack similar to our products and we welcome you to leverage AI to fill any knowledge gaps. If you believe success hinges primarily on familiarity with specific technologies, our roles may not align with your approach.

## Assessment Steps

1. [Start the code in Gitpod](#running-in-gitpod), and take a look at [the feature requirements](#feature-the-conduit-roster) and [the grading criteria](#evaluation-criteria) described below. Please do NOT fork this repository. You will share your code changes as a git diff at the end.
1. Use the GPT interface linked on the Crossover assessment to perform most of the research, design, write new code, etc. 
   - Imagine that GPT is a "junior" with little context about the project, but good general technical knowledge. 
   - We have included built-in prompts with general information about the project in the chat interface. Feel free to leverage these prompts.
   - The chat purposefully does NOT support uploading the whole codebase or screenshots; you must use your ability to clearly provide concise instructions to succeed.
1. Perform the necessary code adjustments to fulfill the requirements of the feature.
1. [Submit your work](#submitting-your-work) by following the instructions below.

*Note: The project doesn't include tests, and you're not required to write any.*

## Running in Gitpod

You can sign up for a free Gitpod account here: https://www.gitpod.io/ using your GitHub account. After you sign up, open the following link to launch a browser-based VSCode environment: https://www.gitpod.io/#https://github.com/trilogy-group/ws-eng-conduit-ai-assessment/tree/rwa/feature-development-v3 . You may refer to the [running in Gitpod](./GITPOD.md) doc for hints about using Gitpod.

This project can also be [run locally](./LOCAL.md); this will require up to 60 minutes of set-up time. We only recommend using this if you have technical impediments in using Gitpod.

Once the project is running, you can access the UI at http://localhost:4200 and log in with `jcosten0@purevolume.com` / `password`. You can also find the backend API spec at http://localhost:3000/docs.

## Feature: The Conduit Roster 
**Summary**: As a reader, I want to view a rank-ordered list of authors, such that I can find and follow the most popular authors on the site.

**Requirements**:
- [Already Done] Create a new Roster page and link it in the top navigation after the "Home" page link. 
- On this page, include a "Conduit Roster" header and a table or list containing stats for each user as described below:
    - The user name & profile link,
    - The total number of articles authored (zero if none),
    - The total number of favorites received on their articles (zero if none),
    - The date of their first posted article (empty if no article was posted yet).

**Acceptance Test**:
1. Given that you are logged in (any user),
1. When you open the "Roster" page,
1. Then you see all the Conduit users with correct stats,
1. When you create a new article and you open the "Roster" page,
1. (**Screenshot**) Then you see your total number of articles incremented accordingly.

## Submitting your Work
1. Capture screenshots indicated above and place them directly in the `submission` folder in your repository.
1. Export the chat sessions used to build the feature and place them directly in the `submission` folder in your repository.
1. Do NOT create subfolders in the `submission` folder. Please add all of your files directly in the `submission` folder.
1. Run `npm run submit` and follow the instructions.

## Evaluation Criteria
- **Correctness & Completeness**: The final code should be functional, produce the desired output without errors, defects, or limitations, and address all the requirements, with minimal inconsistencies between requirement specifications and outputs (e.g., related to behavior, formatting, etc.).
- **Code Quality**: The code to implement the feature should be clean, efficient, consistent with the provided code, respect the existing architecture and responsibility decomposition, and adhere to typical SOLID/DRY coding practices, REST API design principles, and relational database best practices.
- **AI Usage**: The AI should be guided properly, by giving appropriate context, clear inputs, instructions, quality rules, and feedback. 
