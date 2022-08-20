## Data Scrub - Coding Challenge Submission

This program was built to remove personal information (names, usernames, passwords, and email addresses) from data objects before they are logged.

### Installation

The program was written using JavaScript and Node.js. In order to install the program, only a few steps are required:
1. Node.js must be installed locally
2. This repository must be cloned locally
3. (Optional, only required to run unit test suite) The command below must be run from the project's root folder to ensure all dependencies are installed:
```bash
npm install
```

### Usage

Once the above steps are complete, the entire program can be run using the following command from the project's root folder:
```bash
node program.js
```
The input object is contained in the 'inputData.json' file, and the program will create a new file called 'logData.json' after it runs containing the same object with the sensitive values removed according to the challenge prompt. 

There is also a suite of unit tests (file name: program.test.js) written using the [Jest JavaScript Testing Framework](https://jestjs.io). The test cases were written to ensure that the output file gets created successfully, that the structure of the output object matches the input object, and that all of the sensitive user data is properly removed from the output object. To run the test suite you simply need to run the following command from the project's root folder:
```bash
npm test
```
