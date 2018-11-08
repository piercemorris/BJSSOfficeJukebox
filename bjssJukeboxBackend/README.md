# How to run the project

_Make sure Node and npm is successfully installed by running_ `$ node -v` and `$ npm -v`

1. Make sure you are in the root of the project i.e. `bjssJukeboxBackend $`
2. After every pull from the project, make sure to run `$ npm i` to install any other packages not installed
3. Run the command `$ npm start` to start the project
4. Head to `localhost:3000` in your web browser to view the `/` root of the project

# Tests

To run the tests

1. Make sure you have installed all of the packages by running `$ npm i`
2. Run this command in the terminal `$ npm test` to begin the testing phase
3. If for some reason this command is not recognised, check the `package.json` file and under `scripts` there is a list of all the available commands

# File structure

`public` - contains all the static images/css files/javascript files
`routes` - defines all the routes to the project structure
`startup` - contains all the functions for on the project startup
`test` - folder containing all the tests, with subfolders for integration and unit testing
`.gitignore` - to ignore any dev dependent folders i.e. node_modules etc
`index.js` - root files for the project
`package.json` - contains dependecies and project information
