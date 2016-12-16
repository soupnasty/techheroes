FROM ubuntu:14.04
MAINTAINER Andrew Campbell

# Install node and dependencies
RUN apt-get update && apt-get install -y curl
RUN curl -sL https://deb.nodesource.com/setup_6.x | sudo -E bash -
RUN apt-get update && apt-get install -y nodejs

# Add package.json to src directory
COPY ./package.json /package.json
RUN npm install

EXPOSE 8080