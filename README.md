# RBB-YELP-PHONE-SEARCH
The RBB yelp phone search consumes a csv of phone numbers and outputs a json file of the yelp listing associated to that phone number.

## Getting Started
1. Make a copy of the `.env.example` file. Rename the copy to `.env`
2. Enter your personal Yelp API Key in the `.env` file.
3. Make a copy of the `csvTemplate.csv` file.
4. Populate the csv `phone` field with phone numbers as formatted as text in the format `+12223334444`.
5. Make a copy of `jsonTemplate.json`. Rename the file.
6. Enter the renamed file names in place of the csvFilePath and jsonFilePath variables.