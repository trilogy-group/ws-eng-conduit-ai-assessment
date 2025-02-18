# Conduit - AI Augmented Design and Implementation

In this assessment, you will work on a realistic task that closely resembles issues you may face on the job. Your challenge in this assignment is to guide AI to extend an existing project with a new user story.

Your submission should not reflect the capabilities of the AI but should showcase your skills in guiding and leveraging it to fulfill the given requirements. Make sure to provide instructions and context to the AI based on your knowledge, ensuring that the solution generated is something you are comfortable attaching your name to.

This repository contains the project to be extended, which is a full-stack TypeScript application consisting of a NestJS backend and an React frontend. The project uses a stack similar to our products and we welcome you to leverage AI to fill any knowledge gaps. If you believe success hinges primarily on familiarity with specific technologies, our roles may not align with your approach.

Your mindset should be that of a senior software engineer who is responsible for delivering this user story, while having complete, long-term ownership of the codebase. Hence the code that you write should not damage your ability to extend the codebase in the future.

In Production, this application is deployed on AWS following the architecture below. Any changes you make must work within this architecture, otherwise once your story is released, it will not properly work.

![Architecture Diagram](./diagram.png)

## Preparation Steps

Before starting the assessment, you should:

1. Familiarize yourself with the technologies.
1. Start the code in GitHub Codespaces:
   - Sign up for a free GitHub Codespaces account here: https://github.com/settings/codespaces using your GitHub account.
   - Open the following link to launch a browser-based VSCode environment: https://github.com/codespaces/new?repo=678723453&ref=rwa/design-and-implementation-v1.
   - This will automatically install the project dependencies, seed the database, and start the backend and frontend servers.
   - Once these are done, you can access the UI at http://localhost:3001 and log in with `jcosten0@purevolume.com` / `password`.
   - The environment comes with a pre-configured Aider AI CLI chat interface. You must use this tool for all AI interactions.
1. Walk through the project and understand the codebase:
   - The React frontend is in the `frontend` folder.
   - The NestJS backend is in the `backend` folder, including the database migrations.
1. As mentioned, you will use Aider as the sole AI tool for this assessment. 
   - The [official docs](https://aider.chat/docs/usage/tutorials.html) to get started.
   - The command to launch the Aider CLI with an assessment-specific API key is provided on the Crossover assessment page.
   - This key will allow you to use Aider for about 100 messages. If you run out of messages, please submit your progress until that point.
   - Please make sure to not delete the `.aider.chat.history.md` and `.aider.input.history` files. These will be part of your submission.
1. Look at the [plan.md](./plan.md) file to understand how you should structure your implementation plan for this assessment.
1. Check out and acknowledge the grading criteria.

## Notes

- About the repository:
  - Please do NOT fork this repository. You will share your code changes as a git diff at the end.
  - When writing code, make sure to be on the `rwa/design-and-implementation-v1` branch.
- About the project:
  - You can find the backend API spec at http://localhost:3000/docs.
  - The project doesn't include tests, and you're not required to write any.
- About using Aider:
  - Imagine that it is a "junior" with little context about the project, but good general technical knowledge.
  - You can easily reference files in the project by mentioning them by name, ask it to edit them, etc.
  - But Aider on its own will not know what great code looks like. YOU need to guide it.

## Evaluation Criteria

| Criteria | Description | 0 Stars | 1 Star | 2 Stars | 3 Stars |
|----------|-------------|---------|---------|----------|---------|
| **Plan Soundness** | The implementation plan should be clear, complete and include rationale for technical choices | No plan submitted | Plan is incomplete, shallow or vague | Plan doesn't include clear rationale for choices | Plan is clear, complete with good rationale |
| **Code Quality** | Code should be clean, efficient, consistent with existing code, respect architecture and follow SOLID/DRY principles | Code does not respect any quality standards | Code does not respect quality standards | Code mostly adheres to standards with some issues | Code is clean and fully adheres to standards |
| **Correctness and Completeness** | Features should work correctly and meet requirements | Code does not work at all | Only BASIC features implemented | ADVANCED features with bugs, limitations or small missing edge cases | ADVANCED features with no bugs, limitations, etc. |
| **AI Usage** | AI should be guided with proper context, clear inputs, instructions, quality rules and feedback | Did not use AI | Used AI only for basic questions | Used AI with good context but some hiccups | Used AI effectively with clear guidance |
| **Velocity** | Time taken to complete the task after requirements are provided | Did not complete | Took multiple days | Took <= 6 hours | Took <= 3 hours |

## Next Steps

Once you are ready, press the link within the Crossover assessment to receive the user story requirements.