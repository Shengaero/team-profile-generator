const inquirer = require('inquirer');
const {Manager, Engineer, Intern} = require('../lib/employee');

class Question {
    constructor(name, type, forType = null, messageName = name) {
        this.type = 'input';
        this.name = name;
        if(forType !== null) {
            this.when = type === forType;
        }
        if(validate !== null) {
            this.validate = validate;
        }
        this.message = `Enter the ${messageName} of the ${type.toLowerCase()}:`;
    }
}

const generateTeamMemberQuestions = (type) => [
    new Question('name', type),
    new Question('id', type),
    new Question('email', type),
    new Question('officeNumber', type, 'Manager', 'office number'),
    new Question('github', type, 'Engineer'),
    new Question('school', type, 'Intern'),
    {
        type: 'list',
        name: 'answer',
        message: 'Add a new team member:',
        choices: [
            'Engineer',
            'Intern',
            'Finish Team'
        ]
    }
];

function parseDataIntoEmployee(data, type) {
    switch(type) {
        case 'Manager': return new Manager(data.name, data.id, data.email, data.officeNumber);
        case 'Engineer': return new Engineer(data.name, data.id, data.email, data.github);
        case 'Intern': return new Intern(data.name, data.id, data.email, data.school);
        default: throw `Error creating new employee from data: ${JSON.stringify(data)}`;
    }
}

function newTeamMemberPrompt(employees, type) {
    return inquirer.prompt(generateTeamMemberQuestions(type)).then((data) => {
        employees.push(parseDataIntoEmployee(data, type));
        if(data.answer === 'Finish Team') {
            return employees;
        }
        return newTeamMemberPrompt(employees, data.answer);
    });
}

module.exports = () => {
    return newTeamMemberPrompt([], 'Manager');
};
