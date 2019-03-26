# Alexa
This folder is for including a copy of code that powers our app's integration with Alexa.
Please note that the contents in folder are never executed, this is done through AWS Lambda.
The code was developed and deployed using Amazon's online Alexa Developer Console. 

## Alexa Skills
'Skills' are programs that run on an Amazon Alexa device, so you have skills for news, weather, cooking, etc. We have developed a skill to allow our client to interact with the 'Jukebox' web app using voice commands.

Greater detail into Amazon's terminology - and how Skills are developed - has been documented [in the wiki](https://github.com/perjermer/BJSSOfficeJukebox/wiki/Alexa-Integration).

## The code
In this folder's `index.js`, the section demarcated as `QueueIntentHandler` is of particular interest.  This is the code that handles the user's input when they have asked to add their song to the queue. 
This code parses the user's input, returning the actual search query.
Then a POST call is made using Node's native `http` library to our web server. Specifically, to our `/api/spotify/alexa` route, which can be found in the `routes` folder of this repository.

That code then subsiquently adds the user's song to the queue, based off the first Spotify search result from their query. 