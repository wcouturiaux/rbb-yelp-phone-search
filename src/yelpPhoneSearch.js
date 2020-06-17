#!/usr/bin/env node

/**Requires */
require('dotenv').config({path:'/Users/WillC/rbb-yelp-phone-search/.env'})
const yelp = require("yelp-fusion")
const csv = require("csvtojson")
const fs = require("fs")
const mapLimit = require("async/mapLimit")
const YELP_API_KEY = process.env.YELP_API_KEY
const client = yelp.client(YELP_API_KEY)

/**Set File Paths */
const csvFilePath = "/Users/WillC/rbb-yelp-phone-search/src/csv/rbbAtlanta.csv"
const jsonFilePath = "/Users/WillC/rbb-yelp-phone-search/src/csv/test.json"

csv()
  .fromFile(csvFilePath)
  .then((businesses) => {
    filteredBus = businesses
      .map((element) => {
        return {
          phone: element.phone,
          latitude: element.latitude,
          longitude: element.longitude
        }
      })
      .filter((element) => {
        return element.phone != "" && (element.latitude == "" || 
        element.latitude == "")
      })

    mapLimit(filteredBus, 1, yelpMatch).then(() => {
      console.log('all are done')
    }).catch(console.error)
  })

function yelpMatch(business,done) {
  return new Promise((resolve, reject) => {
    client.phoneSearch({
      phone: business.phone,
    }).then(response => {
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
      console.log(error.response.body)
      reject(error)
    })
  })

}
