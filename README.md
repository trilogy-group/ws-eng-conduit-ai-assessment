# Conduit

This repository contains a full-stack TypeScript application consisting of a NestJS backend and an Angular frontend. You have two options for using this repository: Gitpod (recommended) or [local](./LOCAL.md) (will require up to 60 minutes of set-up time).

## Running in Gitpod

You can sign up for a free Gitpod account here: https://www.gitpod.io/ using your GitHub account. After you sign up, you can open the following link to launch your environment: https://www.gitpod.io/#https://github.com/trilogy-group/ws-eng-conduit-ai-assessment/

Once the environment spins up, you'll have a browser-based VSCode at your disposal. Two terminal tasks are launched automatically:

- "Seed": which waits for the backend to be available and runs the database seed.
- "App": which installs dependencies and starts both backend and frontend.

In Gitpod, "localhost" refers to the remote machine. All "localhost" ports are exposed to a Workspace-specific URL, which is automatically opened if you press any localhost link from the Gitpod terminal, output pane, editor, etc. To open the UI, you can press the `http://localhost:4200/` link in the App terminal (printed once the Angular app spins up) or, alternatively, you can type `gp url 4200` in a new terminal to find the URL manually.

If you are inactive for a while, your Workspace will be "paused". All file changes that you have made to the repository will be saved. You can resume it by refreshing the link or by going here: https://gitpod.io/workspaces.

Note that some Firefox users might face a "Security Error" when opening Gitpod; see [this issue for details and workarounds](https://github.com/gitpod-io/gitpod/issues/9386).

## Hints

- You can access the UI at http://localhost:4200 and log in with `jcosten0@purevolume.com` / `password`.
- You can also find the backend API spec at http://localhost:3000/docs.
- You can run nx commands by running `npm run nx -- <command here>`, e.g., `npm run nx -- g @nx/angular:library something`.

## Tests

Note that while tests are essential to any real-life project, this repository does NOT include tests to keep the assessments short. Candidates are not required to write new tests.

## Exporting your Changes

If the assessment you are working on asks for a git patch, you must export a git diff of your changes by running the `./create-patch.sh` script provided in this repository. This will create a patch in the current folder. Open it to ensure that all your changes are present (it's just a text file). On Gitpod, you can right-click to download it.
