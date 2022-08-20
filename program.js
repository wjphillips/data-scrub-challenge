const fs = require('fs');
const scrub = require('./scrub');
const inputData = require('./inputData.json');

function program(){
    console.log("Running program.");
    const scrubResult = scrub(inputData);

    fs.writeFile('logData.json', JSON.stringify(scrubResult), (err) => {
        if(err){
            throw err;
        }
        console.log("Scrubbed data saved successfully.")
    })
};
module.exports = program;