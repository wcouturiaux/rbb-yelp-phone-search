"use-strict"
const yelp = require("yelp-fusion")
const client = yelp.client(
  "Iunr7_96olhfyFnglcIhdcZ8XnNr2Czo7M8g8Sw6fbF1XXFLcOA28aFlya4kQDyFKvywg2CmwR1hiwDtUn32Yifl2UCtKhGPLrIrY4s7WtKDWXAaBV1m0K47rNzbXnYx"
)
const csvFilePath = "src/csv/rbbDineBlackRaw.csv"
const csv = require("csvtojson")
const fs = require("fs")
const mapLimit = require("async/mapLimit")
let json

csv()
  .fromFile(csvFilePath)
  .then((businesses) => {
    json = businesses
      .map((element) => {
        return {
          businessName: element.businessName,
          phone: element.phone,
          location: element.city + ", " + element.state,
          zipCode: "",
        }
      })
      .filter((element) => {
        return element.phone != "" && element.zipCode == ""
      })

    mapLimit(json, 5, yelpMatch).then(() => {
      console.log('all are done')
    }).catch(console.error)
  })

function yelpMatch(business) {
  return new Promise((resolve, reject) => {
    client.phoneSearch({
      /**term: name,**/
      phone: business.phone,
      /**location: loc**/
    }).then(response => {
      fs.readFile("src/csv/dataUpdates.json", (e,data) => {
        json = JSON.parse(data)
        if (response.jsonBody.businesses.length !=0) {
          json.push(response.jsonBody.businesses[0])
        fs.writeFileSync("src/csv/dataUpdates.json", JSON.stringify(json))
        }
        console.log('resolving')
        resolve()
      })
    }).catch(error => {
      console.error(error)
      reject(error)
    })
  })

}
