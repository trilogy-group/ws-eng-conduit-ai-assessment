FROM node:18.13.0-bullseye

RUN apt-get update && apt-get install -y git wait-for-it

RUN apt-get install -y python3 python3-pip
RUN pip3 install uv
ENV PATH="/root/.local/bin:${PATH}"
RUN uv tool install --python python3.12 aider-chat==0.86.1
RUN uv tool update-shell

RUN node -v && \
    npm -v && \
    python3 --version && \
    uv --version && \
    aider --version

WORKDIR /workspace

CMD ["sleep", "infinity"] 
