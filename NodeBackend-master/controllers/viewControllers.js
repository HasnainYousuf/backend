const dbQuery = require('../db/dbQuery')
const { errorMessage, successMessage, status } = require('../helpers/status')

const viewManager = async (req, res) => {
  const { id, email, role } = req.user;
  const ExistQuery = " SELECT EXISTS ( SELECT 1 FROM public." + role + " WHERE " + role + "id = $1 AND " + role + "status = 'active')";
  try {
    const { rows } = await dbQuery.query(ExistQuery, [id]);
    const dbResponse = rows[0];
    if (!dbResponse.exists) {
      errorMessage.error = 'Access Denied';
      return res.status(status.notfound).send(errorMessage);
    }
    const PayloadQuery = "SELECT managerid,firstname, lastname,email,phone,role,managerstatus,created_on, last_updated_on FROM public.manager";
    try {
      const { rows } = await dbQuery.query(PayloadQuery);
      const dbResponse = rows;
      if (!dbResponse) {
        errorMessage.error = 'Record NOT Found!';
        return res.status(status.notfound).send(errorMessage);
      }

      successMessage.data = dbResponse;
      return res.status(status.success).send(successMessage);
    } catch (error) {
      errorMessage.error = 'Operation was not successful';
      return res.status(status.error).send(errorMessage);
    }
  } catch (error) {
    errorMessage.error = 'Operation was not successful';
    return res.status(status.error).send(errorMessage);
  }
};


const viewOperator = async (req, res) => {
  const { id, email, role } = req.user;
  const ExistQuery = " SELECT EXISTS ( SELECT 1 FROM public." + role + " WHERE " + role + "id = $1 AND " + role + "status = 'active')";
  try {
    const { rows } = await dbQuery.query(ExistQuery, [id]);
    const dbResponse = rows[0];
    if (!dbResponse.exists) {
      errorMessage.error = 'Access Denied';
      return res.status(status.notfound).send(errorMessage);
    }
    const PayloadQuery = "SELECT operatorid,firstname, lastname,email,phone,role,operatorstatus,created_on, last_updated_on FROM public.operator";
    try {
      const { rows } = await dbQuery.query(PayloadQuery);
      const dbResponse = rows;
      if (!dbResponse) {
        errorMessage.error = 'Record NOT Found!';
        return res.status(status.notfound).send(errorMessage);
      }

      successMessage.data = dbResponse;
      return res.status(status.success).send(successMessage);
    } catch (error) {
      errorMessage.error = 'Operation was not successful';
      return res.status(status.error).send(errorMessage);
    }
  } catch (error) {
    errorMessage.error = 'Operation was not successful';
    return res.status(status.error).send(errorMessage);
  }
};


const viewDriver = async (req, res) => {
  const { id, email, role } = req.user;
  const ExistQuery = " SELECT EXISTS ( SELECT 1 FROM public." + role + " WHERE " + role + "id = $1 AND " + role + "status = 'active')";
  try {
    const { rows } = await dbQuery.query(ExistQuery, [id]);
    const dbResponse = rows[0];
    if (!dbResponse.exists) {
      errorMessage.error = 'Access Denied';
      return res.status(status.notfound).send(errorMessage);
    }
    const PayloadQuery = "SELECT driverid,firstname, lastname,email,phone,role,driverstatus,drivergroup,vehicleno,created_on,last_updated_on FROM public.driver";
    try {
      const { rows } = await dbQuery.query(PayloadQuery);
      const dbResponse = rows;
      if (!dbResponse) {
        errorMessage.error = 'Record NOT Found!';
        return res.status(status.notfound).send(errorMessage);
      }

      successMessage.data = dbResponse;
      return res.status(status.success).send(successMessage);
    } catch (error) {
      errorMessage.error = 'Operation was not successful';
      return res.status(status.error).send(errorMessage);
    }
  } catch (error) {
    errorMessage.error = 'Operation was not successful';
    return res.status(status.error).send(errorMessage);
  }
};


const viewOrder = async (req, res) => {
  const { id, email, role } = req.user;
  const ExistQuery = " SELECT EXISTS ( SELECT 1 FROM public." + role + " WHERE " + role + "id = $1 AND " + role + "status = 'active')";
  try {
    const { rows } = await dbQuery.query(ExistQuery, [id]);
    const dbResponse = rows[0];
    if (!dbResponse.exists) {
      errorMessage.error = 'Access Denied';
      return res.status(status.notfound).send(errorMessage);
    }
    const PayloadQuery = "SELECT * FROM public.orderr";
    try {
      const { rows } = await dbQuery.query(PayloadQuery);
      const dbResponse = rows;
      if (!dbResponse) {
        errorMessage.error = 'Record NOT Found!';
        return res.status(status.notfound).send(errorMessage);
      }

      successMessage.data = dbResponse;
      return res.status(status.success).send(successMessage);
    } catch (error) {
      errorMessage.error = 'Operation was not successful';
      return res.status(status.error).send(errorMessage);
    }
  } catch (error) {
    errorMessage.error = 'Operation was not successful';
    return res.status(status.error).send(errorMessage);
  }
};


const viewDriverOrder = async (req, res) => {
  const { id, email, role } = req.user;
  const ExistQuery = " SELECT EXISTS ( SELECT 1 FROM public." + role + " WHERE " + role + "id = $1 AND " + role + "status = 'active')";
  try {
    const { rows } = await dbQuery.query(ExistQuery, [id]);
    const dbResponse = rows[0];
    if (!dbResponse.exists) {
      errorMessage.error = 'Access Denied';
      return res.status(status.notfound).send(errorMessage);
    }
    const PayloadQuery = "SELECT * FROM public.orderr WHERE deliveredby = $1 AND  (orderstatus = 'assigned' OR  orderstatus = 'inroute' OR orderstatus = 'failed') ";
    try {
      const { rows } = await dbQuery.query(PayloadQuery, [email]);
      const dbResponse = rows;
      if (!dbResponse) {
        errorMessage.error = 'Record NOT Found!';
        return res.status(status.notfound).send(errorMessage);
      }

      successMessage.data = dbResponse;
      return res.status(status.success).send(successMessage);
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
  viewManager,
  viewOperator,
  viewDriver,

  viewOrder,
  viewDriverOrder
};