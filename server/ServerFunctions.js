const movie = require('../models/Movies');
const axios = require('axios');

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

module.exports = {
    searchHandler
}