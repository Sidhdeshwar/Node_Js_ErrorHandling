const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

const app = require('./main');
const port = process.env.PORT;
const mongoose = require('mongoose');
const url = process.env.URL.replace('<password>', process.env.PASSWORD);

mongoose.connect(url).then((x) => console.log('Mongo Connected'));

const server = app.listen(port, () => {
  console.log('Listinig on : ', port);
});

// ! Global Error Handlled here  [ No Errror of mongoDb ];
//~ Safety Net (all error will be handdled here.); before connecting with MongoDB; DB Connection Problem
//* EX => Error : Connecting with MongoDB ,,,, Due to : Wrong Password;
process.on('unhandledRejection', (err) => {
  console.log(console.log(err.name, ' *** ## @@@ MongoDb Not Connected'));
  console.log('Shutting Down...');
  server.close(() => {
    console.log('Shut Downed');
    process.exit(1); //0 = success && 1=terminate here
  });
});

//^ Uncatch Exeption ---- > Def => The errors that are not handdled in whole asynchronous code ,,, that are
//^ handdled here.
//^ Ex => x-is not defined.

process.on('uncaughtException', (err) => {
  console.log(err.name, ' :=> ', err.message, ':=> ', ' Uncatch');

  console.log(' UNCATCHCALLED  Called');
  process.exit(1);
});

// console.log(x)  == Commented

//above function always above to the Error Creating line like below
