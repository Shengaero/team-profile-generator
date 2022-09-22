const {div} = require('../src/html');

// divs are simple fairly blank tags, so testing them is a good benchmark for most other elements
describe('div tests', () => {
    const myDiv = div('test', {'data-test': 'this is a test'});

    test('div getName', () => expect(myDiv.getName()).toBe('div'));
    test('div getContent', () => expect(myDiv.getContent()).toBe('test'));
    test('div getAttributes', () => expect(myDiv.getAttributes()).toEqual({'data-test': 'this is a test'}));
    test('div toHTMLString', () => expect(myDiv.toHTMLString()).toBe('<div data-test="this is a test">test</div>'));
    test('div appendContent', () => {
        const newContent = div('inner div test');
        myDiv.appendContent(newContent);
        expect(myDiv.getContent()).toContain(newContent);
    });
});
