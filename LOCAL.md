# Running Locally

If you find that the Gitpod setup does not work for you, then you can always run this project locally. You need to install the following software:

- Docker or a locally running MySQL installation
- NodeJS 16+ (tested with v18.13.0)
- Code Editor (VSCode or WebStorm is recommended)

Getting started:

- Clone this Git repository locally.
- Install the dependencies `npx yarn install`.
- If you don't have a local MySQL installation, start one in docker: `docker run -d -p 3306:3306 --name mysql -e MYSQL_ROOT_PASSWORD=conduit -e MYSQL_DATABASE=conduit -e MYSQL_USER=conduit -e MYSQL_PASSWORD=conduit mysql:8.1`
- Adjust the `apps/backend/mikro-orm.config.ts` with your MySQL credentials (they already match the ones from the docker command above).
- Start the app (both backend and frontend at once): `npm start`.
- After the backend successfully starts, in a new terminal `npm run seed` to seed the database with some initial data.
