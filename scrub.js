function scrub(dataObject){
    for(key in dataObject){
        switch(typeof(dataObject[key])){
            case 'string': 
                dataObject[key] = handleString(key, dataObject[key])
                break;
            case 'object':
                dataObject[key] = scrub(dataObject[key])
                break;
            case 'array':
                for(let i=0; i<dataObject[key].length; i++){
                    dataObject[key][i] = scrub(dataObject[key][i])
                }
                break;
        }
    }
    return dataObject;
}

function handleString(key, stringVal){
    const sensitiveKeyList = ['name', 'username', 'password'];
    if(sensitiveKeyList.includes(key.toLowerCase())){
        return '******';
    }
    else if(key === 'email'){
        return scrubEmail(stringVal);
    }
    else{
        return stringVal;
    }
}

function scrubEmail(emailAddress){
    return '******@' + emailAddress.split('@')[1];
}

function scrubString(){
    return '******';
}

module.exports = scrub;