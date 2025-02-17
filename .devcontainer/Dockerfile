FROM node:22.11.0-bullseye

RUN apt-get update && apt-get install -y git wait-for-it
RUN npm install -g npm@11.1.0

WORKDIR /workspace

CMD ["sleep", "infinity"] 