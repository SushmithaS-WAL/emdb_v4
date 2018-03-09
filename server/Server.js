const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const axios = require('axios');
const serverfunctions = require('./ServerFunctions');
const passport = require('../server/passport/passport');
const cookieParser = require('cookie-parser');

//Passport initialization
app.use(passport.passport.initialize());

//Cookie middleware
app.use(cookieParser());

//Body parser middleware
app.use(bodyParser.json());

//cors middleware
app.use(cors({
    origin:'http://localhost:3000',
    credentials:true
}))

//get request at show
app.post('/show',serverfunctions.searchHandler);

//get request at login
app.post('/login',passport.passport.authenticate("local", {session: false}), serverfunctions.loginHandler);

//get request at register
app.post('/register',serverfunctions.registerHandler);

//get request at moviedetails
app.post('/moviedetails',serverfunctions.moremovieinfo);

//get request at userreview
app.post('/userreview',serverfunctions.addreview);

//get request at logout
// app.get('/logout',serverfunctions.logoutHandler);

//server listening at PORT 3001
app.listen(3001,()=>{
    console.log('Started listening at PORT: 3001');
})