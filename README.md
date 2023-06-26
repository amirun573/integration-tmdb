# integration-tmdb
Integrated with TMDB

# Integration With TMDB by Using Nodejs(ExpressJS)

This project is running by NodeJS and using ExpressJS as the framework. It retrieve data from TMDB API which get be refered to https://developer.themoviedb.org/reference/intro/getting-started.

## Project Description

In this project, I have been using Sequalize ORM to perform CRUD and manage database from here. There are also certains file, folder and eviroment variables required in order to run this project which can be refered on Installation section.

## Table of Contents 

- [Installation](#installation)
- [References](#references)
- [Examples and Demos](#examples-and-demos)


## Installation

Step-by-step instructions on how to install and set up your project. Include any prerequisites or dependencies required. Provide code snippets or commands to facilitate the installation process.

1. .env file

    Need to create .env file as some of the code will read the variables from it. Here are list of variables needed:

     a. api_key_read (Need to get from API TMDB Developer from api key read only)
     b.secret_key_auth (Key for generating JWT)

2.   config/config.json

     run `sequelize init` command in order to create config.json which stores database connection. Noted that this folder is in gitignore.       Therefore, it will not been push after done on this file.

3. Run `npx sequelize-cli db:migrate`

   This helps in creating table on database that have been set up.


## References

- https://developer.themoviedb.org/reference/intro/getting-started

## Examples and Demos

Can download the JSON file that can be imported to Postman to run the API from this link (https://drive.google.com/file/d/1M7OPf6InGpJ658uaMdFEj9yqTmfhPIWc/view?usp=sharing).




