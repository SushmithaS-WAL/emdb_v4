const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/tmdb');

const movieSchema = mongoose.Schema({
    id:Number,
    vote_count:Number,
    vote_average:Number,
    title:String,
    poster_path:String,
    original_language:String,
    overview:String,
    release_date:Date,
    budget:Number,
    production_companies:[],
    revenue:Number,
    credits:{}
});

const movie = mongoose.model('movies', movieSchema);

module.exports = {
    movie
}