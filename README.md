# Installation

`$ git clone git@github.com:Falinor/wot-authorization-server.git`

# Getting started

`$ docker-compose up -d` builds and runs everything.

## The docker-compose workflow

The authorization server uses docker-compose yaml files in order to build several services
at the same time.

When you type `$ docker-compose up [OPTIONS]`, docker-compose looks up
_docker-compose.yml_ and _docker-compose.override.yml_ files. This behavior
allows to declare common keys (in _docker-compose.yml_) and specify
specific development keys.

# Testing

Start by building the service containers with the following command:

`$ docker-compose -f docker-compose.test.yml -f docker-compose.yml build`

## Testing everything

`$ docker-compose -f docker-compose.test.yml -f docker-compose.yml up`

## Testing a single service

`$ docker-compose -f docker-compose.test.yml -f docker-compose.yml start SERVICE`

where SERVICE is the name of the intended service e.g. `apitest` for the API.
