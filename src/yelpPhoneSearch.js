#!/usr/bin/env node

/**Requires */
require('dotenv').config({path:'/Users/WillC/rbb-yelp-phone-search/.env'})
const yelp = require("yelp-fusion")
const csv = require("csvtojson")
const fs = require("fs")
const mapLimit = require("async/mapLimit")
const YELP_API_KEY = process.env.YELP_API_KEY
const client = yelp.client(YELP_API_KEY)
const yargs = require('yargs')

const options = yargs
  .usage('Usage: -c path/to/file.csv -j path/to/file.json')
  .option('c', {alias: "csv", describe: "The path to the csv file with phone numbers",
    type: "string", demandOption: true})
  .option('j', {alias: "json", describe: "Path to json file to write yelp data",
    type: "string", demandOption: true})
    .argv
/**Set File Paths */
const csvFilePath = "/Users/WillC/rbb-yelp-phone-search/src/csv/rbbAtlanta.csv"
const jsonFilePath = "/Users/WillC/rbb-yelp-phone-search/src/csv/test.json"

csv()
  .fromFile(options.csv)
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
      fs.readFile(options.json, (e,data) => {
        json = JSON.parse(data)
        if (response.jsonBody.businesses.length !=0) {
          json.push(response.jsonBody.businesses[0])
        fs.writeFileSync(options.json, JSON.stringify(json))
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
