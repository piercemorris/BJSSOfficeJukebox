# How to run the project

_Make sure Node and npm is successfully installed by running_ `$ node -v` and `$ npm -v`

## To run just the frontend service

1. Make sure you are in the root of the project i.e. `bjssjukebox $`
2. After every pull from the project, make sure to run `$ npm i` to install any other packages not installed
3. Run the command `$ npm run dev` to start the project
4. This will run just the frontend service of the app
5. Head to `localhost:3000` in your web browser to view the `/` root of the project

## To run both backend and frontend services

1. Make sure you are in the root of the project i.e. `bjssjukebox $`
2. After every pull from the project, make sure to run `$ npm i` to install any other packages not installed
3. Run the command `$ node index.js` to start the project
4. This will run both the backend and frontend of the app
5. Head to `localhost:3000` in your web browser to view the `/` root of the project

# Tests

To run the tests

1. Make sure you have installed all of the packages by running `$ npm i`
2. Run this command in the terminal `$ npm test` to begin the testing phase
3. If for some reason this command is not recognised, check the `package.json` file and under `scripts` there is a list of all the available commands

# File structure

`components` - contains all the components for react that are reusable<br />
`config` - contains all the information about database connections, private keys etc<br />
`middleware` - contains middleware for express i.e. checking if someone is authorised<br />
`models` - contains the models & schemas for the mongo database<br />
`pages` - contains the files for rendering react pages using the components<br />
`public` - contains all the static images/css files/javascript files<br />
`routes` - defines all the routes to the project structure<br />
`startup` - contains all the functions for on the project startup<br />
`test` - folder containing all the tests, with subfolders for integration and unit testing<br />
`.gitignore` - to ignore any dev dependent folders i.e. node_modules etc<br />
`index.js` - root files for the project<br />
`package.json` - contains dependecies and project information<br />

# Tools for development

Database - `mongodb compass`<br />

- for local database testing, go to - https://docs.mongodb.com/compass/master/install/ - for setup<br />

Creating HTTP Requests - `Postman`

- for creating GET, POST, PUT etc.. http requests to the project running locally i.e. API development environment; go to - https://www.getpostman.com/ - for downloading<br />
