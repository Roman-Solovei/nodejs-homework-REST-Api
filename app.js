const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const app = express();
const contactsRouter = require('./routes/api/contacts');



const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use('/api/v1/contacts', contactsRouter);

app.use((req, res, next) => {
   next({status: 404, message: "Not Found"});
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Internal Server Error" } = err;  
   res.status(status).json({message});
});

module.exports = app;
