# Software docs 

We have comprehensive software docs found at: https://perjermer.github.io/BJSSOfficeJukebox/

# Tools for local development

Database - `mongodb compass`<br />

- for local database testing, go to - https://docs.mongodb.com/compass/master/install/ - for setup
  <br />

Creating HTTP Requests - `Postman`

- for creating GET, POST, PUT etc.. http requests to the project running locally i.e. API development environment; go to - https://www.getpostman.com/ - for downloading
  <br />

## Live database

Created using <a href="https://mlab.com/databases/jukebox/">mLab</a>

# Git Commands

### Setup

- `$ mkdir group14` - Create a directory for the project
- `$ cd group14` - To locate to the new folder
- `$ git init` - To initialise a git repository
- `$ git clone https://github.com/perjermer/BJSSOfficeJukebox.git` - To download the repository
- `$ git config user.name "<username>"` - To set your username
- `$ git config user.email "<email address>"` - To set your email

### Making Changes

- `$ git status` - Lists all new or modified files to be committed
- `$ git add <file>` - Adds file ready to be committed
- `$ git add .` - Adds all files/changes ready to be committed
- `$ git commit -m "<descriptive message>"` - Records files permanently in version history
- `$ git push <branch name>` - Pushes committed changes to the branch

#### Commits

For the `<descriptive message>` they need to be _descriptive_ as the name implies, and in the present tense for example:
`$ git commit -m "add post route to create a new user"`

#### Branches

- `$ git branch` - Lists all of the local branches in the current repository
- `$ git branch <branch name>` - Creates a new branch
- `$ git checkout <branch name>` - Switches to the specified branch
- `$ git merge <branch name>` - Merges the specified branch's history into the current branch

For the `<branch name>` they too need to be descriptive and should be clear what the branch is set out to accomplish, and prefixed with whatever project you are working on followed by a hyphen; then use camelCase for the feature you are working on. For example:

- `$ git branch node-postUser`
- `$ git branch react-queueComponent`
- `$ git branch python-createData`

# Development Instructions

### Development IDE/Code editor

You can choose any IDE or code editor for the project. Most popular with Node applications and development in general is:

- Visual Studio Code (my choice)
- Atom
- Sublime Text
