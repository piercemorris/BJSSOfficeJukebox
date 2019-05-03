const Alexa = require('ask-sdk-core');
const http = require('http');

const LaunchRequestHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'LaunchRequest';
    },
    handle(handlerInput) {
        const speechText = 'Welcome to the BJSS Office-Jukebox!';
        return handlerInput.responseBuilder
            .speak(speechText)
            .reprompt(speechText)
            .getResponse();
    }
};

function httpPost(query) {
    return new Promise(((resolve, reject) => {
        
        const queryString = JSON.stringify({
            query: query
        });
        
        const options = {
            hostname: 'office-jukebox.herokuapp.com',
            port: 80,
            path: '/api/spotify/alexa',
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Content-Length': queryString.length
            }
        };
        
        const request = http.request(options, (response) => {
            response.setEncoding('utf-8');
            let returnData = '';
            
            response.on('data', (data) => {
                if(response.statusCode === 200) {//Good song request
                    var songText = "";
                    var jsonData = JSON.parse(data);
                    songText = songText + jsonData.songName;
                    var artistText = "";
                    artistText = artistText + jsonData.songArtist;
                    returnData = "Adding " + songText + " by " + artistText + " to the queue!";
                    console.log("message to return = " + returnData);
                }
                else if(response.statusCode === 404)  {//Bad song request
                    console.log("in code 404 block");
                    returnData = "Sorry, I couldn't find that song.";    
                }
            })
            
            
            response.on('end', () => {
                resolve(returnData);
            });
            
            response.on('error', (error) => {
                reject(error);
            });
        });
        request.write(queryString);
        request.end();
    }));
}


const QueueIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && handlerInput.requestEnvelope.request.intent.name === 'QueueIntent';
    },
    async handle(handlerInput) {
        const query = handlerInput.requestEnvelope.request.intent.slots.Query.value;
        const speechResponse = await httpPost(query);
        
        return handlerInput.responseBuilder
            .speak(speechResponse)
            .getResponse();
    }
};
const HelpIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && handlerInput.requestEnvelope.request.intent.name === 'AMAZON.HelpIntent';
    },
    handle(handlerInput) {
        const speechText = 'Try saying queue followed by a song name.';

        return handlerInput.responseBuilder
            .speak(speechText)
            .reprompt(speechText)
            .getResponse();
    }
};
const CancelAndStopIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && (handlerInput.requestEnvelope.request.intent.name === 'AMAZON.CancelIntent'
                || handlerInput.requestEnvelope.request.intent.name === 'AMAZON.StopIntent');
    },
    handle(handlerInput) {
        const speechText = 'Goodbye!';
        return handlerInput.responseBuilder
            .speak(speechText)
            .getResponse();
    }
};
const SessionEndedRequestHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'SessionEndedRequest';
    },
    handle(handlerInput) {
        // Any cleanup logic goes here.
        return handlerInput.responseBuilder.getResponse();
    }
};

// The intent reflector is used for interaction model testing and debugging.
// It will simply repeat the intent the user said. You can create custom handlers
// for your intents by defining them above, then also adding them to the request
// handler chain below.
const IntentReflectorHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest';
    },
    handle(handlerInput) {
        const intentName = handlerInput.requestEnvelope.request.intent.name;
        const speechText = `You just triggered ${intentName}`;

        return handlerInput.responseBuilder
            .speak(speechText)
            //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
            .getResponse();
    }
};

// Generic error handling to capture any syntax or routing errors. If you receive an error
// stating the request handler chain is not found, you have not implemented a handler for
// the intent being invoked or included it in the skill builder below.
const ErrorHandler = {
    canHandle() {
        return true;
    },
    handle(handlerInput, error) {
        console.log(`~~~~ Error handled: ${error.message}`);
        const speechText = `Sorry, I couldn't understand what you said. Please try again.`;

        return handlerInput.responseBuilder
            .speak(speechText)
            .reprompt(speechText)
            .getResponse();
    }
};

// This handler acts as the entry point for your skill, routing all request and response
// payloads to the handlers above. Make sure any new handlers or interceptors you've
// defined are included below. The order matters - they're processed top to bottom.
exports.handler = Alexa.SkillBuilders.custom()
    .addRequestHandlers(
        LaunchRequestHandler,
        QueueIntentHandler,
        HelpIntentHandler,
        CancelAndStopIntentHandler,
        SessionEndedRequestHandler,
        IntentReflectorHandler) // make sure IntentReflectorHandler is last so it doesn't override your custom intent handlers
    .addErrorHandlers(
        ErrorHandler)
    .lambda();

