const movie = require('../models/Movies');
const person = require('../models/Person');
const axios = require('axios');
const argon2 = require('argon2');
const user = require('../models/User');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const userdata = require('../models/UserData')

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
                        if(apiobj.data.results.length === 0){
                            res.send('error')
                        }
                        else {
                            res.send(apiobj.data.results);
                            //adding it to the database
                            apiobj.data.results.map((element,index)=>{
                                movie.movie.create({
                                    id:element.id,
                                    vote_count:element.vote_count,
                                    vote_average:element.vote_average,
                                    title:element.title,
                                    poster_path:element.poster_path,
                                    original_language:element.original_language,
                                    overview:element.overview,
                                    release_date:element.release_date
                            })
                            })
                        }
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
        person.person.find({ name: { '$regex': keyword, '$options': 'i' } })
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
                            if(apiobj.data.results.length === 0){
                                res.send('error')
                            }
                            else {
                                res.send(apiobj.data.results);
                                //adding it to the database
                               apiobj.data.results.map((element,index)=>{
                                   person.person.create({
                                       popularity:element.popularity,
                                       profile_path:element.profile_path,
                                       name:element.name,
                                       known_for:element.known_for
                               })
                               })
                            }
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
    else if(category === ''){
        res.send('category-error')
    }
}

//function to provide token to the user
loginHandler = (req,res) => {
    username = req.body.username;
    var token = jwt.sign({username},'BLACKPANTHER');
    var admintoken = jwt.sign({username},'TCHALLA');
    user.user.find({username:username})
    .then((obj)=>{
        if(obj[0].authorization === 'common'){
            user.user.findOneAndUpdate({username:username},{token:token})
            .then((obj)=>{
                res.clearCookie('token');
                res.clearCookie('admintoken')
                console.log("Cleared previous cookie");
                res.cookie('token',token);
                res.send("commonsuccess");
            })
        }
        else if(obj[0].authorization === 'admin'){
            user.user.findOneAndUpdate({username:username},{token:admintoken})
            .then((obj)=>{
                res.clearCookie('token');
                res.clearCookie('admintoken')
                console.log("Cleared previous cookie");
                res.cookie('admintoken',admintoken);
                res.send("adminsuccess");  
            })  
        }
    })
    .catch((error)=>{
        console.log(error);
    })
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

//function to fetch more movie details
moremovieinfo = (req,res) =>{
    id = req.body.movieid;
    movie.movie.find({id:id})
    .then((obj)=>{
        if(obj[0].budget === undefined)
        {
            axios({
                method:'get',
                url:`https://api.themoviedb.org/3/movie/${id}?api_key=618beb7230424a9d83ef94b33f200275&append_to_response=credits`
            })
            .then((apiobj)=>{
                res.send([apiobj.data])
                movie.movie.findOneAndUpdate({id:id},{"$set":{budget:apiobj.data.budget,production_companies:apiobj.data.production_companies,revenue:apiobj.data.revenue,credits:apiobj.data.credits}})
                .then((obj)=>{
                    console.log('updated the movie table');
                })
                .catch((error)=>{
                    console.log('Could not connect to the server');
                })
            })
            .catch((error)=>{
                console.log('Could not connect to the database');
            })
        }
        else {
            res.send(obj);
        }
    })

}

//function to add user review
addreview = (req,res) => {
   var title = req.body.title;
    var review = req.body.review;
    var watchlist = req.body.watchlist;
    var favourites = req.body.favourites;
    var token = req.cookies.token;
    var decoded = jwt.verify(token,'BLACKPANTHER');
    var username = decoded.username;

    movie.movie.find({id:title})
    .then((obj)=>{
        // userdata.userdata.findOneAndUpdate({username:username,id:title},{"$set":{title:obj[0].title,review:review,favourites:favourites,watchlist:watchlist}})
        userdata.userdata.create({username:username,id:title,title:obj[0].title,review:review,favourites:favourites,watchlist:watchlist})
        .then((obj)=>{
            res.send('Added Review')
        })
    })
}

//function to logout the user
logoutHandler = (req,res) => {
    res.clearCookie('token');
    res.clearCookie('admintoken');
    res.send('success');
}

//function to sort out the results
sortResults = (req,res) => {
    sortMethod = req.body.sortmethod;
    keyword = req.body.keyword;
    category = req.body.category;
    if(category === 'movie'){
        if(sortMethod === 'highr'){
            movie.movie.find({ title: { '$regex': keyword, '$options': 'i' } }).sort({vote_average:-1})
            .then((obj)=>{
                res.send(obj);
            })
        }
        else if(sortMethod === 'Sort By'){
            movie.movie.find({ title: { '$regex': keyword, '$options': 'i' } })
            .then((obj)=>{
                res.send(obj);
            })
        }
        else if(sortMethod === 'lowr'){
            movie.movie.find({ title: { '$regex': keyword, '$options': 'i' } }).sort({vote_average:1})
            .then((obj)=>{
                res.send(obj);
            })
        }
        else if(sortMethod === 'new'){
            movie.movie.find({ title: { '$regex': keyword, '$options': 'i' } }).sort({release_date:-1})
            .then((obj)=>{
                res.send(obj);
            })
        }
        else if(sortMethod === 'old'){
            movie.movie.find({ title: { '$regex': keyword, '$options': 'i' } }).sort({release_date:1})
            .then((obj)=>{
                res.send(obj);
            })
        }
    }
    else if(category === 'person') {
        if(sortMethod === 'highr'){
            person.person.find({ name: { '$regex': keyword, '$options': 'i' } }).sort({popularity:-1})
            .then((obj)=>{
                res.send(obj);
            })
        }
        else if(sortMethod === 'lowr'){
            person.person.find({ name: { '$regex': keyword, '$options': 'i' } }).sort({popularity:1})
            .then((obj)=>{
                res.send(obj);
            })
        }
        else if(sortMethod === 'new' || sortMethod === 'old'){
            res.send('error')
        }    
    }
}

//function to return the user watchlist or favourites
userchoicelist = (req,res) => {
    var choice = req.body.list;
    var token = req.cookies.token;
    var decoded = jwt.verify(token,'BLACKPANTHER');
    var username = decoded.username;
    if(choice === 'favourites'){
        userdata.userdata.find({username:username,favourites:true}).sort({_id:-1})
        .then((obj)=>{
            res.send(obj);
        })
    }
    else if(choice === 'watchlist'){
        userdata.userdata.find({username:username,watchlist:true}).sort({_id:-1})
        .then((obj)=>{
            res.send(obj);
        })
    }
    else if(choice === 'userlist'){
            res.send('nothing');
    }
}

//function to delete user favourites or watchlist
delete_user_list = (req,res) => {
    id=req.body.id;
    list=req.body.list;
    if(list === 'watchlist'){
        userdata.userdata.findOneAndUpdate({id:id,watchlist:true},{watchlist:false})
        .then((obj)=>{
            res.send('success');
        })
        .catch((error)=>{
            res.send(error)
        })
    }
    else if(list === 'favourites'){
        userdata.userdata.findOneAndUpdate({id:id,favourites:true},{favourites:false})
        .then((obj)=>{
            res.send('success');
        })
        .catch((error)=>{
            res.send(error)
        })
    }
}

//function to get the movie reviews
getReview = (req,res) => {
    id = req.body.id;
    userdata.userdata.find({id:id}).select('review')
    .then((obj)=>{
        if(obj.length === 0){
            res.send('No review');
        }
        else{
            res.send(obj);
        }
    })
}

userChoice = (req,res) => {
    var token = req.cookies.token;
    var decoded = jwt.verify(token,'BLACKPANTHER');
    var username = decoded.username;
    var id = req.body.id;
    userdata.userdata.find({username:username,id:id})
    .then((obj)=>{
        if(obj.data.length === 0){
            res.send('no-entries');
        }
        else{
            res.send(obj);
        }
    })   
}

removeActor = (req,res) => {
    var id = req.body.id;
    person.person.findOneAndRemove({_id:id})
    .then((obj)=>{
        res.send('success');
    })
    .catch((error)=>{
        console.log('Could not connect to the database');
    })
}

removeMovie = (req,res) => {
    var id = req.body.id;
    movie.movie.findOneAndRemove({_id:id})
    .then((obj)=>{
        res.send('success');
    })
    .catch((error)=>{
        console.log('Could not connect to the database');
    })
}

module.exports = {
    searchHandler,
    loginHandler,
    registerHandler,
    moremovieinfo,
    addreview,
    logoutHandler,
    sortResults,
    userchoicelist,
    delete_user_list,
    getReview,
    userChoice,
    removeActor,
    removeMovie
}