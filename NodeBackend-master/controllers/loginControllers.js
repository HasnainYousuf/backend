const dbQuery = require('../db/dbQuery')
const {
  comparePassword,
  isValidEmail,
  validatePassword,
  isEmpty,
  generateToken,

} = require('../helpers/validations')
const { errorMessage, successMessage, status } = require('../helpers/status')

const LoginOwner = async (req, res) => {
  const { email, password } = req.body;
  if (isEmpty(email) || isEmpty(password)) {
    errorMessage.error = 'Email or Password detail is missing';
    return res.status(status.bad).send(errorMessage);
  }
  if (!isValidEmail(email) || !validatePassword(password)) {
    errorMessage.error = 'Please enter a valid Email or Password';
    return res.status(status.bad).send(errorMessage);
  }
  const OwnerQuery = `SELECT * FROM public.owner WHERE email = $1`;
  try {
    const { rows } = await dbQuery.query(OwnerQuery, [email.toLowerCase()]);
    const dbResponse = rows[0];
    if (!dbResponse) {
      errorMessage.error = 'User with this email does not exist';
      return res.status(status.notfound).send(errorMessage);
    }
    if (!comparePassword(dbResponse.password, password)) {
      errorMessage.error = 'The password you provided can be incorrect';
      return res.status(status.bad).send(errorMessage);
    }
    delete dbResponse.password;
    const token = generateToken(dbResponse.ownerid, dbResponse.email, dbResponse.role);
    successMessage.data = dbResponse;
    successMessage.data.token = token;
    return res.status(status.success).send(successMessage);
  } catch (error) {
    errorMessage.error = 'Operation was not successful';
    return res.status(status.error).send(errorMessage);
  }
};





const LoginManager = async (req, res) => {
  const { email, password } = req.body;
  if (isEmpty(email) || isEmpty(password)) {
    errorMessage.error = 'Email or Password detail is missing';
    return res.status(status.bad).send(errorMessage);
  }
  if (!isValidEmail(email) || !validatePassword(password)) {
    errorMessage.error = 'Please enter a valid Email or Password';
    return res.status(status.bad).send(errorMessage);
  }
  const ManagerQuery = `SELECT * FROM public.manager WHERE email = $1`;
  try {
    const { rows } = await dbQuery.query(ManagerQuery, [email.toLowerCase()]);
    const dbResponse = rows[0];
    if (!dbResponse) {
      errorMessage.error = 'User with this email does not exist';
      return res.status(status.notfound).send(errorMessage);
    }
    if (!comparePassword(dbResponse.password, password)) {
      errorMessage.error = 'The password you provided can be incorrect';
      return res.status(status.bad).send(errorMessage);
    }
    delete dbResponse.password;
    const token = generateToken(dbResponse.managerid, dbResponse.email, dbResponse.role);
    successMessage.data = dbResponse;
    successMessage.data.token = token;
    return res.status(status.success).send(successMessage);
  } catch (error) {
    errorMessage.error = 'Operation was not successful';
    return res.status(status.error).send(errorMessage);
  }
};



const LoginOperator = async (req, res) => {
  const { email, password } = req.body;
  if (isEmpty(email) || isEmpty(password)) {
    errorMessage.error = 'Email or Password detail is missing';
    return res.status(status.bad).send(errorMessage);
  }
  if (!isValidEmail(email) || !validatePassword(password)) {
    errorMessage.error = 'Please enter a valid Email or Password';
    return res.status(status.bad).send(errorMessage);
  }
  const OperatorQuery = `SELECT * FROM public.operator WHERE email = $1`;
  try {
    const { rows } = await dbQuery.query(OperatorQuery, [email.toLowerCase()]);
    const dbResponse = rows[0];
    if (!dbResponse) {
      errorMessage.error = 'User with this email does not exist';
      return res.status(status.notfound).send(errorMessage);
    }
    if (!comparePassword(dbResponse.password, password)) {
      errorMessage.error = 'The password you provided can be incorrect';
      return res.status(status.bad).send(errorMessage);
    }
    delete dbResponse.password;
    const token = generateToken(dbResponse.operatorid, dbResponse.email, dbResponse.role);
    successMessage.data = dbResponse;
    successMessage.data.token = token;
    return res.status(status.success).send(successMessage);
  } catch (error) {
    errorMessage.error = 'Operation was not successful';
    return res.status(status.error).send(errorMessage);
  }
};


const LoginDriver = async (req, res) => {
  const { email, password } = req.body;
  if (isEmpty(email) || isEmpty(password)) {
    errorMessage.error = 'Email or Password detail is missing';
    return res.status(status.bad).send(errorMessage);
  }
  if (!isValidEmail(email) || !validatePassword(password)) {
    errorMessage.error = 'Please enter a valid Email or Password';
    return res.status(status.bad).send(errorMessage);
  }
  const DriverQuery = `SELECT * FROM public.driver WHERE email = $1`;
  try {
    const { rows } = await dbQuery.query(DriverQuery, [email.toLowerCase()]);
    const dbResponse = rows[0];
    if (!dbResponse) {
      errorMessage.error = 'User with this email does not exist';
      return res.status(status.notfound).send(errorMessage);
    }
    if (!comparePassword(dbResponse.password, password)) {
      errorMessage.error = 'The password you provided can be incorrect';
      return res.status(status.bad).send(errorMessage);
    }
    delete dbResponse.password;
    const token = generateToken(dbResponse.driverid, dbResponse.email, dbResponse.role);
    successMessage.data = dbResponse;
    successMessage.data.token = token;
    return res.status(status.success).send(successMessage);
  } catch (error) {
    errorMessage.error = 'Operation was not successful';
    return res.status(status.error).send(errorMessage);
  }
};




module.exports =
{
  LoginOwner,
  LoginManager,
  LoginOperator,
  LoginDriver,
};