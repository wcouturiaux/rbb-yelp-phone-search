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
    /**json.forEach(element => {**/

        let busName = json[0].businessName;
        let phone = json[0].phone;
        /**let city = json[0].city;**/
        let loc= json[0].city+", "+json[0].state;
        let zip_code = ""

        if (phone != "" && json[0].zipCode == ""){
            yelpMatch(phone,busName,loc)

        }    
    /** });**/
    
});

function yelpMatch(pnum, name,loc){
    client.phoneSearch({

        /**term: name,**/
        phone: pnum
        /**location: loc**/

    }).then(response =>{
        try {
            fs.readFile('src/csv/dataUpdates.json', (e,data)=>{
                data1 = data
                data1 = data1.slice(0,-2) + "]\\n";
                data1 = data1.replace(/\n/g,"\\n");
                let json = JSON.parse(data);
                json.push(response.jsonBody.businesses[0]);
                jsonStr = JSON.stringify(json);
                jsonStr.replace("\\n","\n")
                fs.writeFileSync('src/csv/dataUpdates.json',jsonStr);
            });
            
        }catch(e) {
            console.error(e);
        }
        
        /**return zipCode = response.jsonBody.businesses[0].zip_code;**/

    }).catch(e=>{

        console.log(e);

    });
};