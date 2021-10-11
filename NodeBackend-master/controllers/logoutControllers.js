const { sendExpiredToken } = require('../helpers/validations')
const { errorMessage, successMessage, status } = require('../helpers/status')


const Logout = async (req, res) => {
  const dbResponse = req.user;
  try {
    const token = sendExpiredToken(dbResponse.id, dbResponse.email, dbResponse.role);
    successMessage.data = {};
    successMessage.data.token = token;
    return res.status(status.success).send(successMessage);
  } catch (error) {
    errorMessage.error = 'Operation was not successful';
    return res.status(status.error).send(errorMessage);
  }
};




module.exports =
{
  Logout
};