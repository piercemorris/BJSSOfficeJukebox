## Directory Structure

`./components` - contains all the React components
`./config` - contains all the non-sensitive environment variables & constants
`./docs` - contains the static page to render software documentation
`./middleware` - contains middleware for API endpoints
`./models` - contains model definitions for the Mongoose database
`./pages` - contains static pages for Next.js that will be rendered under `/<page name>`
`./routes` - contains the definitions of the API routes
`./services` - contains functions and API call handlers for the client
`./test` - contains unit and integration tests
`./.gitignore` - Files/folders to be ignored when pushing to GitHub
`./.travis.yml` - Travis CI configuration file
`./apidoc.json` - APIDoc configuration file
`./index.js` - Entry point of the web server
`./jest.config.js` - Jest configuration file (testing framework)
`./next.config.js` - Next.js configuration file (server-side rendered react framwork)
`./package.json` - Node dependency manager and configuration



## Development

In our app we use several JavaScript technologies. Here I list what we are using and where to get started.

<b>React.js</b> - we use this UI library to render our designs to the user.

<b>Next.js</b> - we use this for our React.js page rendering for the server-side.

<b>Node.js</b> - we use this for our server, which has several API endpoints which connects to Spotify API

<b>MongoDB (Mongoose package)</b> - we use this NoSQL database to store all the information we need for songs & users etc.

### Client-side development

Useful folders to be aware of:

#### `pages`

The files in this folder are JavaScript files which will be rendered at the root of the URL when the server starts up. For example:

`pages/index.js` is rendered at `http://localhost:3000/` however,

`pages/about.js` is rendered at `http://localhost:3000/about`.

<b>Note</b> files can't be nested in folders, the files need to remain in the root of the folder.



#### `static` 

Static contains assets necessary for the project.

- `img/` contains all the images for the app
- `sass/` contains SCSS files for the CSS (Cascading Style Sheets) of the app
  - `abstracts/`  contains non-specific SCSS i.e. variables contains global variables for SCSS
  - `base/` contains the initialization of the body and html tags, as well as animations and utility tags
  - `components/` contains styles for components to the React components for referencing
  - `layout/` contains styles for the layout of the app i.e. grid definitions and how the components interact
  - `pages/` contains styles specific for pages, referencing in the `./pages/` folder
  - `main.scss` bundles all of the `._scssfilename` files together



#### `components`

The components contains all the definitions of the react components.

- `/common` - contains all of the components that are reusable throughout the web app
- `/` - for other folders, they are based on similarity, for example `/forms` contains components that are heavily form based. Likewise for `/queue` for components based around the queue ideal etc.



### Server-side development