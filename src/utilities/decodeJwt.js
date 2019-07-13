import jwt from 'jsonwebtoken';

const secret = process.env.SOCIAL_AUTH_SECRET;

/**
 * scrambles string data
 * @param {string} token - input string data
 * @returns {output} - scrambled data
 */
function reverseToken(token) {
  return token.split('').reverse().join('');
}

const getPayload = (token) => {
  const reversedToken = reverseToken(token);
  try {
    return jwt.verify(reversedToken, secret);
  } catch (err) {
    throw (err);
  }
};

export default getPayload;
