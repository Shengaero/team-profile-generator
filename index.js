const path = require('path');
const {writeFile} = require('fs');

const menu = require('./src/menu');

const {Manager, Engineer, Intern} = require('./lib/employee');
const {doc, head, meta, title, body, header, h1, h3, h5, a, ul, li, div} = require('./src/html');
const bootstrap = require('./src/bootstrap');
const fontawesome = require('./src/fontawesome');
const i = fontawesome.i;

// standard write logging for errors
const logWriteErr = (err) => {
    if(err)
        console.log(err);
};

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
};

const shouldWriteJSON = () => {
    let jsonArgIndex = argIndex('--json');
    // if the index isn't -1, the '--json' flag was used 
    return jsonArgIndex !== -1;
};

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

const createEmployeeCard = (employee) => div([
    // card header
    div([
        // top header with employee name
        h3(employee.getName()),
        //employee role with icon
        h5([
            // selects the FA icon
            () => {
                switch(employee.getRole()) {
                    case 'Manager': return i(null, {class: ['fas', 'fa-mug-hot']});
                    case 'Engineer': return i(null, {class: ['fas', 'fa-glasses']});
                    case 'Intern': return i(null, {class: ['fas', 'fa-user-graduate']});
                    default: return null;
                }
            }, ` ${employee.getRole()}` // appends the employee role next to the icon
        ])
    ], {class: ['card-header', 'text-bg-primary']}),

    // card content
    div([
        // unordered list
        ul([
            // employee ID list item
            li(['ID: ', employee.getId()], {class: ['list-group-item']}),
            // employee email list item
            li([`Email: `, a(`mailto:${employee.getEmail()}`, employee.getEmail())], {class: ['list-group-item']}),
            // employee role-specific information item
            li(() => {
                switch(employee.getRole()) {
                    case 'Manager': return `Office number ${employee.getOfficeNumber()}`;
                    case 'Engineer':
                        let github = employee.getGithub();
                        return [`GitHub: `, a(`https://github.com/${github}`, github)];
                    case 'Intern': return `School: ${employee.getSchool()}`;
                    default: return null;
                }
            }, {class: ['list-group-item']})
        ], {class: ['list-group', 'mx-3', 'my-5']})
    ], {class: []})
], {class: ['card', 'm-3', 'w-25']});

const generateHTML = (employees) => doc([
    head([
        // meta-data
        meta({charset: 'utf-8'}),

        // include fontawesome styles
        fontawesome.css(),

        // include bootstrap styles
        bootstrap.css(),

        // page title
        title('My Team')
    ]),

    // main body content
    body([
        // header
        header([h1('My Team')], {class: ['d-flex', 'justify-content-center', 'p-5', 'mb-3', 'text-bg-success']}),

        // main body container
        div(employees.map(createEmployeeCard), {class: ['d-flex', 'container-fluid', 'justify-content-center', 'flex-wrap']}),

        // include bootstrap script for page functionality
        bootstrap.js()
    ])
]);

// our application run function
function run() {
    // get our output path
    let output = outputPath();
    // generate menu, then
    menu().then(employees => {
        // when the user is done, generate the HTML using the list of employees
        let document = generateHTML(employees);
        // write the document to the output path
        writeOutput(document, output);
    })
}

// run program
run();
