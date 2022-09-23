const htmlWriter = require('./html');

const css = () => htmlWriter.link(
    'stylesheet',
    'https://use.fontawesome.com/releases/v5.8.1/css/all.css',
    {
        integrity: 'sha384-50oBUHEmvpQ+1lW4y57PTFmhCaXp0ML5d60M1M7uH2+nqUivzIebhndOJK28anvf',
        crossorigin: 'anonymous'
    }
);

const i = (content = null, attr = {}) => htmlWriter.htmlTag('i', content, attr);

module.exports = {css, i};
