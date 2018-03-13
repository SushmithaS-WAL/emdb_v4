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
app.post('/logout',serverfunctions.logoutHandler);

//get request at sort
app.post('/sort',serverfunctions.sortResults);

//get request at user-data-list
app.post('/user-data-list',serverfunctions.userchoicelist);

//get request at delete-user-list
// app.delete('delete-user-list',serverfunctions.delete_user_list);

//get request at get-review
app.post('/get-review',serverfunctions.getReview);

//server listening at PORT 3001
app.listen(3001,()=>{
    console.log('Started listening at PORT: 3001');
})