# mcda5550-pwa_assignment

This is a project for the Assignment for the course 5550

## Getting started

### To test the functionalities of the project:
1.) We need to run the server first as it is a client-server (ReactJS-NodeJS) architecture by running the following command in the command prompt
    node ./server/server.js
2.) We then run our Client by running the command in the new cmd
    node start

The client will open on localhost:3000

There you go!!! you have successfully run the program, Go ahead, play around, and check all requirements for the project and grade generously.

## Assumptions:

#### 1.) If any transaction(read, write, update, delete) is performed while the website is in offline mode the transaction will not be saved in the cache, as I am caching things coming from the server rather than caching the transaction first and than making a fetch call. As it compromises the integrity of the data.

#### 2.) On the first load, we are receiving an array of 3 objects for the tester to work with something.

#### 3.) addTask, updateTask does not actually store or update any data at the servers, and every refresh/hard refresh will show you only 3 tasks in the list.

# THANK YOU!! 
