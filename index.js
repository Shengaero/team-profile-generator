const path = require('path');
const {writeFile} = require('fs');

const {doc, head, meta, title, body, h1, p} = require('./src/html');
const bootstrap = require('./src/bootstrap');

// standard write logging for errors
const logWriteErr = (err) => {
    if(err)
        console.log(err);
}

// gets index of an argument
const argIndex = (arg) => process.argv.indexOf(arg);

const outputPath = () => {
    // argument is one step right of the '--output' flag
    let outputArgIndex = argIndex('--output') + 1;
    // if the output arg isn't present or if the '--output' flag is the last arg, use default path
    if(outputArgIndex === 0 || outputArgIndex === process.argv.length) {
        return path.resolve(process.cwd(), 'dist');
    } else {
        // resolve path to output directory based on the user arguments
        return path.resolve(process.argv[outputArgIndex]);
    }
}

const shouldWriteJSON = () => {
    let jsonArgIndex = argIndex('--json');
    // if the index isn't -1, the '--json' flag was used 
    return jsonArgIndex !== -1;
}

function writeJSONOutput(document, outputDir) {
    // stringify json
    let json = JSON.stringify(document, null, 2);
    // write it to file
    writeFile(path.resolve(outputDir, 'index.json'), json, logWriteErr);
}

function writeOutput(document, outputDir) {
    // generate HTML string from document
    let htmlString = document.toHTMLString();
    // write it to file
    writeFile(path.resolve(outputDir, 'index.html'), htmlString, ['w+'], logWriteErr);
    // if we should write a JSON output as well
    if(shouldWriteJSON()) {
        // do that
        writeJSONOutput(document, outputDir);
    }
}

// our application run function
function run() {
    // get our output path
    let output = outputPath();
    // generate document string
    let document = doc([
        head([
            meta({charset: 'utf-8'}),
            bootstrap.css(),
            title('Title Here')
        ]),
        body([
            h1('This is a test'),
            p(() => {
                return 'Hello, World';
            }),
            bootstrap.js()
        ])
    ]);

    // write the document to the output path
    writeOutput(document, output);
}

// run program
run();
