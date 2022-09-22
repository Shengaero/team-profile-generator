class HTMLTag {
    constructor(name, content = null, attr = {}, autoClosing = false) {
        // the type of tag
        this.name = name;
        // the content this tag includes can be nearly any type, including other
        //HTMLTags(JS Objects without a toHTMLString method are excluded).
        // note that if the tag is auto-closing, content cannot be appended or initialized
        if(!autoClosing || content === null) {
            this.content = content;
        } else {
            this.content = null;
        }
        // JS Object including attributes for the tag to have values of properties
        //can be anything, although only strings, numbers, null, undefined, and
        //arrays will be formatted in a readable way.
        this.attr = attr;
        // does this tag auto close? If this is true then content cannot be set or added
        this.autoClosing = autoClosing;
    }

    getName() {
        return this.name;
    }

    getContent() {
        return this.content;
    }

    getAttributes() {
        return this.attr;
    }

    isAutoClosing() {
        return this.autoClosing;
    }

    appendContent(...content) {
        // do not accept null content
        if(this.autoClosing) {
            return;
        }

        // filter out null values
        content = content.filter((value) => value !== null);

        // was empty or included all null values, end here
        if(content.length === 0) {
            return;
        }

        // if this object's content is null, write the appended content to it
        if(this.content === null) {
            this.content = content;
            return;
        }

        // if this object's content is not an array, convert the single value to one before pushing the new values
        if(!Array.isArray(this.content)) {
            this.content = [this.content];
        }

        this.content.push(...content);
    }

    toHTMLString() {
        // open the opening tag
        let text = `<${this.name}`;
        // for each key in attributes object
        for(let key in this.attr) {
            // get the value of the key
            let value = this.attr[key];
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
        if(this.autoClosing) {
            text += '/';
        }

        // close the opening tag
        text += '>';

        // manual close
        if(!this.autoClosing) {
            text += parseValue(this.content);

            text += `</${this.name}>`; // closing tag
        }

        // wrap the returned value of the function 
        return text;
    }
}

class HTMLDocument extends HTMLTag {
    constructor(content = null, attr = {}) {
        super('html', content, attr);
    }

    toHTMLString() {
        return '<!DOCTYPE html>' + super.toHTMLString();
    }
}

function parseValue(content) {
    if(content === null) {
        return '';
    }
    let text = '';
    // check content type and get the append the value based on what it is
    let contentType = typeof content;
    if(contentType === 'string' || contentType == 'number') { // simply append raw string and number values
        text += content;
    } else if(contentType === 'function') { // if it's a function, run the function and parse the return value
        text += parseValue(content());
    } else if(contentType === 'object') { // if it's an object
        if(Array.isArray(content)) { // check if it's an array, if so handle it
            for(let value of content) {
                text += parseValue(value); // for each value, parse that content
            }
        } else {
            // we allow it because it's an HTMLTag
            if(content.toHTMLString) {
                text += content.toHTMLString(); //
            } else {
                throw 'Normal JS Objects not allowed!';
            }
        }
    } else { // else just append
        text += content;
    }

    return text;
}

const htmlTag = (name, content = '', attr = {}, autoClosing = false) => new HTMLTag(name, content, attr, autoClosing);

const doc = (content = null, attr = {}) => new HTMLDocument(content, {lang: 'en', ...attr})
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
