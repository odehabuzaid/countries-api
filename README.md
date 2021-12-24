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
[Example](https://countries-task.herokuapp.com/countries)
### Get all currencies
    
    GET /currencies
[Example](https://countries-task.herokuapp.com/currencies)
### Get all currencies for a country
    
    GET /currencies?code=CCA2
[Example currencies by CCA2](https://countries-task.herokuapp.com/currencies?code=jo)

### Countries Grouped by language
    
    GET /countries?group=languages
[Example languages](https://countries-task.herokuapp.com/countries?group=languages)
### Countries Grouped by region

    GET /countries?group=region
[Example regions](https://countries-task.herokuapp.com/countries?group=region)
### Search country by code

    GET /countries?code=CCA2
    Get /countries?code=CCA3
    Get /countries?code=CCN3

[Example CCA2](https://countries-task.herokuapp.com/countries?code=pr)
[Example CCA3](https://countries-task.herokuapp.com/countries?code=pri)
[Example CCN3](https://countries-task.herokuapp.com/countries?code=630)
### Search country by name
    
    GET /countries?name=offical
    GET /countries?name=common

[Example offical](https://countries-task.herokuapp.com/countries?name=Commonwealth%20of%20Puerto%20Rico)
[Example common](https://countries-task.herokuapp.com/countries?name=puerto%20Rico)
### download "countries.json" api response
  
      GET /download {headers: {'X-ADMIN': 1}}

[Example not authorized](https://countries-task.herokuapp.com/download)

## Trello Board

[Link](https://trello.com/b/jcP9sbeZ/nadtask)

## Deployment
[Link](https://countries-task.herokuapp.com/)
