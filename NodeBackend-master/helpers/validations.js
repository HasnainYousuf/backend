const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config();


const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);
const hashPassword = password => bcrypt.hashSync(password, salt);

const comparePassword = (hashedPassword, password) => {
  return bcrypt.compareSync(password, hashedPassword);
};

const isValidEmail = (email) => {
  const regEx = /\S+@\S+\.\S+/;
  return regEx.test(email);
};

const validatePassword = (password) => {
  if (password.length <= 5 || password === '') {
    return false;
  } return true;
};
const isEmpty = (input) => {
  if (input === undefined || input === '') {
    return true;
  }
  if (input.replace(/\s/g, '').length) {
    return false;
  } return true;
};

const empty = (input) => {
  if (input === undefined || input === '') {
    return true;
  }
};





const generateToken = (id, email, role) => {
  const token = jwt.sign({
    id,
    email,
    role
  },
    process.env.SECRET, { expiresIn: '1d' });
  return token;
};

const sendExpiredToken = (id, email, role) => {
  const token = jwt.sign({
    id,
    email,
    role
  },
    process.env.SECRET, { expiresIn: '1s' });
  return token;
};

module.exports = {
  hashPassword,
  comparePassword,
  isValidEmail,
  validatePassword,
  isEmpty,
  empty,
  generateToken,
  sendExpiredToken,
};