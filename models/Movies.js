const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/emdb');

const movieSchema = mongoose.Schema({
    budget:Number,
    genre:[],
    homepage:String,
    id:Number,
    original_language:String,
    title:String,
    overview:String,
    popularity:Number,
    poster_path:String,
    company:[],
    release_date:Date,
    revenue:Number,
    runtime:Number,
    vote_average:Number,
    vote_count:Number,
    cast:[],
    crew:[]
});

const movie = mongoose.model('movies', movieSchema);

module.exports = {
    movie
}