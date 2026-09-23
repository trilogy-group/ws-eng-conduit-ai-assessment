# Debian bookworm: bullseye apt pools are drained (Debian 11 EOL), so
# `apt-get install git` 404s on bullseye-security. bookworm is supported.
FROM node:18.20.4-bookworm

RUN apt-get update && apt-get install -y git wait-for-it

RUN node -v && npm -v

WORKDIR /workspace

CMD ["sleep", "infinity"] 
