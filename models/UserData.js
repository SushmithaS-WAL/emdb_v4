const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/tmdb');

const userdataSchema = mongoose.Schema({
    username: String,
    id:Number,
    title:String,
    review:String,
    favourites:Boolean,
    watchlist:Boolean
});

const userdata = mongoose.model('userdatas', userdataSchema);

module.exports = {
    userdata
}