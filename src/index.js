"use-strict"
const yelp = require("yelp-fusion")
require('dotenv').config()
const YELP_API_KEY = process.env.YELP_API_KEY
const client = yelp.client(YELP_API_KEY)
const csvFilePath = "src/csv/rbbDineBlackRaw-jersey2.csv"
const jsonFilePath = "src/csv/rbbDineBlackRaw-jersey2.json"
const csv = require("csvtojson")
const fs = require("fs")
const mapLimit = require("async/mapLimit")
let json
var results = []

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

    mapLimit(json, 1, yelpMatch).then(() => {
      console.log('all are done')
    }).catch(console.error)
  })

function yelpMatch(business,done) {
  return new Promise((resolve, reject) => {
    client.phoneSearch({
      /**term: name,**/
      phone: business.phone,
      /**location: loc**/
    }).then(response => {
      results.push(response)
      fs.readFile(jsonFilePath, (e,data) => {
        json = JSON.parse(data)
        if (response.jsonBody.businesses.length !=0) {
          json.push(response.jsonBody.businesses[0])
        fs.writeFileSync(jsonFilePath, JSON.stringify(json))
        }
        console.log('resolving')
        resolve()
        done()
      })
    }).catch(error => {
      console.error(error)
      reject(error)
    })
  })

}
