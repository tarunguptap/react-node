# auth-api-nodejs
Create REST API for authentication in Node.js using JWT

Please check the below link for step by step tutorial
**http://www.cluemediator.com/create-rest-api-for-authentication-in-node-js-using-jwt**

## Setup
Follow below steps to run project

1. Clone repository
2. Run `npm i` command to install dependencies
3. Execute `npm start` command to run the project

Reference Website: **http://www.cluemediator.com**


1. POST API to get user : 
a. http://localhost:4000/users/signin, 
b. Body : 
{
   "username":"tarun",
   "password":"tarun"
}
c. Headers : Accept & Content-Type
2. GET API http://localhost:4000 Pass token got from above 
