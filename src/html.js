function parseValue(content) {
    if(content === null) {
        return '';
    }
    let text = '';
    // check content type and get the append the value based on what it is
    let contentType = typeof content;
    if(contentType === 'function') { // if it's a function, run the function
        text += content();
    } else if(contentType === 'object') { // if it's an object
        if(Array.isArray(content)) { // check if it's an array, if so handle it
            for(let value of content) {
                text += parseValue(value);
            }
        } else { // otherwise we don't allow it
            // TODO maybe JS Object?
            throw 'JS Objects not allowed!';
        }
    } else { // else just append
        text += content;
    }

    return text;
}

const htmlTag = (name, content = '', attr = {}, autoClosing = false) => {
    // open the opening tag
    let text = `<${name}`;
    // for each key in attributes object
    for(let key in attr) {
        // get the value of the key
        let value = attr[key];
        // if the value is an array
        if(Array.isArray(value)) {
            // set the value variable to a single space joined array string
            value = value.join(' ');
        }
        // if the value is non-null
        if(value !== null) {
            // append the key-value attribute to the inside of the opening tag
            text += ` ${key}="${value}"`;
        }
    }

    // auto closing tag
    if(autoClosing) {
        text += '/';
    }

    // close the opening tag
    text += '>';

    // manual close
    if(!autoClosing) {
        text += parseValue(content);

        text += `</${name}>`; // closing tag
    }

    // wrap the returned value of the function 
    return text;
};

const doc = (content = null, attr = {lang: 'en'}) => `<!DOCTYPE html>${html(content, attr)}`;
const html = (content = null, attr = {}) => htmlTag('html', content, {...attr});
const head = (content = null, attr = {}) => htmlTag('head', content, attr);
const meta = (attr = {}) => htmlTag('meta', null, {...attr}, true);
const link = (rel = null, href = null, attr = {}) => htmlTag('link', null, {rel: rel, href: href, ...attr}, true);
const title = (content = null, attr = {}) => htmlTag('title', content, {...attr});
const body = (content = null, attr = {}) => htmlTag('body', content, attr);
const h1 = (content = null, attr = {}) => htmlTag('h1', content, attr);
const h2 = (content = null, attr = {}) => htmlTag('h2', content, attr);
const h3 = (content = null, attr = {}) => htmlTag('h3', content, attr);
const p = (content = null, attr = {}) => htmlTag('p', content, attr);
const a = (content = null, attr = {}) => htmlTag('a', content, attr);
const div = (content = null, attr = {}) => htmlTag('div', content, attr);
const script = (src = null, attr = {}) => htmlTag('script', null, {src: src, ...attr});

module.exports = {htmlTag, doc, html, head, meta, link, title, body, h1, h2, h3, p, a, div, script};
