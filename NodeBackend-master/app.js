const express = require('express')
const morgan = require('morgan')
const helmet = require('helmet')
const cors = require('cors')
const dotenv = require('dotenv')
dotenv.config();

const app = express()

const loginRoutes = require('./routes/loginRoutes')
const logoutRoutes = require('./routes/logoutRoutes')

const createRoutes = require('./routes/createRoutes')
const viewRoutes = require('./routes/viewRoutes')


const orderRoutes = require('./routes/orderRoutes')
const driverRoutes = require('./routes/driverRoutes')


app.use(helmet())
app.use(express.urlencoded({ extended: false }));
app.use(express.json())
app.use(cors())

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.get("/", (req, res) => {
  res.status(200).send("contact Developer:https://www.linkedin.com/in/shaikhmustafa/");
})
app.use('/login', loginRoutes)
app.use('/logout', logoutRoutes)

app.use('/create', createRoutes)
app.use('/view', viewRoutes)

app.use('/driver', driverRoutes)
app.use('/order', orderRoutes)

app.get("*", (req, res) => {
  res.status(404).send("contact Developer:https://www.linkedin.com/in/shaikhmustafa/");
})

module.exports = app;