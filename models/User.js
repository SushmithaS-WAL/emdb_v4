const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/tmdb');

const userSchema = mongoose.Schema({
    username: String,
    password: String,
    authorization: String,
    token: String,
    review:[],
    favourites:[],
    watchlist:[]
});

const user = mongoose.model('users', userSchema);

module.exports = {
    user
}