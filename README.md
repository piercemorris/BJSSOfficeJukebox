# Group 14 BJSS Office Jukebox

## Useful links

Trello documentation board: https://trello.com/b/sCW8NXz7/office-jukebox-documentation <br />
Trello development board: https://trello.com/b/vLMkoKj0/office-jukebox-code <br />
Google drive document repository: https://drive.google.com/drive/u/0/folders/1xXb6svEFCJFJYMQZI_IIbIgOUiKc0alG <br />

## Contents / project structure

`bjssJukeboxBackend/` - contains the Node.js backend of the project i.e. the web server <br />
`bjssjukeboxfrontend/` - contains the React.js frontend of the project i.e. the web interface

## Dependencies

### Node

1. To download and install go to -> https://nodejs.org/en/ and download the current stable version - this will download both Node.js and NPM which is a package manager for node.
2. To test if the download is successful, type into the commandline/terminal `$ node -v` which checks the version downloaded and means it's been installed globally.

To run `bjssJukeboxBackend/`:

- **Read the README.md in the root of the folder**

To run `bjssjukeboxfrontend/`:

- **Read the README.md in the root of the folder**

### Team Members

Pierce James Morris (psypm@nottingham.ac.uk)<br />
James Bennett (psyjb12@nottingham.ac.uk)<br />
Runzhou Li (psyrl6@nottingham.ac.uk)<br />
Xingke Song (psyxs2@nottingham.ac.uk)<br />
Robert Laing (leyrpl@nottingham.ac.uk)<br />
Yousef Ismail (psyyi@nottingham.ac.uk)<br />

### Supervisor

Tony Pridmore
tony.pridmore@nottingham.ac.uk

### Sponsor

BJSS
Leigh White
Leigh.White@bjss.com

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
