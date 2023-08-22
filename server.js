
const dotenv = require('dotenv');
dotenv.config({path: './config.env'});

const app = require('./main');
const port = process.env.PORT;
const mongoose = require('mongoose');
const url = process.env.URL.replace('<password>', process.env.PASSWORD);


mongoose.connect(url).then(x=>console.log("Mongo Connected")).catch((err)=>{ console.log(err)});


app.listen(port, ()=>{ console.log("Listinig on : ", port)});

