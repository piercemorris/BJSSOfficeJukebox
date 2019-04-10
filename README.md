# BJSS Office Jukebox Brief

A music queueing system for the offices of BJSS

For more information, view our [wiki](https://github.com/perjermer/BJSSOfficeJukebox/wiki)

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

##### Node.js & NPM (node package manager)

1. Head to https://nodejs.org/en/ to download the latest stable version of Node.js (this will install NPM too)
2. Click and install the downloaded package
3. To test if the installation is successful enter `node -v` & `npm -v` in the terminal/commandline

### Installing & Running

*NOTE: eduroam blocks the connection to mLab; the service we use for the live MongoDB database*

How to get the development environment running:

1. Clone from the GitHub repository `$ git clone https://github.com/perjermer/BJSSOfficeJukebox.git`
2. Move into the newly cloned folder `$ cd BJSSOfficeJukebox`
3. Install all the dependency modules `$ npm install`
4. Run the project locally (with a live database connection) `$ npm run dev`
5. Head over to your favored web browser and go to the following url `http://localhost:3000`

### Running the tests

To run the tests:

1. Change the environment to testing; for OSX `$ export NODE_ENV=test`, for windows `$ set NODE_ENV=test`
2. Run the test command `npm test`
3. Results of the tests will follow in the command line

```
 PASS  test/unit/services/priority.test.js
  Priority tests
    Increase user prirority
      √ should return the same user priority if it is the max priority (4ms)
      √ should return the max user priority if last time added is longer than time constant
      √ should return the new user priority which is greater than before (1ms)
    ...

Test Suites: 2 failed, 2 passed, 4 total
Tests:       10 passed, 10 total
Snapshots:   0 total
Time:        3.486s
Ran all test suites.
```

## Built With

- [Node & npm](https://nodejs.org/en/) - Backend framework and dependency management
- [React.js & Next.js](https://nextjs.org/) - Frontend library and server-side rendering framework
- [Express.js](https://expressjs.com/) - Minimalist web framework with Node
- [Bootstrap](https://getbootstrap.com/) - CSS framework

## Contributing

Please read CONTRIBUTING.md for details on our code of conduct, and the process of submitting pull requests.

## Authors

- **Pierce James Morris** - _Group Administrator & Git Master_ - [perjermer](https://github.com/perjermer)
- **James Bennett** - _Project Lead_ - [JPUF](https://github.com/JPUF)
- **Robert Laing** - [robLaing2](https://github.com/robLaing2)
- **Yousef Ismail** - [Psyyi](https://github.com/Psyyi)
- **Sinco Song** - [SincoSong](https://github.com/SincoSong)
