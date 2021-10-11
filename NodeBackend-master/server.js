const http = require('http')
const dotenv = require('dotenv')
dotenv.config();

const app = require('./app');

var server = http.createServer(app);

const host = process.env.HOST;
const port = process.env.PORT;

server.listen(port, host, () => {
    console.log(`App running port ${host}:${port}`);
});