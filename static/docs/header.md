## Directory Structure

`./components` - contains all the React components <br>
`./config` - contains all the non-sensitive environment variables & constants <br>
`./docs` - contains the static page to render software documentation <br>
`./middleware` - contains middleware for API endpoints <br>
`./models` - contains model definitions for the Mongoose database <br>
`./pages` - contains static pages for Next.js that will be rendered under `/<page name>` <br>
`./routes` - contains the definitions of the API routes <br>
`./services` - contains functions and API call handlers for the client <br>
`./test` - contains unit and integration tests <br>
`./.gitignore` - Files/folders to be ignored when pushing to GitHub <br>
`./.travis.yml` - Travis CI configuration file <br>
`./apidoc.json` - APIDoc configuration file <br>
`./index.js` - Entry point of the web server <br>
`./jest.config.js` - Jest configuration file (testing framework) <br>
`./next.config.js` - Next.js configuration file (server-side rendered react framwork) <br>
`./package.json` - Node dependency manager and configuration

<br>

## Development

In our app we use several JavaScript technologies. Here I list what we are using and where to get started.

<b>React.js</b> - we use this UI library to render our designs to the user.

<b>Next.js</b> - we use this for our React.js page rendering for the server-side.

<b>Node.js</b> - we use this for our server, which has several API endpoints which connects to Spotify API

<b>MongoDB (Mongoose package)</b> - we use this NoSQL database to store all the information we need for songs & users etc.

<br>

### Client-side development

Useful folders to be aware of: <br>

#### ./pages

The files in this folder are JavaScript files which will be rendered at the root of the URL when the server starts up. For example:

`pages/index.js` is rendered at `http://localhost:3000/` however,

`pages/about.js` is rendered at `http://localhost:3000/about`.

<b>Note</b> files can't be nested in folders, the files need to remain in the root of the folder.



#### ./static

Static contains assets necessary for the project.

- `img/` contains all the images for the app
- `sass/` contains SCSS files for the CSS (Cascading Style Sheets) of the app
  - `abstracts/`  contains non-specific SCSS i.e. variables contains global variables for SCSS
  - `base/` contains the initialization of the body and html tags, as well as animations and utility tags
  - `components/` contains styles for components to the React components for referencing
  - `layout/` contains styles for the layout of the app i.e. grid definitions and how the components interact
  - `pages/` contains styles specific for pages, referencing in the `./pages/` folder
  - `main.scss` bundles all of the `._scssfilename` files together



#### ./components

The components contains all the definitions of the react components.

- `/common` - contains all of the components that are reusable throughout the web app
- `/` - for other folders, they are based on similarity, for example `/forms` contains components that are heavily form based. Likewise for `/queue` for components based around the queue ideal etc.

<br>

### Server-side development

Useful folders to be aware of: <br>



#### ./models

The models folder defines the collections (tables) in MongoDB, there each file is a definition for a collection in the database.

Each file should contain a `schema` which defines an object in which the collection should accept and a validation function.
Look at a file for refernce on syntax and libraries used.



#### ./routes

This folder defines all of the API routes the node server should handle, each file in it's current implementation should handle a sub URL.

For example, a file in routes like `songs.js` should be defined to have its endpoint situated at `.../songs/`. These handlers get defined
in `./startup/routes`.



#### ./middleware

The middleware folder contains functions that should be applied to the API routes before it gets called. One example of this is the `auth.js`
middleware which checks that an incoming request is authorised i.e. the header of the request has a valid JSON web token. 



#### ./startup

The startup folder defines the database and initialises all the routes in the app. It also applies global middleware to the project. One example
of this is `helmet.js` which secures the apps request and response headers in production.


<br>

### Shared development

#### ./services

Services folder extracts the functions the UI components and routes to simplify the logic contained within them.  