const scrub = require('./scrub');
const inputData = require('./inputData.json');

describe('scrubbed data', async () => {
    const scrubbedData = await scrub(inputData);

    test('is the same length as input data', () => {
        expect(scrubbedData.length).toEqual(inputData.length);
    });

    test('has all name values removed', () => {
        //code
    });

    test('has all username values removed', () => {
        //code
    });

    test('has all password values removed', () => {
        //code
    });

    test('has all email values scrubbed', () => {
        //code
    });
})