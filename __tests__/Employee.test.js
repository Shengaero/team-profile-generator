const {Employee} = require('../lib/employee');

const employee = new Employee('John Goodman', 13254, 'jgoodman@company.com');

// test getName method on Employee class
test('Employee#getName', () => {
    // expect employee.getName() to return 'John Goodman'
    expect(employee.getName()).toBe('John Goodman');
});

// test getId method on Employee class
test('Employee#getId', () => {
    // expect employee.getId() to return 13254
    expect(employee.getId()).toBe(13254);
});

// test getEmail method on Employee class
test('Employee#getEmail', () => {
    // expect employee.getEmail() to return 'jgoodman@company.com'
    expect(employee.getEmail()).toBe('jgoodman@company.com');
});

// test getRole method on Employee class
test('Employee#getRole', () => {
    // expect employee.getRole() to return 'Employee'
    expect(employee.getRole()).toBe('Employee');
});
