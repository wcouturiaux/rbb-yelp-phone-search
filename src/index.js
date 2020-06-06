'use-strict';
const yelp = require('yelp-fusion');
const client = yelp.client('Iunr7_96olhfyFnglcIhdcZ8XnNr2Czo7M8g8Sw6fbF1XXFLcOA28aFlya4kQDyFKvywg2CmwR1hiwDtUn32Yifl2UCtKhGPLrIrY4s7WtKDWXAaBV1m0K47rNzbXnYx');
const C2J = require('csvtojson');

C2J().fromFile('./src/csv/rbbDineBlackRaw.csv').then(
    (businesses) => {
        console.log(businesses);
    }).catch(e => {
        console.log(e);
    });

client.phoneSearch({
    phone: '+17709742323'
}).then(response =>{
    console.log(response.jsonBody.businesses[0].name);
}).catch(e=>{
    console.log(e);
})