const dbQuery = require('../db/dbQuery')
var moment = require('moment-timezone');
const {
  hashPassword,
  isValidEmail,
  validatePassword,
  isEmpty,

} = require('../helpers/validations')
const { errorMessage, successMessage, status } = require('../helpers/status')

const createManager = async (req, res) => {
  let { firstname, lastname, email, password, phone, managerstatus } = req.body;
  if (isEmpty(firstname) || isEmpty(email) || isEmpty(password)) {
    errorMessage.error = 'Kindly provide all required fields';
    return res.status(status.bad).send(errorMessage);
  }
  if (!isValidEmail(email) || !validatePassword(password)) {
    errorMessage.error = 'Please enter a valid Email or Password';
    return res.status(status.bad).send(errorMessage);
  }
  const { id, role } = req.user;
  const ExistQuery = " SELECT EXISTS ( SELECT 1 FROM public." + role + " WHERE " + role + "id = $1 AND " + role + "status = 'active')";
  try {
    const { rows } = await dbQuery.query(ExistQuery, [id]);
    const dbResponse = rows[0];
    if (!dbResponse.exists) {
      errorMessage.error = 'Access Denied';
      return res.status(status.notfound).send(errorMessage);
    }

    if (isEmpty(managerstatus)) {
      managerstatus = "inactive"
    };
    const role = "manager";
    const created_on = moment().tz('Asia/Karachi').format('YYYY-MM-DD HH:mm:ss ZZ ');
    const hashedPassword = hashPassword(password);
    const CreateQuery = `INSERT into public.manager(firstname, lastname, email,password,phone,role,created_on, last_updated_on, managerstatus) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9) returning *`;
    const values = [
      firstname,
      lastname,
      email.toLowerCase(),
      hashedPassword,
      phone,
      role.toLowerCase(),
      created_on,
      created_on,
      managerstatus.toLowerCase()
    ]
    try {
      const { rows } = await dbQuery.query(CreateQuery, values);
      const dbResponse = rows[0];
      delete dbResponse.password;
      successMessage.data = dbResponse;
      return res.status(status.created).send(successMessage);
    } catch (error) {
      if (error.routine === '_bt_check_unique') {
        errorMessage.error = 'Account with that email already exist';
        return res.status(status.conflict).send(errorMessage);
      }
      errorMessage.error = 'Operation was not successful';
      return res.status(status.error).send(errorMessage);
    }
  } catch (error) {
    errorMessage.error = 'Operation was not successful';
    return res.status(status.error).send(errorMessage);
  }
};

const createOperator = async (req, res) => {
  let { firstname, lastname, email, password, phone, operatorstatus } = req.body;
  if (isEmpty(firstname) || isEmpty(email) || isEmpty(password)) {
    errorMessage.error = 'Kindly provide all required fields';
    return res.status(status.bad).send(errorMessage);
  }
  if (!isValidEmail(email) || !validatePassword(password)) {
    errorMessage.error = 'Please enter a valid Email or Password';
    return res.status(status.bad).send(errorMessage);
  }
  const { id, role } = req.user;
  const ExistQuery = " SELECT EXISTS ( SELECT 1 FROM public." + role + " WHERE " + role + "id = $1 AND " + role + "status = 'active')";
  try {
    const { rows } = await dbQuery.query(ExistQuery, [id]);
    const dbResponse = rows[0];
    if (!dbResponse.exists) {
      errorMessage.error = 'Access Denied';
      return res.status(status.notfound).send(errorMessage);
    }
    if (isEmpty(operatorstatus)) {
      operatorstatus = "inactive"
    };
    const role = "operator";
    const created_on = moment().tz('Asia/Karachi').format('YYYY-MM-DD HH:mm:ss ZZ ');
    const hashedPassword = hashPassword(password);
    const CreateQuery = `INSERT into public.operator(firstname, lastname, email,password,phone,role,created_on, last_updated_on, operatorstatus) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9) returning *`;
    const values = [
      firstname,
      lastname,
      email.toLowerCase(),
      hashedPassword,
      phone,
      role.toLowerCase(),
      created_on,
      created_on,
      operatorstatus.toLowerCase()

    ]
    try {
      const { rows } = await dbQuery.query(CreateQuery, values);
      const dbResponse = rows[0];
      delete dbResponse.password;
      successMessage.data = dbResponse;
      return res.status(status.created).send(successMessage);
    } catch (error) {
      if (error.routine === '_bt_check_unique') {
        errorMessage.error = 'Account with that email already exist';
        return res.status(status.conflict).send(errorMessage);
      }
      errorMessage.error = 'Operation was not successful';
      return res.status(status.error).send(errorMessage);
    }
  } catch (error) {
    errorMessage.error = 'Operation was not successful';
    return res.status(status.error).send(errorMessage);
  }
};

const createDriver = async (req, res) => {
  let { firstname, lastname, email, password, phone, driverstatus, drivergroup, vehicleno } = req.body;
  if (isEmpty(firstname) || isEmpty(email) || isEmpty(password)) {
    errorMessage.error = 'Kindly provide all required fields';
    return res.status(status.bad).send(errorMessage);
  }
  if (!isValidEmail(email) || !validatePassword(password)) {
    errorMessage.error = 'Please enter a valid Email or Password';
    return res.status(status.bad).send(errorMessage);
  };
  const { id, role } = req.user;
  const ExistQuery = " SELECT EXISTS ( SELECT 1 FROM public." + role + " WHERE " + role + "id = $1 AND " + role + "status = 'active')";
  try {
    const { rows } = await dbQuery.query(ExistQuery, [id]);
    const dbResponse = rows[0];
    if (!dbResponse.exists) {
      errorMessage.error = 'Access Denied';
      return res.status(status.notfound).send(errorMessage);
    }
    if (isEmpty(driverstatus)) {
      driverstatus = "inactive"
    };
    const role = "driver";
    const created_on = moment().tz('Asia/Karachi').format('YYYY-MM-DD HH:mm:ss ZZ ');
    const hashedPassword = hashPassword(password);
    const CreateQuery = `INSERT into public.driver(firstname,lastname,email,password,phone,role,created_on,last_updated_on,driverstatus,drivergroup,vehicleno) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11) returning *`;
    const values = [
      firstname,
      lastname,
      email.toLowerCase(),
      hashedPassword,
      phone,
      role.toLowerCase(),
      created_on,
      created_on,
      driverstatus.toLowerCase(),
      drivergroup.toLowerCase(),
      vehicleno.toLowerCase()
    ]
    try {
      const { rows } = await dbQuery.query(CreateQuery, values);
      const dbResponse = rows[0];
      delete dbResponse.password;
      successMessage.data = dbResponse;
      return res.status(status.created).send(successMessage);
    } catch (error) {
      if (error.routine === '_bt_check_unique') {
        errorMessage.error = 'Account with that email already exist';
        return res.status(status.conflict).send(errorMessage);
      }
      errorMessage.error = 'Operation was not successful';
      return res.status(status.error).send(errorMessage);
    }
  } catch (error) {
    errorMessage.error = 'Operation was not successful';
    return res.status(status.error).send(errorMessage);
  }
};


const updateManagerStatus = async (req, res) => {
  let { managerid, managerstatus } = req.body;
  if (isEmpty(managerid) || isEmpty(managerstatus)) {
    errorMessage.error = 'Kindly provide all required fields';
    return res.status(status.bad).send(errorMessage);
  }
  const { id, email, role } = req.user;
  const ExistQuery = " SELECT EXISTS ( SELECT 1 FROM public." + role + " WHERE " + role + "id = $1 AND " + role + "status = 'active')";

  try {
    const { rows } = await dbQuery.query(ExistQuery, [id]);
    const dbResponse = rows[0];
    if (!dbResponse.exists) {
      errorMessage.error = 'Access Denied';
      return res.status(status.notfound).send(errorMessage);
    }
    const last_updated_on = moment().tz('Asia/Karachi').format('YYYY-MM-DD HH:mm:ss ZZ ');
    const CreateQuery = `UPDATE public.manager SET
      managerstatus = $1,last_updated_on = $2
      WHERE managerid = $3
      returning *`;
    const values = [
      managerstatus.toLowerCase(), last_updated_on, managerid
    ]
    try {
      const { rows } = await dbQuery.query(CreateQuery, values);
      const dbResponse = rows[0];
      delete dbResponse.password;
      successMessage.data = dbResponse;
      return res.status(status.created).send(successMessage);
    } catch (error) {
      errorMessage.error = 'Operation was not successful';
      return res.status(status.error).send(errorMessage);
    }
  } catch (error) {

    errorMessage.error = 'Operation was not successful';
    return res.status(status.error).send(errorMessage);
  }
};

const updateOperatorStatus = async (req, res) => {
  let { operatorid, operatorstatus } = req.body;
  if (isEmpty(operatorid) || isEmpty(operatorstatus)) {
    errorMessage.error = 'Kindly provide all required fields';
    return res.status(status.bad).send(errorMessage);
  }
  const { id, email, role } = req.user;
  const ExistQuery = " SELECT EXISTS ( SELECT 1 FROM public." + role + " WHERE " + role + "id = $1 AND " + role + "status = 'active')";

  try {
    const { rows } = await dbQuery.query(ExistQuery, [id]);
    const dbResponse = rows[0];
    if (!dbResponse.exists) {
      errorMessage.error = 'Access Denied';
      return res.status(status.notfound).send(errorMessage);
    }
    const last_updated_on = moment().tz('Asia/Karachi').format('YYYY-MM-DD HH:mm:ss ZZ ');
    const CreateQuery = `UPDATE public.operator SET
      operatorstatus = $1,last_updated_on = $2
      WHERE operatorid = $3
      returning *`;
    const values = [
      operatorstatus.toLowerCase(), last_updated_on, operatorid
    ]
    try {
      const { rows } = await dbQuery.query(CreateQuery, values);
      const dbResponse = rows[0];
      delete dbResponse.password;
      successMessage.data = dbResponse;
      return res.status(status.created).send(successMessage);
    } catch (error) {
      errorMessage.error = 'Operation was not successful';
      return res.status(status.error).send(errorMessage);
    }
  } catch (error) {

    errorMessage.error = 'Operation was not successful';
    return res.status(status.error).send(errorMessage);
  }
};




module.exports =
{
  createManager,
  createOperator,
  createDriver,

  updateManagerStatus,
  updateOperatorStatus
};