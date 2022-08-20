const fs = require('fs');
const program = require('./program');
const scrub = require('./scrub');
const inputData = require('./inputData.json');

const scrubbedData = scrub(inputData);

//Tests
describe('logData file', () => {
    test('exists after program is run', async () => {
        await program();
        const logDataFileExists = fs.existsSync('./logData.json');
        expect(logDataFileExists).toEqual(true);
    })
});

describe('scrubbed data', () => {
    test('has the same keys as input data', () => {
        const inputKeys = assembleListOfKeys(inputData);
        const scrubbedKeys = assembleListOfKeys(scrubbedData);
        expect(inputKeys).toEqual(scrubbedKeys);
    });

    test('has all name values removed', () => {
        const namesMissed = checkValuesForScrubResult(scrubbedData, 'name');
        expect(namesMissed).toEqual(false);
    });

    test('has all username values removed', () => {
        const usernamesMissed = checkValuesForScrubResult(scrubbedData, 'username');
        expect(usernamesMissed).toEqual(false);
    });

    test('has all password values removed', () => {
        const passwordsMissed = checkValuesForScrubResult(scrubbedData, 'password');
        expect(passwordsMissed).toEqual(false);
    });

    test('has all email values scrubbed', () => {
        const emailsMissed = checkEmailsForScrubResult(scrubbedData);
        expect(emailsMissed).toEqual(false);
    });
});

//Helper functions
function assembleListOfKeys(object, keyString = ""){
    for(key in object){
        keyString += key;
        switch(typeof(object[key])){
            case 'object':
                assembleListOfKeys(object[key], keyString)
                break;
            case 'array':
                for(let i=0; i<object[key].length; i++){
                    assembleListOfKeys(object[key][i], keyString)
                }
                break;
        }
    }
    return keyString;
}

function checkValuesForScrubResult(object, keyName){
    let unscrubbedValueFound = false;

    for(key in object){
        switch(typeof(object[key])){
            case 'string':
                if(key === keyName && object[key] !== '******'){
                    unscrubbedValueFound = true;
                    return unscrubbedValueFound;                   
                }
                break;
            case 'array': 
                for(let i=0; i<object[key].length; i++){
                    unscrubbedValueFound = checkValuesForScrubResult(object[key][i], keyName)
                }
                break;
            case 'object':
                unscrubbedValueFound = checkValuesForScrubResult(object[key], keyName)
                break;
        }       
    };
    return unscrubbedValueFound;
}

function checkEmailsForScrubResult(object){
    let unscrubbedEmailFound = false;
    const scrubbedEmailRegex = /\*+@\S+\.\S+/i;

    for(key in object){
        switch(typeof(object[key])){
            case 'string':
                if(key === 'email'){
                    let regexMatch = scrubbedEmailRegex.test(object[key]);
                    if(!regexMatch){
                        unscrubbedEmailFound = true;
                        return unscrubbedEmailFound;
                    }              
                }
                break;
            case 'array': 
                for(let i=0; i<object[key].length; i++){
                    unscrubbedEmailFound = checkEmailsForScrubResult(object[key][i])
                }
                break;
            case 'object':
                unscrubbedEmailFound = checkEmailsForScrubResult(object[key])
                break;
        }       
    };
    return unscrubbedEmailFound;
}