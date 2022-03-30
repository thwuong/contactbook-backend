const app = require('./app');
const config = require('./app/config');
const connect = require('./app/config/db/connectdb')

//connect db
connect.connectDb();

//start sever
const port = config.app.port;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});