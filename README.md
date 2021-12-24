# countries-api

 this is a REST API for the [Countries](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) and [Currencies](https://en.wikipedia.org/wiki/ISO_4217) data.

## Database setup

The application will do it , just provide the database name as in the sample env file.

If you would like to use the same database url from the env.sample file __ATLAS__ URI , just change your local machine network adapter dns to 8.8.8.8.




## Installing

1. Make sure you have these installed
    - [Node.js](http://nodejs.org/)
    - [git](http://git-scm.com/)
2. Clone this repository into your local machine with win,linux or mac terminal using `git`.

```git
> git clone https://github.com/odehabuzaid/countries-api

OR

> git clone git@github.com:odehabuzaid/countries-api.git
```

3. CD to the folder `cd countries-api`.
4. Modify the __`.env.sample`__ file to your needs and rename it to __`.env`__ .
5. Run `> npm install` to install the project dependencies .
6. Run `> npm test` command to start the test.
7. Run `> npm start` command to start the server.


## API Endpoints

### Get all countries

    GET /countries

### Get all currencies

    GET /currencies

### Get all currencies for a country
    
    GET /currencies?code=CCA2

### Countries Grouped by language
    
    GET /countries?group=language

### Countries Grouped by region

    GET /countries?group=region

### Search country by code

    GET /countries?code=CCA2
    Get /countries?code=CCA3
    Get /countries?code=CCN3

### Search country by name

    GET /countries?name=offical
    GET /countries?name=common


### download "countries.json" api response
  
      GET /download {headers: {'X-ADMIN': 1}}


## Trello Board

[Link](https://trello.com/b/jcP9sbeZ/nadtask)

## Deployment
[Link](https://countries-task.herokuapp.com/)
