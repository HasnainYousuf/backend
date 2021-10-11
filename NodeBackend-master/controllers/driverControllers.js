const dbQuery = require('../db/dbQuery')
const moment = require('moment-timezone');
const { isEmpty } = require('../helpers/validations')
const { errorMessage, successMessage, status } = require('../helpers/status')

const updateStatus = async (req, res) => {
  let { driverid, driverstatus } = req.body;
  const { id, email, role } = req.user;
  if (isEmpty(driverid) || isEmpty(driverstatus)) {
    errorMessage.error = 'Kindly provide all required fields';
    return res.status(status.bad).send(errorMessage);
  }
  const ExistQuery = " SELECT EXISTS ( SELECT 1 FROM public." + role + " WHERE " + role + "id = $1 AND " + role + "status = 'active')";

  try {
    const { rows } = await dbQuery.query(ExistQuery, [id]);
    const dbResponse = rows[0];
    if (!dbResponse.exists) {
      errorMessage.error = 'Access Denied';
      return res.status(status.notfound).send(errorMessage);
    }
    const last_updated_on = moment().tz('Asia/Karachi').format('YYYY-MM-DD HH:mm:ss ZZ ');
    const CreateQuery = `UPDATE public.driver SET
      driverstatus = $1,last_updated_on = $2
      WHERE driverid = $3
      returning *`;
    const values = [
      driverstatus.toLowerCase(), last_updated_on, driverid
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



const updateVehicle = async (req, res) => {
  const { driverid, vehicleno } = req.body;
  const { id, email, role } = req.user;
  if (isEmpty(driverid) || isEmpty(vehicleno)) {
    errorMessage.error = 'Kindly provide all fields';
    return res.status(status.bad).send(errorMessage);
  }
  const ExistQuery = " SELECT EXISTS ( SELECT 1 FROM public." + role + " WHERE " + role + "id = $1 AND " + role + "status = 'active')";

  try {
    const { rows } = await dbQuery.query(ExistQuery, [id]);
    const dbResponse = rows[0];
    if (!dbResponse.exists) {
      errorMessage.error = 'Access Denied';
      return res.status(status.notfound).send(errorMessage);
    }
    const last_updated_on = moment().tz('Asia/Karachi').format('YYYY-MM-DD HH:mm:ss ZZ ');
    const CreateQuery = `UPDATE public.driver SET
      vehicleno = $1,last_updated_on = $2
      WHERE driverid = $3
      returning *`;
    const values = [
      vehicleno.toLowerCase(), last_updated_on, driverid
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


const updateGroup = async (req, res) => {
  let { driverid, drivergroup } = req.body;
  const { id, email, role } = req.user;
  if (isEmpty(driverid) || isEmpty(drivergroup)) {
    errorMessage.error = 'Kindly provide all required fields';
    return res.status(status.bad).send(errorMessage);
  }
  const ExistQuery = " SELECT EXISTS ( SELECT 1 FROM public." + role + " WHERE " + role + "id = $1 AND " + role + "status = 'active')";

  try {
    const { rows } = await dbQuery.query(ExistQuery, [id]);
    const dbResponse = rows[0];
    if (!dbResponse.exists) {
      errorMessage.error = 'Access Denied';
      return res.status(status.notfound).send(errorMessage);
    }
    const last_updated_on = moment().tz('Asia/Karachi').format('YYYY-MM-DD HH:mm:ss ZZ ');
    const CreateQuery = `UPDATE public.driver SET
      drivergroup = $1,last_updated_on = $2
      WHERE driverid = $3
      returning *`;
    const values = [
      drivergroup.toLowerCase(), last_updated_on, driverid
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
  updateStatus,
  updateGroup,
  updateVehicle
};