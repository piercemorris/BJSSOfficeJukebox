define({
  "name": "Office Jukebox",
  "version": "1.0.0",
  "description": "A online jukebox app for BJSS which allows multiple users to queue up songs to a shared queue",
  "header": {
    "title": "Read first",
    "content": "<h2>Directory Structure</h2>\n<p><code>./components</code> - contains all the React components\n<code>./config</code> - contains all the non-sensitive environment variables &amp; constants\n<code>./docs</code> - contains the static page to render software documentation\n<code>./middleware</code> - contains middleware for API endpoints\n<code>./models</code> - contains model definitions for the Mongoose database\n<code>./pages</code> - contains static pages for Next.js that will be rendered under <code>/&lt;page name&gt;</code>\n<code>./routes</code> - contains the definitions of the API routes\n<code>./services</code> - contains functions and API call handlers for the client\n<code>./test</code> - contains unit and integration tests\n<code>./.gitignore</code> - Files/folders to be ignored when pushing to GitHub\n<code>./.travis.yml</code> - Travis CI configuration file\n<code>./apidoc.json</code> - APIDoc configuration file\n<code>./index.js</code> - Entry point of the web server\n<code>./jest.config.js</code> - Jest configuration file (testing framework)\n<code>./next.config.js</code> - Next.js configuration file (server-side rendered react framwork)\n<code>./package.json</code> - Node dependency manager and configuration</p>\n<h2>Development</h2>\n<p>In our app we use several JavaScript technologies. Here I list what we are using and where to get started.</p>\n<p><b>React.js</b> - we use this UI library to render our designs to the user.</p>\n<p><b>Next.js</b> - we use this for our React.js page rendering for the server-side.</p>\n<p><b>Node.js</b> - we use this for our server, which has several API endpoints which connects to Spotify API</p>\n<p><b>MongoDB (Mongoose package)</b> - we use this NoSQL database to store all the information we need for songs &amp; users etc.</p>\n<h3>Client-side development</h3>\n<p>Useful folders to be aware of:</p>\n<h4><code>pages</code></h4>\n<p>The files in this folder are JavaScript files which will be rendered at the root of the URL when the server starts up. For example:</p>\n<p><code>pages/index.js</code> is rendered at <code>http://localhost:3000/</code> however,</p>\n<p><code>pages/about.js</code> is rendered at <code>http://localhost:3000/about</code>.</p>\n<p><b>Note</b> files can't be nested in folders, the files need to remain in the root of the folder.</p>\n<h4><code>static</code></h4>\n<p>Static contains assets necessary for the project.</p>\n<ul>\n<li><code>img/</code> contains all the images for the app</li>\n<li><code>sass/</code> contains SCSS files for the CSS (Cascading Style Sheets) of the app\n<ul>\n<li><code>abstracts/</code>  contains non-specific SCSS i.e. variables contains global variables for SCSS</li>\n<li><code>base/</code> contains the initialization of the body and html tags, as well as animations and utility tags</li>\n<li><code>components/</code> contains styles for components to the React components for referencing</li>\n<li><code>layout/</code> contains styles for the layout of the app i.e. grid definitions and how the components interact</li>\n<li><code>pages/</code> contains styles specific for pages, referencing in the <code>./pages/</code> folder</li>\n<li><code>main.scss</code> bundles all of the <code>._scssfilename</code> files together</li>\n</ul>\n</li>\n</ul>\n<h4><code>components</code></h4>\n<p>The components contains all the definitions of the react components.</p>\n<ul>\n<li><code>/common</code> - contains all of the components that are reusable throughout the web app</li>\n<li><code>/</code> - for other folders, they are based on similarity, for example <code>/forms</code> contains components that are heavily form based. Likewise for <code>/queue</code> for components based around the queue ideal etc.</li>\n</ul>\n<h3>Server-side development</h3>\n"
  },
  "template": {
    "forceLanguage": "en"
  },
  "sampleUrl": false,
  "defaultVersion": "0.0.0",
  "apidoc": "0.3.0",
  "generator": {
    "name": "apidoc",
    "time": "2019-04-20T19:00:21.525Z",
    "url": "http://apidocjs.com",
    "version": "0.17.7"
  }
});
