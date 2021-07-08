Cake Manager Micro Service (fictitious)
=======================================

A summer intern started on this project but never managed to get it finished.
The developer assured us that some of the above is complete, but at the moment accessing the /cakes endpoint
returns a 404, so getting this working should be the first priority.

Requirements:
* By accessing the root of the server (/) it should be possible to list the cakes currently in the system. This must be presented in an acceptable format for a human to read.

* It must be possible for a human to add a new cake to the server.

* By accessing an alternative endpoint (/cakes) with an appropriate client it must be possible to download a list of
the cakes currently in the system as JSON data.

* The /cakes endpoint must also allow new cakes to be created.

Comments:
* We feel like the software stack used by the original developer is quite outdated, it would be good to migrate the entire application to something more modern.
* Would be good to change the application to implement proper client-server separation via REST API.

Bonus points:
* Tests
* Authentication via OAuth2
* Continuous Integration via any cloud CI system
* Containerisation


Original Project Info
=====================

To run a server locally execute the following command:

`mvn jetty:run`

and access the following URL:

`http://localhost:8282/`

Feel free to change how the project is run, but clear instructions must be given in README
You can use any IDE you like, so long as the project can build and run with Maven or Gradle.

The project loads some pre-defined data in to an in-memory database, which is acceptable for this exercise.  There is
no need to create persistent storage.


Submission
==========

This application is now made up of two microservices - a node.js frontend and a java springboot backend.

###Backend

```$bash
cd backend/service
mvn clean install
mvn spring-boot:run
```

This will spin up the backend at http://localhost:5000

The backend provides the following endpoints
```$xslt
GET /cakes
POST /cakes
```

###Frontend

```$bash
cd frontend/service
npm ci
npm run gulp
npm start
```

This will start up the frontend at http://localhost:3000

###Containerisation
Each microservice has a Dockerfile which bundles the service into a deployable docker image

###CI
This project has a CI pipeline which will build, run unit tests, and deploy docker images of each microservice. The pipeline will run on each push.

###Testing
Both the frontend and backend have their own unit tests. Backend tests are written with JUnit and Mockito, and frontend tests are written with Mocha, Sinon and Chai.

###Future Improvements
Due to short time to complete this task, I was not able to do all of the things I would have liked to have done. These include:
* Integration and Selenium testing
* GitHub OAuth2 Integration
* Deploy docker images to a cloud provider (AWS/Azure), at the moment the docker images are just deployed to the GitHub actions node's localhost