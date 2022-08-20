function scrub(inputData){
    let outputData = inputData;

    for(key in outputData){
        console.log(typeof(outputData[key]) + " - " + key)
    }

    return outputData;
}

function scrubEmail(emailAddress){
    return '******@' + emailAddress.split('@')[1];
}

function scrubString(){
    return '******';
}

module.exports = scrub;