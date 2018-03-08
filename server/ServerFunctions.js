const movie = require('../models/Movies');
const axios = require('axios');
const argon2 = require('argon2');
const user = require('../models/User');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');

//search function
searchHandler = (req, res) => {
    category = req.body.category;
    keyword = req.body.keyword;
    if (category === 'movie') {
        //searches in database
        movie.movie.find({ title: { '$regex': keyword, '$options': 'i' } })
            .then((obj) => {
                //if it didn't find anything in movie database
                if (obj.length == 0) {
                    //searches using tmdb api
                    axios({
                        method: 'get',
                        url: `https://api.themoviedb.org/3/search/${category}?api_key=618beb7230424a9d83ef94b33f200275&query=${keyword}`
                    })
                    .then((apiobj) => {
                        res.send(apiobj.data.results);
                    })
                    .catch((error) => {
                        console.log('Could not connect using the api');
                    })
                }
                //if it found the result in movie database
                else {
                    res.send(obj);
                }
            })
            .catch((error) => {
                console.log('Could not connect using the database');
            })
    }
    else if (category === 'person') {
        //searches in database
        person.person.find({ title: { '$regex': keyword, '$options': 'i' } })
            .then((obj) => {
                //if it could not find anything in person database
                if (obj.length == 0) {
                    //searches using tmdb api
                    axios({
                        method: 'get',
                        url: `https://api.themoviedb.org/3/search/${category}?api_key=618beb7230424a9d83ef94b33f200275&query=${keyword}`
                    })
                        //if it finds using tmdb api
                        .then((apiobj) => {
                            res.send(apiobj.data.results);
                        })
                        .catch((error) => {
                            console.log('Could not connect using the api');
                        })
                }
                else {
                    //if it finds using database
                    res.send(obj);
                }
            })
            .catch((error) => {
                console.log('Could not connect using the database');
            })
    }
}

//function to provide token to the user
loginHandler = (req,res) => {
    username = req.body.username;
    var token = jwt.sign({username},'BLACKPANTHER');
    user.user.findOneAndUpdate({username:username},{token:token})
    .then((obj)=>{
        console.log("Added Token");
    })
    .catch((error)=>{
        console.log(error);
    })
    res.clearCookie('token');
    console.log("Cleared previous cookie");
    res.cookie('token',token);
    res.send("success");
}

//function to encrypt password and register the user
encryptpassword = (username,password,authority) => {
    argon2.hash(password)
    .then((encryptedpass)=>{
        user.user.create({username:username,password:encryptedpass,authorization:authority})
    })
}

//function to fetch data to register the user
registerHandler = (req,res) => {
    username = req.body.username;
    password = req.body.password;
    var authority;
    authorization = req.body.authorization;
    if(authorization === true){
        authority = 'admin'
    }
    else{
        authority = 'common'
    }
    encryptpassword(username,password,authority);
    res.send('success');
}

module.exports = {
    searchHandler,
    loginHandler,
    registerHandler
}