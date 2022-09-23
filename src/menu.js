const inquirer = require('inquirer');
const {Manager, Engineer, Intern} = require('../lib/employee');

const generateTeamMemberQuestions = (choice) => [
    {
        type: 'input',
        name: 'name'
    },
    {
        type: 'input',
        name: 'id'
    },
    {
        type: 'input',
        name: 'email'
    },
    {
        type: 'input',
        name: 'officeNumber',
        when: choice === 'Manager'
    },
    {
        type: 'input',
        name: 'github',
        when: choice === 'Engineer'
    },
    {
        type: 'input',
        name: 'school',
        when: choice === 'Intern'
    },
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
}
