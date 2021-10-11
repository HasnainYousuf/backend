const dbQuery = require('../db/dbQuery')
const moment = require('moment-timezone');
const { isEmpty } = require('../helpers/validations')
const { errorMessage, successMessage, status } = require('../helpers/status')

const createOrder = async (req, res) => {
  let { ordername, description, orderstatus, reciever, recieverphone, recieveraddress, deliveredby, vehicleno, expected_delivery_date } = req.body;
  const { id, email, role } = req.user;
  if (isEmpty(ordername) || isEmpty(expected_delivery_date)) {
    errorMessage.error = 'Kindly provide all fields';
    return res.status(status.bad).send(errorMessage);
  }
  if (isEmpty(orderstatus)) {
    orderstatus = "unassigned"
  }
  const ExistQuery = " SELECT EXISTS ( SELECT 1 FROM public." + role + " WHERE " + role + "id = $1 AND " + role + "status = 'active')";

  try {
    const { rows } = await dbQuery.query(ExistQuery, [id]);
    const dbResponse = rows[0];
    if (!dbResponse.exists) {
      errorMessage.error = 'Access Denied';
      return res.status(status.notfound).send(errorMessage);
    }
    const created_on = moment().tz('Asia/Karachi').format('YYYY-MM-DD HH:mm:ss ZZ ');
    const last_updated_on = moment().tz('Asia/Karachi').format('YYYY-MM-DD HH:mm:ss ZZ ');
    const CreateQuery = `INSERT into public.orderr(ordername,description,orderstatus,reciever,recieverphone,recieveraddress,createdby,creatorrole,deliveredby,vehicleno,created_on,last_updated_on,expected_delivery_date) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13) returning *`;
    const values = [
      ordername,
      description,
      orderstatus.toLowerCase(),
      reciever,
      recieverphone,
      recieveraddress,
      email.toLowerCase(),
      role.toLowerCase(),
      deliveredby,
      vehicleno,
      created_on,
      last_updated_on,
      expected_delivery_date

    ]
    try {
      const { rows } = await dbQuery.query(CreateQuery, values);
      const dbResponse = rows[0];
      successMessage.data = dbResponse;
      return res.status(status.created).send(successMessage);
    } catch (error) {
      if (error.routine === 'ri_ReportViolation') {
        errorMessage.error = 'Driver does not exist';
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


const assignReciever = async (req, res) => {
  const { orderid, reciever, recieverphone, recieveraddress } = req.body;
  const { id, email, role } = req.user;
  if (isEmpty(orderid) || isEmpty(reciever) || isEmpty(recieverphone) || isEmpty(recieveraddress)) {
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
    const CreateQuery = `UPDATE public.orderr SET
      reciever = $1, recieverphone = $2, recieveraddress = $3,last_updated_on = $4
      WHERE orderid = $5
      returning *`;
    const values = [
      reciever, recieverphone, recieveraddress, last_updated_on, orderid
    ]
    try {
      const { rows } = await dbQuery.query(CreateQuery, values);
      const dbResponse = rows[0];
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


const assignDriver = async (req, res) => {
  const { orderid, deliveredby, vehicleno } = req.body;
  const { id, email, role } = req.user;
  if (isEmpty(orderid) || isEmpty(deliveredby) || isEmpty(vehicleno)) {
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
    let orderstatus = "assigned";
    const last_updated_on = moment().tz('Asia/Karachi').format('YYYY-MM-DD HH:mm:ss ZZ ');
    const CreateQuery = `UPDATE public.orderr SET
      deliveredby = $1, vehicleno = $2, last_updated_on = $3, orderstatus = $4
      WHERE orderid = $5
      returning *`;
    const values = [
      deliveredby.toLowerCase(), vehicleno.toLowerCase(), last_updated_on, orderstatus.toLowerCase(), orderid
    ]
    try {
      const { rows } = await dbQuery.query(CreateQuery, values);
      const dbResponse = rows[0];
      successMessage.data = dbResponse;
      return res.status(status.created).send(successMessage);
    } catch (error) {
      if (error.routine === 'ri_ReportViolation') {
        errorMessage.error = 'Driver does not exist';
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



const updateStatusByDriver = async (req, res) => {
  const { orderid, orderstatus, reason } = req.body;
  const { id, email, role } = req.user;
  if (isEmpty(orderid) || isEmpty(orderstatus) || isEmpty(reason)) {
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
    let delivered_on;
    if (orderstatus == "completed") {
      delivered_on = moment().tz('Asia/Karachi').format('YYYY-MM-DD HH:mm:ss ZZ ');
    }


    const last_updated_on = moment().tz('Asia/Karachi').format('YYYY-MM-DD HH:mm:ss ZZ ');
    const CreateQuery = `UPDATE public.orderr SET
      orderstatus = $1, reason = $2, last_updated_on = $3, delivered_on = $4 
      WHERE orderid = $5 AND deliveredby= $6
      returning *`;
    const values = [
      orderstatus.toLowerCase(), reason, last_updated_on, delivered_on, orderid, email.toLowerCase()
    ]
    try {
      const { rows } = await dbQuery.query(CreateQuery, values);
      const dbResponse = rows[0];
      successMessage.data = dbResponse;
      return res.status(status.created).send(successMessage);
    } catch (error) {
      errorMessage.error = 'Operation was not1 successful';
      return res.status(status.error).send(errorMessage);
    }
  } catch (error) {
    errorMessage.error = 'Operation was not2 successful';
    return res.status(status.error).send(errorMessage);
  }
};


const updateStatusByOM = async (req, res) => {
  const { orderid, orderstatus, reason } = req.body;
  const { id, email, role } = req.user;
  if (isEmpty(orderid) || isEmpty(orderstatus) || isEmpty(reason)) {
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
    let delivered_on;
    if (orderstatus == "completed") {
      delivered_on = moment().tz('Asia/Karachi').format('YYYY-MM-DD HH:mm:ss ZZ ');
    }


    const last_updated_on = moment().tz('Asia/Karachi').format('YYYY-MM-DD HH:mm:ss ZZ ');
    const CreateQuery = `UPDATE public.orderr SET
      orderstatus = $1, reason = $2, last_updated_on = $3, delivered_on = $4 
      WHERE orderid = $5
      returning *`;
    const values = [
      orderstatus.toLowerCase(), reason, last_updated_on, delivered_on, orderid
    ]
    try {
      const { rows } = await dbQuery.query(CreateQuery, values);
      const dbResponse = rows[0];
      successMessage.data = dbResponse;
      return res.status(status.created).send(successMessage);
    } catch (error) {
      errorMessage.error = 'Operation was not1 successful';
      return res.status(status.error).send(errorMessage);
    }
  } catch (error) {
    errorMessage.error = 'Operation was not2 successful';
    return res.status(status.error).send(errorMessage);
  }
};


module.exports =
{
  createOrder,
  assignReciever,
  assignDriver,

  updateStatusByDriver,
  updateStatusByOM

}