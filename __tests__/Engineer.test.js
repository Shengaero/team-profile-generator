const {Engineer} = require('../lib/employee');

const enginner = new Engineer('Jane Carol', 54671, 'jcarol@company.com', 'https://github.com/jcarol');

// test getGithub method on Engineer class
test('Engineer#getGithub', () => {
    // expect engineer.getGithub() to return 'https://github.com/jcarol'
    expect(enginner.getGithub()).toBe('https://github.com/jcarol');
});

// test getRole method on Engineer class
test('Engineer#getRole', () => {
    // expect engineer.getRole() to return 'Engineer'
    expect(enginner.getRole()).toBe('Engineer');
});
