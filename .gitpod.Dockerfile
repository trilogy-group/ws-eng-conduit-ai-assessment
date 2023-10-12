FROM gitpod/workspace-mysql:2023-10-12-08-31-06

USER root

RUN bash -c 'VERSION="18.13.0" \
    && source $HOME/.nvm/nvm.sh && nvm install $VERSION \
    && nvm use $VERSION && nvm alias default $VERSION'

USER gitpod

RUN echo "nvm use default &>/dev/null" >> ~/.bashrc.d/51-nvm-fix
RUN rm -f ~/.bashrc.d/100-mysql-launch
