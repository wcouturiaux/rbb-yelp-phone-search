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
        /**let city = json[0].city;**/
        let loc= element.city+", "+element.state;
        let zip_code = ""

        if (phone != "" && element.zipCode == ""){
            yelpMatch(phone,busName,loc)

        }    
    });
    
});

function yelpMatch(pnum, name,loc){
    client.phoneSearch({

        /**term: name,**/
        phone: pnum
        /**location: loc**/

    }).then(response =>{
        try {
            fs.readFile('src/csv/dataUpdates.json', (e,data)=>{
                json = JSON.parse(data);
                json.push(response.jsonBody.businesses[0]);
                fs.writeFileSync('src/csv/dataUpdates.json',JSON.stringify(json));
            });
            
        }catch(e) {
            console.error(e);
        }
        
        /**return zipCode = response.jsonBody.businesses[0].zip_code;**/

    }).catch(e=>{

        console.log(e);

    });
};