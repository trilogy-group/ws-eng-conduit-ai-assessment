FROM node:18.13.0-bullseye

RUN apt-get update && apt-get install -y git wait-for-it

RUN node -v && npm -v

WORKDIR /workspace

CMD ["sleep", "infinity"] 
