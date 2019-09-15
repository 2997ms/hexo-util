'use strict';

const encodeURL = require('./encode_url');
const escapeHTML = require('./escape_html');

function encSrcset(str) {
  str.split(' ')
    .forEach(subStr => {
      if (subStr.match(/\S/)) {
        subStr = subStr.trim();
        str = str.replace(subStr, encodeURI(subStr));
      }
    });
  return str;
}

function htmlTag(tag, attrs, text, escape = true) {
  if (!tag) throw new TypeError('tag is required!');

  let result = `<${escapeHTML(tag)}`;

  for (const i in attrs) {
    if (attrs[i] === null || typeof attrs[i] === 'undefined') result += '';
    else {
      if (i.endsWith('href') || i.endsWith('src') || i.endsWith('url')) result += ` ${escapeHTML(i)}="${encodeURL(attrs[i])}"`;
      else if (i.endsWith('srcset')) result += ` ${escapeHTML(i)}="${encSrcset(attrs[i])}"`;
      else result += ` ${escapeHTML(i)}="${escapeHTML(String(attrs[i]))}"`;
    }
  }

  if (escape && text) text = escapeHTML(String(text));

  if (text === null || typeof text === 'undefined') result += '>';
  else result += `>${text}</${escapeHTML(tag)}>`;

  return result;
}

module.exports = htmlTag;
