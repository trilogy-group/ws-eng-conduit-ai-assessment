# Conduit - AI Augmented Design and Implementation

In this assessment, you will work on a realistic task that closely resembles issues you may face on the job. Your challenge in this assignment is to guide GPT to extend an existing project with a new user story.

Your submission should not reflect the capabilities of the AI but should showcase your skills in guiding and leveraging it to fulfill the given requirements. Make sure to provide instructions and context to the AI based on your knowledge, ensuring that the solution generated is something you are comfortable attaching your name to.

This repository contains the project to be extended, which is a full-stack TypeScript application consisting of a NestJS backend and an React frontend. The project uses a stack similar to our products and we welcome you to leverage AI to fill any knowledge gaps. If you believe success hinges primarily on familiarity with specific technologies, our roles may not align with your approach.

## Preparation Steps

Before starting the assessment, you should:

1. Familiarize yourself with the technologies.
1. Start the code in GitHub Codespaces:
   - Sign up for a free GitHub Codespaces account here: https://github.com/settings/codespaces using your GitHub account.
   - Open the following link to launch a browser-based VSCode environment: https://github.com/codespaces/new?repo=678723453&ref=rwa/design-and-implementation-v1.
   - Once the project is running, seed the database by running `npm run seed`.
   - Access the UI at http://localhost:3001 and log in with `jcosten0@purevolume.com` / `password`.
1. Walk through the project and understand the codebase:
   - The React frontend is in the `frontend` folder.
   - The NestJS backend is in the `backend` folder, including the database migrations.
1. Access the ChatGPT interface linked on the Crossover assessment.
   - Open it and send a test message to ensure it's working.
   - Look at the built-in prompts to understand their utility.
1. Check out and acknowledge the grading criteria.

Notes:

- About the repository:
  - Please do NOT fork this repository. You will share your code changes as a git diff at the end.
  - When writing code, make sure to be on the `rwa/design-and-implementation-v1` branch.
  - Pull regularly to ensure you have the latest changes from the remote.
- About the project:
  - You can find the backend API spec at http://localhost:3000/docs.
  - The project doesn't include tests, and you're not required to write any.
- About using AI:
  - Imagine that GPT is a "junior" with little context about the project, but good general technical knowledge.
  - We have included built-in prompts with general information about the project in the chat interface. Feel free to leverage these prompts.
  - The chat purposefully does NOT support uploading the whole codebase or screenshots; you must clearly provide concise instructions to succeed.

Once you are ready, press the link within the Crossover assessment to receive the user story requirements.

## Evaluation Criteria

- **Correctness & Completeness**: The final code should be functional, produce the desired output without errors, defects, or limitations, and address all the requirements, with minimal inconsistencies between requirement specifications and outputs (e.g., related to behavior, formatting, etc.).
- **Code Quality**: The code to implement the feature should be clean, efficient, consistent with the provided code, respect the existing architecture and responsibility decomposition, and adhere to typical SOLID/DRY coding practices, REST API design principles, and relational database best practices.
- **AI Usage**: The AI should be guided properly, by giving appropriate context, clear inputs, instructions, quality rules, and feedback.
- **Velocity**: Once the user story requirements are provided, you should be able to complete the task in a timely manner. We expect great engineers to be able to complete the task in 2-3 hours.
