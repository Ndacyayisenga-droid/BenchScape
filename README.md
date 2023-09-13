# BenchScape

BenchScape contains functionality to collect
[Java Microbenchmark Harness (JMH)](https://github.com/openjdk/jmh) results for continuous
integration approaches.

## Overview

The project contains the `jmh-store` module that acts as a server to store JMH results. The server
provides a minimalistic frontend to show the JMH results as timeseries. Next to this the server
provides an endpoint for
the [JSON plugin for Grafana](https://grafana.com/grafana/plugins/simpod-json-datasource/)
at `/grafana`.

JMH results can be created and uploaded automatically by using the Maven Plugin in the
`jmh-maven-plugin` module or by calling the Uploader directly (see `jmh-runner` module).

### Starting the backend server

The `jmh-store` module contains the Spring Boot based server that can simply be started by the main
class `com.openelements.jmh.store.app.Application`. Once the server is started the frontend can be
reached at [http://localhost:8080](http://localhost:8080). Currently, the server automatically
creates some dummy data for 3 benchmarks at start time.

### Starting the frontend server

Open a new terminal or command prompt (keep the backend server running in the previous terminal).

Navigate to the root directory of your React frontend project (jmh-frontend). You can use the cd command to change your working directory:

    cd BenchScape/jmh-frontend/src/main/frontend

Install the required Node.js packages by running the following command:

    npm install

Start the React development server:

    npm start

The Frontend development server should start and be accessible at http://localhost:3000.

### Using the Maven plugin

The `jmh-maven-plugin` module contains a Maven plugin that can be used to execute JMH benchmark and
upload its results the JMH Store. The `sample` module shows how a Maven project should be configured
to execute JMH benchmarks and upload results. You can have a look at the `<build>` tag of
the `pom.xml` of the module to see how the integration is working. Since the plugin is bound to the
`verify` phase you can easily trigger a full execution by calling `./mvnw verify` on the root level
of the repo (see build instruction) once the JMH Store server is running.

## Kanban board

The Kanban board for the project can be found here: https://github.com/orgs/OpenElements/projects/1

## Building the project

The project is based on [Java 17](https://adoptium.net/de/temurin/releases/)
and [Maven](https://maven.apache.org). You do not need to have a global Maven installation to build
the project since the [Maven Wrapper](https://maven.apache.org/wrapper/) is used to provide a local
Maven executable for the repository.

To build the project just call `./mvnw verify` from the root folder of the
project (`mvnw.cmd verify` on windows).

## Azure deployment for main branch

The `main` branch is automatically deployed to Microsoft Azure.
Any change on the main branch will trigger an update to Azure.

- The server instance can be found at https://benchscape.azurewebsites.net.
- The frontend of the app can be found at https://proud-desert-0b7815310.3.azurestaticapps.net
- Swagger-UI for the instance can be found at https://benchscape.azurewebsites.net/swagger-ui/index.html

The workflow is defined by the `deploy-main-to-azure.yml` GitHub Action.

## Azure deployment for PRs

The branch of a PR will not automatically be deployed to Azure to save costs.
Instead, a GitHub Action can be triggered manually to deploy the server to Azure.

- The server instance can be found at https://benchscape-integration.azurewebsites.net.
- The frontend of the app can be found at https://proud-glacier-06e62e410.3.azurestaticapps.net
- Swagger-UI for the instance can be found at https://benchscape-integration.azurewebsites.net/swagger-ui/index.html

The workflow is defined by the `deploy-integration-to-azure.yml` GitHub Action.
