# API for finetuing GPT models


## What you will need
* A running instance of MongoDB
* A package manager such as NPM or Yarn
* Node.js installed

## Concepts
* REST API principals
    * CRUD
    * HTTP methods
* JWT & refresh tokens
* Request validation
## Technologies
* Node.js
* MongoDB with Mongoose
* TypeScript
* Express.js & Express.js middleware
* Zod validation


# Get Started

## Install Dependencies
```
yarn
```

## Run in debug mode
```
yarn dev
```

# Deployment

## What will we use
* Docker (image)
* docker-compose (container)
* Caddy - Web server

Note: You will need Docker installed locally if you want to test your Docker configutation
Note 2: Make sure you add .env to your .gitignore before pushing any changes to your repository. You will also want to generate new public & private keys