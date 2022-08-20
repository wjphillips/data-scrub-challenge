const fs = require('fs');
const program = require('./program');
const inputData = require('./inputData.json');

describe('logData file', () => {
    test('exists after program is run', async () => {
        await program();
        const logDataFileExists = fs.existsSync('./logData.json');
        expect(logDataFileExists).toEqual(true);
    })
})