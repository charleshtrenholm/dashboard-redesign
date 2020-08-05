[![Testing Status](https://github.com/kbaseIncubator/dashboard-redesign/workflows/Tests/badge.svg)](https://github.com/kbaseIncubator/dashboard-redesign/workflows/Tests/badge.svg) [![Coverage Status](https://coveralls.io/repos/github/kbaseIncubator/dashboard-redesign/badge.svg?branch=master)](https://coveralls.io/github/kbaseIncubator/dashboard-redesign?branch=master)

# KBase Prototype React + Python UI

* React
* Webpack
* Typescript
* Tachyons
* Backend: Sanic and jinja2

## Development

### Prerequisites

1. Install docker: https://docs.docker.com/install/
1. Install docker-compose: https://docs.docker.com/compose/install/
1. Install Node 10: https://github.com/nvm-sh/nvm
1. Install yarn: https://yarnpkg.com/en/docs/install

### Run the server

In one terminal, run `make serve` to start the python server.

In another terminal, run `yarn watch` to start the bundler.

### Linting and formatting typescript

Run `yarn fix` to lint and auto-format your code using Prettier. Run `yarn test` to run the test suite. Note that if Prettier complains, then tests will fail.

### Troubleshooting

Run `make reset` to do a hard reset of your docker build, deleting containers and volumes.

## Dockerfiles

There are a few dockerfiles:

* `Dockerfile` - production image
* `dev/Dockerfile-python` - development python image
* `dev/Dockerfile-node` - development js/css watcher
* `docker-compose.yaml` - development docker-compose config

## Deployment

### Build image

To build locally, first increment the semantic version in `scripts/local-build.sh` and then run that script.

Building for deployment is done via Github Actions. Once a branch is ready for deployment, do a release through Github. An action will be run that builds the Docker image and sends it to [Dockerhub](https://hub.docker.com/repository/docker/kbase/proto-ui). See [deployment.md](docs/deployment.md) for detailed instructions.

### Environment variables

These environment variables can be set:

- `URL_PREFIX` - path prefix for all links and asset urls (css, js, images) that get generated in the app. Used when behind an nginx proxy.
- `KBASE_ENDPOINT` - prefix to all KBase service endpoints - usually something like `https://kbase.us/services` for production.
- `KBASE_ROOT` - prefix to all UI asset URLs - `https://narrative.kbase.us` in production.
