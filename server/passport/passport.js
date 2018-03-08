const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy;
const user = require('../../models/User');
const argon2 = require('argon2');

//middleware to verify the user credentials
passport.use(new LocalStrategy(
  function(username, password, done) {
    user.user.findOne({ username: username })
    .then((user)=>{
      return argon2.verify(user.password, password)
    })
    .then((matched) => {
        if(matched){
            done(null,true);
        }
        else{
            done(null,false);
        }
    })
    .catch(error => {
        console.log(error);
    })
  }
));

module.exports = {
    passport
}