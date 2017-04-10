FROM node:latest

LABEL maintainer "Andrea Gueugnaut <agueugnaut@octo.com>"

ENV APP /code

RUN mkdir -p $APP
WORKDIR $APP

COPY . $APP
RUN npm install
