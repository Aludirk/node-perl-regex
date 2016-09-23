FROM node:argon
RUN apt-get install -y perl5
ADD package.json /tmp/package.json
RUN cd /tmp && npm install
RUN cp -a /tmp/node_modules /
WORKDIR /
ADD . /
