/* eslint-disable  func-names */
/* eslint-disable  no-console */

const Alexa = require('ask-sdk');


function get_date(){
  
  const date = new Date();
  
  const current_day = date.getDate();
  
  const string_day = current_day.toString();
  
  const months = ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"];
  
  const month_now = months[date.getMonth()];
  
  //
  
  const fs = require("fs");
  
  let fileName = "frase.json";
  
  let obj = JSON.parse(fs.readFileSync(fileName));
  
  var frase = obj[month_now][string_day];
  
  //

  var startVoice = "Esta es la frase del "+string_day+" "+month_now+". "+frase+". ";
  
  return startVoice;

}


const fraseDiariaHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'LaunchRequest'
      || (request.type === 'IntentRequest'
        && request.intent.name === 'GetNewFactIntent');
  },
  handle(handlerInput) {

    return handlerInput.responseBuilder
      .speak(get_date())
      .getResponse();
  },
};


const ErrorHandler = {
  canHandle() {
    return true;
  },
  handle(handlerInput, error) {
    console.log(`Error handled: ${error.message}`);

    return handlerInput.responseBuilder
      .speak('Ha ocurrido un error.')
      .reprompt('Ha ocurrido un error.')
      .getResponse();
  },
};


const skillBuilder = Alexa.SkillBuilders.standard();

exports.handler = skillBuilder
  .addRequestHandlers(
    fraseDiariaHandler
  )
  .addErrorHandlers(ErrorHandler)
  .lambda();
