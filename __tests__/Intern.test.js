const {Intern} = require('../lib/employee');

const intern = new Intern('Sam Ayers', 1919, 'sayers@company.com', 'Northwestern University');

// test getSchool method on Intern class
test('Intern#getSchool', () => {
    // expect intern.getSchool() to return 'Northwestern University' 
    expect(intern.getSchool()).toBe('Northwestern University');
});

// test getRole method on Intern class
test('Intern#getRole', () => {
    // expect intern.getRole() to return 'Intern'
    expect(intern.getRole()).toBe('Intern');
})
