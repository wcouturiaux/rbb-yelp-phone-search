'use-strict';
const yelp = require('yelp-fusion');
const client = yelp.client('Iunr7_96olhfyFnglcIhdcZ8XnNr2Czo7M8g8Sw6fbF1XXFLcOA28aFlya4kQDyFKvywg2CmwR1hiwDtUn32Yifl2UCtKhGPLrIrY4s7WtKDWXAaBV1m0K47rNzbXnYx');
const csvFilePath = 'src/csv/rbbDineBlackRaw.csv';
const csv = require('csvtojson');
const fs = require('fs');
let json;


csv()
.fromFile(csvFilePath)
.then((businesses)=>{
    json = businesses
    json.forEach(element => {

        let busName = element.businessName;
        let phone = element.phone;
        let city = element.city;
        let state = element.state;
        let zip_code = ""

        if (phone != "" && element.zipCode == ""){
            yelpMatch(phone,busName,state,city)

        }    
    });
    
});

function yelpMatch(pnum, name,state, city){
    client.businessMatch({

        name: name,
        phone: pnum,
        city: city,
        state: state,
        match_threshold: "strict"

    }).then(response =>{
        try {
            fs.appendFileSync('src/csv/dataUpdates.json',JSON.stringify(response.jsonBody));
        }catch(e) {
            console.error(e);
        }
        
        /**return zipCode = response.jsonBody.businesses[0].zip_code;**/

    }).catch(e=>{

        console.log(e);

    });
};