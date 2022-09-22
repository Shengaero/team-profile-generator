const {Manager} = require('../lib/employee');

const manager = new Manager('Karen Johnson', 98765, 'kjohnson@company.com', 44);

// test getOfficeNumber method on Manager class
test('Manager#getOfficeNumber', () => {
    // expect manager.getOfficeNumber() to return 44
    expect(manager.getOfficeNumber()).toBe(44);
});

// test getRole method on Manager class
test('Manager#getRole', () => {
    // expect manager.getRole() to return 'Manager'
    expect(manager.getRole()).toBe('Manager');
});
