// string as parameter
const base64 = require("base64-js");

/**
 * key - for keys and signature
 * token - for token/messages
 */

const encodeKey = (key) => {
  return new Uint8Array(Buffer.from(key, "base64"));
};

const decodeKey = (key) => {
  return base64.fromByteArray(key);
};

const decodeToken = (token) => {
  const decoder = new TextDecoder();
  return decoder.decode(token);
};

const encodeToken = (token) => {
  const encoder = new TextEncoder();
  return encoder.encode(token);
};

module.exports = {
  encodeKey,
  decodeKey,
  decodeToken,
  encodeToken,
};
