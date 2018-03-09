const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/tmdb');

const personSchema = mongoose.Schema({
    popularity:Number,
    profile_path:String,
    name:String,
    known_for:[]
});

const person = mongoose.model('persons', personSchema);

module.exports = {
    person
}