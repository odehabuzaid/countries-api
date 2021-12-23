# countries-api

 this is a RESTful API for the [Countries](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) and [Currencies](https://en.wikipedia.org/wiki/ISO_4217) data.

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

## Database setup

The application will do it , just provide the database name as in the sample env file.

## API Endpoints

```bash
GET http://localhost:8000/api/countries   -> gets all countries
GET http://localhost:8000/api/countries?group=region||language -> gets countries grouped by region or language
GET http://localhost:8000/api/countries/:code -> search by CCA2/CCA3/CCN3
GET http://localhost:8000/api/countries/:name -> search by name (common or official)
GET http://localhost:8000/api/currencies/:cca2 -> gets country currencies by CCA2

GET http://localhost:8000/api/download/headers: {X-Admin: '1' } -> gets the downloaded download "countries.json" file
```

## Trello Board

[Link](https://trello.com/b/jcP9sbeZ/nadtask)

## Deployment

Heroku Link