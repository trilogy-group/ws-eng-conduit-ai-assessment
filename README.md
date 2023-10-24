# Conduit

This repository contains a full-stack TypeScript application consisting of a NestJS backend and an Angular frontend. You have two options for using this repositiry: Gitpo (recommended) or local (will require up to 60 minutes of set up time).

## Running in Gitpod

You can sign up for a free Gitpod account here: https://www.gitpod.io/ - which will give you 50 free hours of using a Cloud Development Environment. After you signed up, you can open the following link to lanunch your environment: https://www.gitpod.io/#https://github.com/trilogy-group/ws-eng-conduit-ai-assessment/

After accessing the above link, your environment will eventually spin up and you'll have a browser-based VSCode at your disposal. Two terminal tasks are lanunched automatically:

- "Seed": which waits for the backend to be available and runs the database seed.
- "App": which installs dependencies and starts both backend and frontend.

In this environment, "localhost" refers to the remote machine. All the ports of this machine are exposed to a Workspace-specific URL, which is automatically opened if you press any localhost link from the Gitpod terminal, output, editor, etc. To open the UI, you can press the `http://localhost:4200/` link in the App terminal (printed once the Angular app spins up). Alternatively, you can type `gp url 4200` in a new Gitpod terminal to find the URL manually.

If you are inactive for a while, your Workspace will be "paused". All file changes that you have made to the repository will be saved. You can resume it by refreshing the link or by going here: https://gitpod.io/workspaces.

## Running Locally

You need to install the following software:

- Docker or a locally running MySQL installation
- NodeJS 16+ (tested with v18.13.0)
- Code Editor (VSCode is recommended)

Getting started:

- Clone this Git repository locally.
- Install the dependencies `npx yarn install`.
- If you don't have a local MySQL installation, start one in docker: `docker run -d -p 3306:3306 --name mysql -e MYSQL_ROOT_PASSWORD=conduit -e MYSQL_DATABASE=conduit -e MYSQL_USER=conduit -e MYSQL_PASSWORD=conduit mysql:8.1`
- Adjust the `apps/backend/mikro-orm.config.ts` with your MySQL credentials (they already match the ones from the docker command above).
- Start the app (both backend and frontend at once): `npm start`.
- After the backend successfully starts, in a new terminal `npm run seed` to seed the database with some initial data.

## Other Hints

- You can access the UI at http://localhost:4200 and login with `jcosten0@purevolume.com` / `password`.
- You can also find the backend API spec at http://localhost:3000/docs.
- You can run nx commands by running `npm run nx -- <command here>`, e.g., `npm run nx -- g @nx/angular:library something`.

## Exporting your Changes

Please make sure that all your changes are committed locally and then export a git patch of your changes.

You can do this by running the `./create-patch.sh` script provided in this repository. If that doesn't work, you can use the following script:

```bash
git format-patch origin/master --stdout > submission.patch
```

This will create a patch in the current folder. You can open it to ensure that all your changes are present (it's just a text file). On Gitpod, you can right click to download it. Then please share it as part of your submission.
