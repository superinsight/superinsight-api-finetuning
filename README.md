# SuperInsight FineTuning API
This is a RESTful API that you can use to setup the config and data to finetune your model

## Stories
Stories are text will be use for finetuning. You can create unlimited number of stories using this API. Stories can be use as dataset to finetune one or multiple models. For example, let’s say that you will like to finetune a model to support `french`. You can create thousands of stories and with the tag `french`, and when you are ready, you can create a French GPT model by finetuning it with all `french` stories. If you like to finetune a model for French and German, then you can create a finetune model by using the tags `french` and `german` so your finetune model can support both languages.

## Finetunes
Finetunes are use to finetune and existing GPT models. This API will allow you to setup everything you need to prepare for finetuning the model. You can define your training dataset by using a collection of StoryIDs or StoryTags which will be use for dataset during finetuning. The actual training of the model happens in the superinsight-trainer-gpt repo.

## API Guide
Visit https://api.finetuning.superinsight.dev/docs for complete api documentation
 

# Getting Started

## What you will need
* A running instance of MongoDB
* A package manager such as NPM or Yarn
* Node.js installed

## Technologies
* Node.js
* MongoDB with Mongoose
* TypeScript
* Express.js & Express.js middleware
* Zod validation

## Setup Mongo
```
docker run -d -p 27017:27017 --name superinsight-mongo mongo:latest
```
## Install Dependencies and run in debug mode
```
yarn
```
```
yarn dev
```

# Deployment
* Use docker to deploy api