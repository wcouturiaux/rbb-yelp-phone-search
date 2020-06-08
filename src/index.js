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

    mapLimit(json, 5, yelpMatch).then(handleResponse)
  })

function handleResponse(response) {
  return new Promise((resolve) => {
    fs.readFile("src/csv/dataUpdates.json", (e, data) => {
      json = JSON.parse(data)
      json.push(response.jsonBody.businesses[0])
      fs.writeFileSync("src/csv/dataUpdates.json", JSON.stringify(json))
      resolve()
    })
  })
}

function yelpMatch(business) {
  return client.phoneSearch({
    /**term: name,**/
    phone: business.phone,
    /**location: loc**/
  })
}
