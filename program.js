const fs = require('fs');
const scrub = require('./scrub');
const inputData = require('./inputData.json');

function program(){
    const scrubResult = scrub(inputData);

    fs.writeFile('logData.json', JSON.stringify(scrubResult), (err) => {
        if(err){
            throw err;
        }
    })
};

program();
module.exports = program;