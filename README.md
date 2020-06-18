# RBB-YELP-PHONE-SEARCH
The RBB yelp phone search consumes a csv of phone numbers and outputs a json file of the yelp listing associated to that phone number.

## Getting Started
1. Make a copy of the `.env.example` file. Rename the copy to `.env`
2. Enter your personal Yelp API Key in the `.env` file.
3. Make a copy of the `csvTemplate.csv` file. Rename the file.
4. Populate the csv `phone` field with phone numbers as formatted as text in the format `+12223334444`.
5. Make a copy of `jsonTemplate.json`. Rename the file.
6. From the program root, run the following commands:

npm i  
npm install -g .

This will allow you to use yelpPhone command in your terminal like shown below:

    yelpPhone -c ./src/csv/rbbDineBlackRaw-Philly.csv -j ./src/csv/test.json

## Command Args
taken from yelpPhone --help
    Usage: -c path/to/file.csv -j path/to/file.json

Options:  
  --help      Show help [boolean]  
  --version   Show version number [boolean]  
  -c, --csv   The path to the csv file with phone numbers [string]  [required]  
  -j, --json  Path to json file to write yelp data [string]  [required]