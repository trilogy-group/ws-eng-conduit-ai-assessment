FROM gitpod/workspace-mysql

USER root

RUN bash -c 'VERSION="18.13.0" \
    && source $HOME/.nvm/nvm.sh && nvm install $VERSION \
    && nvm use $VERSION && nvm alias default $VERSION'

ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.11.0/wait /usr/bin/wait
RUN chmod +x /usr/bin/wait

USER gitpod

RUN echo "nvm use default &>/dev/null" >> ~/.bashrc.d/51-nvm-fix
