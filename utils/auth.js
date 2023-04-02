const falcon = require("falcon-crypto");
const { encodeKey, decodeKey, decodeToken, encodeToken } = require("./encoder");

const generateSignature = async (token) => {
  try {
    const privateKey = encodeKey(process.env.FALCON_PRIVATE_KEY);
    const encodedToken = encodeToken(token);

    const signature = await falcon.sign(encodedToken, privateKey);
    const decodedSignature = decodeKey(signature);

    return decodedSignature;
  } catch (err) {
    return err;
  }
};

const verifySignature = async (signature) => {
  try {
    const publicKey = encodeKey(process.env.FALCON_PUBLIC_KEY);
    const encodedSignature = encodeKey(signature);

    const token = await falcon.open(encodedSignature, publicKey);
    const isValid = await falcon.verifyDetached(
      encodedSignature,
      token,
      publicKey
    );

    if (isValid) {
      const decodedToken = decodeToken(token);
      return decodedToken;
    } else throw new Error("Invalid Signature");
  } catch (err) {
    return err;
  }
};

module.exports = { generateSignature, verifySignature, test };
