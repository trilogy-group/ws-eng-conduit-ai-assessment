# Conduit - AI Augmented Feature Development

In this assessment, you will work on a realistic task that closely resembles issues you may face on the job. You will extend a full-stack TypeScript project. The project has a NestJS backend and an Angular frontend. Your task is to add a new feature using an AI tool. The goal is to show your skills in building features and guiding the AI while keeping long-term code quality in mind.

(Optional) You may watch this video to get an overview of the assessment: https://drive.google.com/file/d/1g5PtSRr7yFRx9h0jhHCbXd2PbU4erB1K/view

## Assessment Steps

1. **Set Up GitHub Codespaces:**

   - Create a free GitHub account at [GitHub](https://github.com/signup).
   - Open the Codespace using [this link](https://github.com/codespaces/new?repo=678723453&ref=rwa/feature-development-v4&machine=standardLinux32gb).
   - Your environment will automatically install all dependencies, seed the database, and start both the backend and frontend servers.
   - Open [http://localhost:4200](http://localhost:4200).
     - Log in with: **Email:** jcosten0@purevolume.com **Password:** password
     - Note that in Codespaces, the URL will differ as it [automatically forwards ports](https://docs.github.com/en/codespaces/developing-in-a-codespace/forwarding-ports-in-your-codespace).
     - Sometimes, CodeSpaces will return 502 Bad Gateway errors although the servers are running. If this happens, go to the Ports view, right click on the port(s) and toggle the visibility of the port(s) between "Public" and "Private".

2. **Understand the Technologies:**

   - Review the project's technologies (NestJS, Angular, TypeScript, MySQL).

3. **Review the Codebase and Requirements:**

   - **Frontend:** Located in the `apps/frontend` and `libs` folders.
   - **Backend:** Located in the `apps/backend` folder (includes database migrations).
   - Spend time exploring the code to understand its structure and logic.
   - Understand how to: extend the data model, expose an API, consume an API in the frontend.
   - Review the requirements for [the feature you will build](#feature-the-conduit-roster).

4. **Review the Evaluation Criteria:**

   - Check the [evaluation criteria](#evaluation-criteria) to know how your work will be graded.

5. **Use Aider to implement the feature:**

   - You must use the pre-installed Aider CLI for AI. You can check out the [Aider documentation](https://aider.chat/docs/usage/tutorials.html) to learn how to use it.
   - You will use an assessment-specific Aider API key (provided on the Crossover page) which allows about 200 messages.
   - Perform the necessary code adjustments to fulfill the requirements of the feature.
   - Use Aider to perform most of the research, design, write new code, etc.

6. **Submit your work:**
   - Run the acceptance tests, capture the indicated screenshots and place them directly in the `submission` folder in your repository. In CodeSpaces, you can upload files to the repository by right clicking on the `submission` folder and selecting "Upload".
   - Do NOT create subfolders in the `submission` folder. Please add all of your files directly in the `submission` folder.
   - Run `npm run submit` and follow the instructions.

## Mandatory Rules

- **Do Not Fork**: Work on the provided repository. The submission script will malfunction if you fork the repository and push to it.
- **Use the Correct Branch**: Other assessment branches are in the repository. You must be on rwa/feature-development-v4.
- **Single AI Tool**: Use Aider exclusively for AI interactions.
- **Include Screenshots**: Include screenshots of the acceptance tests passing. If you submit without screenshots, you'll get 0 stars.
- **Preserve Aider Files**: Do not delete .aider.chat.history.md or .aider.input.history. If you submit without these files, you'll get 0 stars.

## Notes

- **API Docs:** You can find the API documentation at [http://localhost:3000/docs](http://localhost:3000/docs).
- **Testing:** The project does not include tests. You don't need to write any tests for this task.
- **Aider:** Think of Aider as a junior developer with good general knowledge but little context about the project. Provide clear instructions and reference specific files when asking for changes.
- **Tasks**: You can use the [Tasks](.vscode/tasks.json) ([docs](https://code.visualstudio.com/docs/editor/tasks)) and [Debug Launch Configurations](.vscode/launch.json) ([docs](https://code.visualstudio.com/docs/editor/debugging)) to start the app.
- **Codespaces**:
  - Inactivity:Your codespace will stop after 30 minutes of inactivity. You can restart it from [here](https://github.com/codespaces) (your changes will be saved). It will be automatically deleted after 30 days of being stopped.
  - Forwarding: Any "localhost" URLs will be forwarded automatically by Codespaces to a [URL accessible from the internet](https://docs.github.com/en/codespaces/developing-in-a-codespace/forwarding-ports-in-your-codespace).
  - Costs: Github Codespaces is free for the first 120 CPU hours per month. You may decide to launch either a 4-CPU or a 2-CPU machine giving you 60 and 30 hours of free usage per month respectively. We recommend using the 4-CPU machine type.
- **Database**: You can connect to the database using [these credentials](./apps/backend/mikro-orm.config.ts). The Codespace has a MySQL extension that can connect to the database.
- **Environment:** If you cannot use Codespaces, you can [set up a local development environment](https://www.perplexity.ai/search/what-are-the-concise-precise-s-khlwVDwQTMODLaC6wB_7DQ).

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

## Evaluation Criteria

| **Criteria**     | **Description**                                    | **0 Stars**           | **1 Star**                        | **2 Stars**                                 | **3 Stars**                                  |
| ---------------- | -------------------------------------------------- | --------------------- | --------------------------------- | ------------------------------------------- | -------------------------------------------- |
| **Code Quality** | Code cleanliness, efficiency, and maintainability. | Code is very messy    | Code quality is poor              | Mostly clean with minor issues              | Clean, efficient, and follows best practices |
| **Correctness**  | Does the feature work as required?                 | Feature does not work | At least a list of users is shown | The stats are shown, but with small issues  | Fully functional with no bugs                |
| **AI Usage**     | How well you guide and use the AI tool.            | AI not used at all    | Basic or unclear usage            | Mostly clear instructions with minor issues | Clear, effective, and well-guided AI usage   |
