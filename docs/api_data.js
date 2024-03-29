define({ "api": [
  {
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "optional": false,
            "field": "varname1",
            "description": "<p>No type.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "varname2",
            "description": "<p>With type.</p>"
          }
        ]
      }
    },
    "type": "",
    "url": "",
    "version": "0.0.0",
    "filename": "./docs/main.js",
    "group": "C__Users_pierc_Documents_Code_BJSSOfficeJukebox_docs_main_js",
    "groupTitle": "C__Users_pierc_Documents_Code_BJSSOfficeJukebox_docs_main_js",
    "name": ""
  },
  {
    "type": "Stateless functional Component",
    "url": "<Button|text|onDelete|song/>",
    "title": "common/Button.jsx",
    "name": "Button",
    "group": "Components",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "text",
            "description": "<p>Text to display on the button</p>"
          },
          {
            "group": "Parameter",
            "type": "Function",
            "optional": false,
            "field": "onDelete",
            "description": "<p>Delete functionality that the button will perform on click</p>"
          },
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "song",
            "description": "<p>The song to delete</p>"
          }
        ]
      }
    },
    "description": "<p>This components renders a button to delete an object. Note this should be refactored to handle more general items</p>",
    "success": {
      "examples": [
        {
          "title": "Songcards.jsx",
          "content": "<Button text=\"Remove\" onDelete={this.onDelete} song={this.song}/>",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./components/common/Button.jsx",
    "groupTitle": "Components"
  },
  {
    "type": "Stateless Functional Component",
    "url": "<CurrentlyPlaying|track|currentSongDuration|playing|isDevice|isDeviceActive|onNext|onPlay/>",
    "title": "queue/CurrentlyPlaying.jsx",
    "name": "CurrentlyPlaying",
    "group": "Components",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "track",
            "description": "<p>The object of the track currently in the first position in the queue</p>"
          },
          {
            "group": "Parameter",
            "type": "Integer",
            "optional": false,
            "field": "currentSongDuration",
            "description": "<p>Time in milliseconds of the current track's duration</p>"
          },
          {
            "group": "Parameter",
            "type": "Boolean",
            "optional": false,
            "field": "playing",
            "description": "<p>Boolean value if the app is playing</p>"
          },
          {
            "group": "Parameter",
            "type": "Boolean",
            "optional": false,
            "field": "isDevice",
            "description": "<p>Boolean value if the account is a device account or not</p>"
          },
          {
            "group": "Parameter",
            "type": "Boolean",
            "optional": false,
            "field": "isDeviceActive",
            "description": "<p>Boolean value if there's a Spotify account active on a device</p>"
          },
          {
            "group": "Parameter",
            "type": "Function",
            "optional": false,
            "field": "onNext",
            "description": "<p>Function to call if the current song is skipped</p>"
          },
          {
            "group": "Parameter",
            "type": "Function",
            "optional": false,
            "field": "onPlay",
            "description": "<p>Function to call if the current song is played/paused</p>"
          }
        ]
      }
    },
    "description": "<p>This component handles the first song in the queue and contains all the playback controls. It is responsible for checking user authorisation and checks if the account is allowed to control playback of the music.</p>",
    "success": {
      "examples": [
        {
          "title": "Songcards.jsx",
          "content": "<CurrentlyPlaying\n  track={this.songs[0]}\n  currentSongDuration={this.songs[0].duration}\n  playing={this.playing}\n  isDevice={true}\n  isDeviceActive={false}\n  onNext={this.handleNext}\n  onPlay={this.handlePlay}\n/>",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./components/queue/CurrentlyPlaying.jsx",
    "groupTitle": "Components"
  },
  {
    "type": "Stateless functional Component",
    "url": "<Error|text|subtext/>",
    "title": "common/Error.jsx",
    "name": "Error",
    "group": "Components",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "text",
            "description": "<p>Text to display the error message</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "subtext",
            "description": "<p>Subtext to display more information on the error message</p>"
          }
        ]
      }
    },
    "description": "<p>This components renders an error note. It also renders any children to elaborate on an error message</p>",
    "success": {
      "examples": [
        {
          "title": "Songcards.jsx",
          "content": "<Error text=\"Unauthorised\" subtext=\"You need to login to your account to search for songs\">\n  <img src=\"...\" alt=\"...\" />\n</Error>",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./components/common/Error.jsx",
    "groupTitle": "Components"
  },
  {
    "type": "Class Component",
    "url": "Form",
    "title": "common/Form.jsx",
    "name": "Form",
    "group": "Components",
    "description": "<p>This component is used for forms. It is built to be used as an extension to provide common functionality accross all forms i.e. login, signup etc. usability is documented in the code</p>",
    "success": {
      "examples": [
        {
          "title": "LoginForm.jsx",
          "content": "Class LoginForm extends Form {\n  schema = { ... }\n  doSubmit() { ... }\n  render() {\n    return (\n      {this.renderTitle(\"Login form\")}\n      ...\n    );\n  }\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./components/common/Form.jsx",
    "groupTitle": "Components"
  },
  {
    "type": "Class Component",
    "url": "<Index/>",
    "title": "Index.jsx",
    "name": "Index",
    "group": "Components",
    "description": "<p>This components renders the home screen from the root URL</p>",
    "success": {
      "examples": [
        {
          "title": "Home page",
          "content": "<Index/>",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./components/Index.jsx",
    "groupTitle": "Components"
  },
  {
    "type": "Stateless functional Component",
    "url": "<Info|text/>",
    "title": "common/Info.jsx",
    "name": "Info",
    "group": "Components",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "text",
            "description": "<p>Text to display</p>"
          }
        ]
      }
    },
    "description": "<p>Simply enders information to the user</p>",
    "success": {
      "examples": [
        {
          "title": "Songcards.jsx",
          "content": "<Info text=\"Be careful\"/>",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./components/common/Info.jsx",
    "groupTitle": "Components"
  },
  {
    "type": "Stateless functional Component",
    "url": "<Input|name|type|label|placeholder|value?|error|onChange/>",
    "title": "common/Input.jsx",
    "name": "Input",
    "group": "Components",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Name of the input component, used for referencing the label with the associated input</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "type",
            "description": "<p>Type of the html input element</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "label",
            "description": "<p>Text for the label to display</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "placeholder",
            "description": "<p>Text to show as a placholder for the input element</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "value",
            "description": "<p>Default value for the input element</p>"
          },
          {
            "group": "Parameter",
            "type": "Boolean",
            "optional": false,
            "field": "error",
            "description": "<p>Boolean value based on the user input validation</p>"
          },
          {
            "group": "Parameter",
            "type": "Function",
            "optional": false,
            "field": "onChange",
            "description": "<p>Function to run when the input value changes</p>"
          }
        ]
      }
    },
    "description": "<p>An text input component that is rendered. Customised to handle errors and on change properties, contains a label and input element.</p>",
    "success": {
      "examples": [
        {
          "title": "LoginForm.jsx",
          "content": "<Input\n  name=\"username\"\n  type=\"text\"\n  label=\"Username\"\n  placeholder=\"johnsmith123\"\n  error={false}\n  onChange={this.handleChange}\n/>",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./components/common/Input.jsx",
    "groupTitle": "Components"
  },
  {
    "type": "Stateless functional Component",
    "url": "<InputCustom|name|type|label|placeholder|value?|error|onChange|classProp/>",
    "title": "common/InputCustom.jsx",
    "name": "InputCustom",
    "group": "Components",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Name of the input component, used for referencing the label with the associated input</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "type",
            "description": "<p>Type of the html input element</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "label",
            "description": "<p>Text for the label to display</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "placeholder",
            "description": "<p>Text to show as a placholder for the input element</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "value",
            "description": "<p>Default value for the input element</p>"
          },
          {
            "group": "Parameter",
            "type": "Boolean",
            "optional": false,
            "field": "error",
            "description": "<p>Boolean value based on the user input validation</p>"
          },
          {
            "group": "Parameter",
            "type": "Function",
            "optional": false,
            "field": "onChange",
            "description": "<p>Function to run when the input value changes</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "classProp",
            "description": "<p>Class properties to pass down to the component</p>"
          }
        ]
      }
    },
    "description": "<p>An text input component that is rendered. Customised to handle errors and on change properties, contains a label and input element. This is a more malleable version of the Input component with class properties.</p>",
    "success": {
      "examples": [
        {
          "title": "LoginForm.jsx",
          "content": "<InputCustom\n  name=\"username\"\n  type=\"text\"\n  label=\"Username\"\n  placeholder=\"johnsmith123\"\n  error={false}\n  onChange={this.handleChange}\n  classProp=\"red btn\"\n/>",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./components/common/InputCustom.jsx",
    "groupTitle": "Components"
  },
  {
    "type": "Class Component",
    "url": "<Layout>{children}</Layout>",
    "title": "Layout.jsx",
    "name": "Layout",
    "group": "Components",
    "description": "<p>This component renders the essential components to the screen, essentially a wrapper for each html page served to the client. For example, it renders all of its children passed. The header, navigation bar and meta tags are defined here.</p>",
    "success": {
      "examples": [
        {
          "title": "page-name.js",
          "content": "<Layout>\n  page content\n</Layout>",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./components/Layout.jsx",
    "groupTitle": "Components"
  },
  {
    "type": "Class Component",
    "url": "<LoginForm/>",
    "title": "forms/LoginForm.jsx",
    "name": "LoginForm",
    "group": "Components",
    "description": "<p>This component simple renders a login form. Extends from class Form.</p>",
    "success": {
      "examples": [
        {
          "title": "Login.js",
          "content": "<LoginForm />",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./components/forms/LoginForm.jsx",
    "groupTitle": "Components"
  },
  {
    "type": "Class Component",
    "url": "<Logout/>",
    "title": "forms/Logout.jsx",
    "name": "Logout",
    "group": "Components",
    "description": "<p>This component logs out the user when mounted.</p>",
    "success": {
      "examples": [
        {
          "title": "Logout.js",
          "content": "<Logout />",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./components/forms/Logout.jsx",
    "groupTitle": "Components"
  },
  {
    "type": "Stateless functional Component",
    "url": "<Modal|show|children/>",
    "title": "common/Modal.jsx",
    "name": "Modal",
    "group": "Components",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Boolean",
            "optional": false,
            "field": "show",
            "description": "<p>A boolean value to indicate whether the modal is displayed or hidden</p>"
          },
          {
            "group": "Parameter",
            "type": "Object[]",
            "optional": false,
            "field": "children",
            "description": "<p>A built in React object which specficies all the children of the component</p>"
          }
        ]
      }
    },
    "description": "<p>A modal that appears higher than another other component on screen, used to show important information or feedback to the user</p>",
    "success": {
      "examples": [
        {
          "title": "Songcards.jsx",
          "content": "<Modal show={false}>\n  <h1>Song has been added!</h1>\n</Modal>",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./components/common/Modal.jsx",
    "groupTitle": "Components"
  },
  {
    "type": "Class Component",
    "url": "<Navbar|user?/>",
    "title": "Navbar.jsx",
    "name": "Navbar",
    "group": "Components",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "user",
            "description": "<p>Currently logged in user (optional)</p>"
          }
        ]
      }
    },
    "description": "<p>This components renders the navigation bar at the top of the user's screen</p>",
    "success": {
      "examples": [
        {
          "title": "Layout.jsx",
          "content": "<Navbar user={this.state.user} />",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./components/Navbar.jsx",
    "groupTitle": "Components"
  },
  {
    "type": "Class Component",
    "url": "<PlaybackControls|playing|paused|currentSongDuration|handleNext|handlePlay/>",
    "title": "queue/PlaybackControls.jsx",
    "name": "PlaybackControls",
    "group": "Components",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Boolean",
            "optional": false,
            "field": "playing",
            "description": "<p>Boolean value if the app is playing</p>"
          },
          {
            "group": "Parameter",
            "type": "Boolean",
            "optional": false,
            "field": "paused",
            "description": "<p>Boolean value if the app is paused</p>"
          },
          {
            "group": "Parameter",
            "type": "Integer",
            "optional": false,
            "field": "currentSongDuration",
            "description": "<p>Time in milliseconds of the current track's duration</p>"
          },
          {
            "group": "Parameter",
            "type": "Function",
            "optional": false,
            "field": "handleNext",
            "description": "<p>Function to call if the current song is skipped</p>"
          },
          {
            "group": "Parameter",
            "type": "Function",
            "optional": false,
            "field": "handlePlay",
            "description": "<p>Function to call if the current song is played/paused</p>"
          }
        ]
      }
    },
    "description": "<p>This component is responsible for rendering and handling the playback controls.</p>",
    "success": {
      "examples": [
        {
          "title": "CurrentlyPlaying.jsx",
          "content": "<PlaybackControls\n  playing={this.playing}\n  paused={!this.playing}\n  currentSongDuration={this.songs[0].duration}\n  handleNext={this.handleNext}\n  handleNext={this.handlePlay}\n/>",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./components/queue/PlaybackControls.jsx",
    "groupTitle": "Components"
  },
  {
    "type": "Stateless Functional Component",
    "url": "<Queue|tracks|onDelete/>",
    "title": "queue/Queue.jsx",
    "name": "Queue",
    "group": "Components",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Object[]",
            "optional": false,
            "field": "tracks",
            "description": "<p>Object array of the songs in the queue</p>"
          },
          {
            "group": "Parameter",
            "type": "Function",
            "optional": false,
            "field": "onDelete",
            "description": "<p>Delete function if a song in the queue is to be deleted</p>"
          },
          {
            "group": "Parameter",
            "type": "Boolean",
            "optional": false,
            "field": "explicitToggle",
            "description": "<p>Boolean value if the explicit songs should be displayed or not</p>"
          },
          {
            "group": "Parameter",
            "type": "Boolean",
            "optional": false,
            "field": "deleteToggle",
            "description": "<p>Boolean value if the remove button should be displayed or not</p>"
          }
        ]
      }
    },
    "description": "<p>This component is responsible for rendering the queue of songs and a delete function to remove any of the songs.</p>",
    "success": {
      "examples": [
        {
          "title": "CurrentlyPlaying.jsx",
          "content": "<Queue\n  tracks={this.songs}\n  onDelete={this.handleDelete}\n/>",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./components/queue/Queue.jsx",
    "groupTitle": "Components"
  },
  {
    "type": "Class Component",
    "url": "<Queue|tracks|onDelete/>",
    "title": "queue/Queue.jsx",
    "name": "Queue",
    "group": "Components",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Object[]",
            "optional": false,
            "field": "tracks",
            "description": "<p>Object array of the songs in the queue</p>"
          },
          {
            "group": "Parameter",
            "type": "Function",
            "optional": false,
            "field": "onDelete",
            "description": "<p>Delete function if a song in the queue is to be deleted</p>"
          }
        ]
      }
    },
    "description": "<p>This component is responsible for rendering the queue of songs and a delete function to remove any of the songs.</p>",
    "success": {
      "examples": [
        {
          "title": "CurrentlyPlaying.jsx",
          "content": "<Queue\n  tracks={this.songs}\n  onDelete={this.handleDelete}\n/>",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./components/queue/Songcards.jsx",
    "groupTitle": "Components"
  },
  {
    "type": "Class Component",
    "url": "<SearchBar|classProp/>",
    "title": "search/SearchBar.jsx",
    "name": "SearchBar",
    "group": "Components",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "classProp",
            "description": "<p>Classes to pass down to the search bar component</p>"
          }
        ]
      }
    },
    "description": "<p>This components renders the search bar and invisible search table</p>",
    "success": {
      "examples": [
        {
          "title": "Navbar.jsx",
          "content": "<SearchBar/>",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./components/search/SearchBar.jsx",
    "groupTitle": "Components"
  },
  {
    "type": "Class Component",
    "url": "<SearchTable|result|authorised|showTable/>",
    "title": "search/searchTable.jsx",
    "name": "SearchTable",
    "group": "Components",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Object[]",
            "optional": false,
            "field": "result",
            "description": "<p>Results of the track search from the server</p>"
          },
          {
            "group": "Parameter",
            "type": "Boolean",
            "optional": false,
            "field": "authorised",
            "description": "<p>A boolean value whether the queue has Spotify authorised</p>"
          },
          {
            "group": "Parameter",
            "type": "Boolean",
            "optional": false,
            "field": "showTable",
            "description": "<p>A boolean value whether the table should be displayed or hidden</p>"
          }
        ]
      }
    },
    "description": "<p>This components renders the search bar and invisible search table</p>",
    "success": {
      "examples": [
        {
          "title": "SearchTable.jsx",
          "content": "<SearchTable \n  result={\n    { complex object ... },\n    { complex object ... }}\n  authorised={true}\n  showTable={true}/>",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./components/search/SearchTable.jsx",
    "groupTitle": "Components"
  },
  {
    "type": "Class Component",
    "url": "<SignUpForm/>",
    "title": "forms/SignUpForm.jsx",
    "name": "SignUpForm",
    "group": "Components",
    "description": "<p>This component simple renders a sign up form. Extends from class Form.</p>",
    "success": {
      "examples": [
        {
          "title": "Signup.js",
          "content": "<SignUpForm />",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./components/forms/SignUpForm.jsx",
    "groupTitle": "Components"
  },
  {
    "type": "Class Component",
    "url": "<SongDuration|currentSongDuration|isPlaying|handleNext/>",
    "title": "queue/SongDuration.jsx",
    "name": "SongDuration",
    "group": "Components",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Integer",
            "optional": false,
            "field": "currentSongDuration",
            "description": "<p>Time in milliseconds of the current track's duration</p>"
          },
          {
            "group": "Parameter",
            "type": "Boolean",
            "optional": false,
            "field": "isPlaying",
            "description": "<p>Boolean if the app is playing music or not</p>"
          },
          {
            "group": "Parameter",
            "type": "Function",
            "optional": false,
            "field": "handleNext",
            "description": "<p>Function to handle the next song in the queue</p>"
          }
        ]
      }
    },
    "description": "<p>This component is responsible for handling the song duration slider. It has an inbuilt timer to check whether the duration as been reached.</p>",
    "success": {
      "examples": [
        {
          "title": "PlaybackControls.jsx",
          "content": "<SongDuration currentSongDuration={currentSongDuration} isPlaying={playing} isPaused={paused} handleNext={handleNext} />",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./components/queue/SongDuration.jsx",
    "groupTitle": "Components"
  },
  {
    "type": "Stateless functional Component",
    "url": "<Submit|text/>",
    "title": "common/Submit.jsx",
    "name": "Submit",
    "group": "Components",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "text",
            "description": "<p>Text to display on the submit button</p>"
          }
        ]
      }
    },
    "description": "<p>This renders a button to handle form submits. Therefore it must be wrapped within a form tag</p>",
    "success": {
      "examples": [
        {
          "title": "LoginForm.jsx",
          "content": "<form>\n  ...\n  <Submit text=\"Submit form\" />\n</form>",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./components/common/Submit.jsx",
    "groupTitle": "Components"
  },
  {
    "type": "Class Component",
    "url": "<Timer|time|onUpdate/>",
    "title": "common/Timer.jsx",
    "name": "Timer",
    "group": "Components",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Integer",
            "optional": false,
            "field": "time",
            "description": "<p>Text time</p>"
          },
          {
            "group": "Parameter",
            "type": "Function",
            "optional": false,
            "field": "onUpdate",
            "description": "<p>Function to be called once the supplied time is reached</p>"
          }
        ]
      }
    },
    "description": "<p>A timer component for simulating a stop watch. Once the supplied time is reach, the onUpdate function will get called internally. The ouput is in the form of a input slider.</p>",
    "success": {
      "examples": [
        {
          "title": "Songcards.jsx",
          "content": "<Timer time={this.state.time} onUpdate={this.updateSongQueue} />",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./components/common/Timer.jsx",
    "groupTitle": "Components"
  },
  {
    "type": "Class Component",
    "url": "<VolumeSlider|currentSongDuration|isPlaying|handleNext/>",
    "title": "queue/VolumeSlider.jsx",
    "name": "VolumeSlider",
    "group": "Components",
    "description": "<p>This component is responsible for handling the volume slider. This changes the volume for the authorised Spotify account</p>",
    "success": {
      "examples": [
        {
          "title": "PlaybackControls.jsx",
          "content": "<VolumeSlider />",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./components/queue/VolumeSlider.jsx",
    "groupTitle": "Components"
  },
  {
    "type": "post",
    "url": "/api/history/",
    "title": "POST History",
    "name": "PostHistory",
    "group": "History",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "songID",
            "description": "<p>Song id for the song to get audio features</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "acousticness",
            "description": "<p>acousticness for the song, more info on Spotify API</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "danceability",
            "description": "<p>danceability for the song, more info on Spotify API</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "energy",
            "description": "<p>energy for the song, more info on Spotify API</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "instrumentalness",
            "description": "<p>instrumentalness for the song, more info on Spotify API</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "loudness",
            "description": "<p>loudness for the song, more info on Spotify API</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "speechiness",
            "description": "<p>speechiness for the song, more info on Spotify API</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "valence",
            "description": "<p>valence for the song, more info on Spotify API</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "tempo",
            "description": "<p>tempo for the song, more info on Spotify API</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "Result",
            "description": "<p>of the history object added</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "400": [
          {
            "group": "400",
            "optional": false,
            "field": "AlreadyAdded",
            "description": "<p>History for the song is already added</p>"
          },
          {
            "group": "400",
            "optional": false,
            "field": "BadRequest",
            "description": "<p>Error validating history</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./routes/history.js",
    "groupTitle": "History"
  },
  {
    "type": "get",
    "url": "/api/songs/:id",
    "title": "DELETE Song",
    "name": "DeleteQueue",
    "group": "Queue",
    "description": "<p>Deletes a song from the queue with the given ID in the URL body</p>",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "body",
            "description": "<p>The song that has been successfully deleted</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "404": [
          {
            "group": "404",
            "optional": false,
            "field": "BadRequest",
            "description": "<p>The song with the given ID wasn't found</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./routes/songs.js",
    "groupTitle": "Queue"
  },
  {
    "type": "get",
    "url": "/api/songs/",
    "title": "GET Songs",
    "name": "GetQueue",
    "group": "Queue",
    "description": "<p>Gets all songs in the queue, filters the first N songs by time, then the rest by priority. Updates the song's priorty on each call.</p>",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "body",
            "description": "<p>list of all songs in the current queue</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./routes/songs.js",
    "groupTitle": "Queue"
  },
  {
    "type": "get",
    "url": "/api/songs/",
    "title": "POST Song",
    "name": "PostQueue",
    "group": "Queue",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "requestedBy",
            "description": "<p>User ID of the user who requested the song</p>"
          },
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "song",
            "description": "<p>Object of the song received from Spotify</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>Username of the user who requested the song</p>"
          }
        ]
      }
    },
    "description": "<p>Adds a new song to the current queue. Adds the current logged in user and assigns the user priority to the song priority</p>",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "body",
            "description": "<p>The song that has successfully been added to the queue</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "400": [
          {
            "group": "400",
            "optional": false,
            "field": "InvalidBody",
            "description": "<p>Validation error details</p>"
          }
        ],
        "404": [
          {
            "group": "404",
            "optional": false,
            "field": "UserNotFound",
            "description": "<p>The current logged in user was not found</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./routes/songs.js",
    "groupTitle": "Queue"
  },
  {
    "type": "Function",
    "url": "createDic(url)",
    "title": "createDic.py",
    "name": "CreateDictionary",
    "group": "Recommend_Algorithm",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "URL",
            "description": "<p>The current url of database.</p>"
          }
        ]
      }
    },
    "description": "<p>This components lets the createDic.py to get current song features to save as a csv file.</p>",
    "version": "0.0.0",
    "filename": "./recommandAlgorithm/createDic.py",
    "groupTitle": "Recommend_Algorithm"
  },
  {
    "type": "Function",
    "url": "recommand(url)",
    "title": "recommand.py",
    "name": "RecommendAlgorithm",
    "group": "Recommend_Algorithm",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "URL",
            "description": "<p>The current url of database.</p>"
          }
        ]
      }
    },
    "description": "<p>This components lets the recommandAlgorithm.py to get current song ids for the machine learning</p>",
    "version": "0.0.0",
    "filename": "./recommandAlgorithm/recommand.py",
    "groupTitle": "Recommend_Algorithm"
  },
  {
    "type": "get",
    "url": "/api/spotify/alexa",
    "title": "Search & Add Track Alexa",
    "name": "SpotifyAlexaTrack",
    "group": "Spotify",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "query",
            "description": "<p>Keyword to be used to search Spotify</p>"
          }
        ]
      }
    },
    "description": "<p>This endpoint selects the top track from a search with they input query. Then this result is added to the queue</p>",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "returns",
            "description": "<p>the response object from the Spotify call</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "SpotifyError",
            "description": "<p>Spotify error message</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./routes/spotify.js",
    "groupTitle": "Spotify"
  },
  {
    "type": "get",
    "url": "/api/spotify/features/:id",
    "title": "Get Audio Features",
    "name": "SpotifyAudioFeatures",
    "group": "Spotify",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>ID of the track to get audio features from</p>"
          }
        ]
      }
    },
    "description": "<p>This endpoint gets the audio features of the tracks i.e. acousticness, energy etc.</p>",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "returns",
            "description": "<p>the response object from the Spotify call</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "SpotifyError",
            "description": "<p>Spotify error message</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./routes/spotify.js",
    "groupTitle": "Spotify"
  },
  {
    "type": "get",
    "url": "/api/spotify/getMe",
    "title": "Get Authorised User",
    "name": "SpotifyAuthorisedUser",
    "group": "Spotify",
    "description": "<p>This endpoint plays the track with the given</p>",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "returns",
            "description": "<p>the response object from the Spotify call</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "SpotifyError",
            "description": "<p>Spotify error message</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./routes/spotify.js",
    "groupTitle": "Spotify"
  },
  {
    "type": "get",
    "url": "/api/spotify/getCurrent",
    "title": "Get Track",
    "name": "SpotifyGetTrack",
    "group": "Spotify",
    "description": "<p>This endpoint gets the currently playing track on the authorised user</p>",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "returns",
            "description": "<p>the response object from the Spotify call</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "SpotifyError",
            "description": "<p>Spotify error message</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./routes/spotify.js",
    "groupTitle": "Spotify"
  },
  {
    "type": "get",
    "url": "/api/spotify/login",
    "title": "Authorise Spotify",
    "name": "SpotifyLogin",
    "group": "Spotify",
    "description": "<p>Creates the authorisation URL for Spotify which allows you to retrieve a token</p>",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "undefined",
            "optional": false,
            "field": "null",
            "description": "<p>redirect to Spotify Authorisation Grant</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./routes/spotify.js",
    "groupTitle": "Spotify"
  },
  {
    "type": "get",
    "url": "/api/spotify/pause",
    "title": "Pause Track",
    "name": "SpotifyPauseTrack",
    "group": "Spotify",
    "description": "<p>This endpoint simply pauses the track that is currently playing</p>",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "returns",
            "description": "<p>the response object from the Spotify call</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "SpotifyError",
            "description": "<p>Spotify error message</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./routes/spotify.js",
    "groupTitle": "Spotify"
  },
  {
    "type": "get",
    "url": "/api/spotify/resume/:uri",
    "title": "Resume Track",
    "name": "SpotifyResumeTrack",
    "group": "Spotify",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "uri",
            "description": "<p>Resume a paused track given the Spotify URI</p>"
          }
        ]
      }
    },
    "description": "<p>This endpoint resumes a track given its URI</p>",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "returns",
            "description": "<p>the response object from the Spotify call</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "SpotifyError",
            "description": "<p>Spotify error message</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./routes/spotify.js",
    "groupTitle": "Spotify"
  },
  {
    "type": "get",
    "url": "/api/spotify/volume/:newVolume",
    "title": "Set Volume",
    "name": "SpotifySetVolume",
    "group": "Spotify",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "newVolume",
            "description": "<p>New volume to set Spotify</p>"
          }
        ]
      }
    },
    "description": "<p>This endpoint resumes a track given its URI</p>",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "returns",
            "description": "<p>the response object from the Spotify call</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "SpotifyError",
            "description": "<p>Spotify error message</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./routes/spotify.js",
    "groupTitle": "Spotify"
  },
  {
    "type": "get",
    "url": "/api/spotify/start/:uri",
    "title": "Start Track",
    "name": "SpotifyStartTrack",
    "group": "Spotify",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "uri",
            "description": "<p>URI of the song to be played</p>"
          }
        ]
      }
    },
    "description": "<p>This endpoint plays the track with the given</p>",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "returns",
            "description": "<p>the response object from the Spotify call</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "SpotifyError",
            "description": "<p>Spotify error message</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./routes/spotify.js",
    "groupTitle": "Spotify"
  },
  {
    "type": "get",
    "url": "/api/spotify/search/:query",
    "title": "Search Track",
    "name": "SpotifyTrackSearch",
    "group": "Spotify",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "query",
            "description": "<p>Keyword to search for the songs using Spotify</p>"
          }
        ]
      }
    },
    "description": "<p>Searches for a track given the query parameter. If no tracks are found, then an error is sent.</p>",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "data",
            "description": "<p>The top songs (max 20) matching the query</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "SpotifyError",
            "description": "<p>Spotify error message</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./routes/spotify.js",
    "groupTitle": "Spotify"
  },
  {
    "type": "delete",
    "url": "/api/user/me",
    "title": "DELETE User",
    "name": "DeleteUser",
    "group": "User",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "User",
            "description": "<p>that was deleted</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "404": [
          {
            "group": "404",
            "optional": false,
            "field": "NotFound",
            "description": "<p>The user with the given ID was not found</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./routes/users.js",
    "groupTitle": "User"
  },
  {
    "type": "get",
    "url": "/api/user/:id",
    "title": "GET User",
    "name": "GetUser",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Users unique ID</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "body",
            "description": "<p>User information without sensitive data</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "404": [
          {
            "group": "404",
            "optional": false,
            "field": "NoUserFound",
            "description": "<p>No user found with the given ID</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./routes/users.js",
    "groupTitle": "User"
  },
  {
    "type": "post",
    "url": "/api/user/login",
    "title": "LOGIN User",
    "name": "LoginUser",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>User inputted username</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>User inputted password</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "JSON",
            "description": "<p>Web Token</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "400": [
          {
            "group": "400",
            "optional": false,
            "field": "InvalidBody",
            "description": "<p>Validation error details</p>"
          },
          {
            "group": "400",
            "optional": false,
            "field": "BadRequest",
            "description": "<p>Incorrect username or password</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./routes/users.js",
    "groupTitle": "User"
  },
  {
    "type": "post",
    "url": "/api/user/",
    "title": "POST User",
    "name": "PostUser",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>User inputted username</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>User inputted password</p>"
          },
          {
            "group": "Parameter",
            "type": "Boolean",
            "optional": false,
            "field": "isDevice",
            "description": "<p>Is the account a device account or not</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "JSON",
            "description": "<p>Web Token</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "400": [
          {
            "group": "400",
            "optional": false,
            "field": "InvalidBody",
            "description": "<p>Validation error details</p>"
          },
          {
            "group": "400",
            "optional": false,
            "field": "BadRequest",
            "description": "<p>User is already registered</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./routes/users.js",
    "groupTitle": "User"
  },
  {
    "type": "put",
    "url": "/api/user/me",
    "title": "UPDATE User",
    "name": "PutUser",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>Username of the current user</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>New password for the user</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "User",
            "description": "<p>insensitive information</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "400": [
          {
            "group": "400",
            "optional": false,
            "field": "InvalidBody",
            "description": "<p>validation error details</p>"
          }
        ],
        "404": [
          {
            "group": "404",
            "optional": false,
            "field": "NotFound",
            "description": "<p>The user with the given ID was not found</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./routes/users.js",
    "groupTitle": "User"
  }
] });
