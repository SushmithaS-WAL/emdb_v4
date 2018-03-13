import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import swal from 'sweetalert';
import bootstrap from 'bootstrap';

// .split('T00:00:00.000Z')

class Moviedetail extends Component {

    constructor(props){
        super(props);
        this.state={
            review:[],
            moviereview:false
        }
        this.getReview=this.getReview.bind(this);
    }

    //function to get the review
    getReview(event){
        axios({
            method:'post',
            url:'http://localhost:3001/get-review',
            data:{
                id:event.target.id
            },
            withCredentials:true
        })
        .then((obj)=>{
            console.log(obj.data);
            if(obj.data === 'No review'){
                swal({
                    title: "Sorry",
                    text: "There's no Review",
                    icon: "warning",
                  });
            }
            else{
                this.setState({
                    review:obj.data,
                    moviereview:true
                })
            }
        })
        .catch((error)=>{
            console.log(error);
        })
    }

    render(){

        var movieReview=(
            <div className="Review">
            {
                this.state.review.map((element,index)=>{
                    return(
                        <div>
                        <p>{element.review}</p>
                        <hr className="separator"></hr>
                        </div>
                    )
                })
            }
            </div>
        )

        var Moviedetail=(
            <div className="Moviefulldetail">
            <header className="App-header">
            <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous" />
            <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script>
            </header>
            <div>
                {this.props.moviedetails.map((element,index)=>{
                    return(
                        <div key={index}>
                        <p className="Moviefulldetail-title">{element.title}</p>
                        <img className="Moviefulldetail-image" src={`https://image.tmdb.org/t/p/w154/${element.poster_path}`} alt="poster" />
                        <div className="Moviefulldetail-rating">
                            <p className="searchresult">Rating:{element.vote_average}</p>
                        </div>
                        <div className="Moviefulldetail-language">
                        <p className="searchresult">Language:{element.original_language}</p>
                        </div>
                        <div className="Moviefulldetail-overview">
                        <p>Overview: {element.overview}</p>
                        </div>
                        <div className="Moviefulldetail-releasedate">
                        <p>Release Date: {element.release_date}</p>

                        </div>
                        <div className="Moviefulldetail-budget">
                        <p>Budget: {element.budget}</p>
                        </div>
                        <div className="Moviefulldetail-revenue">
                        <p>Revenue: {element.revenue}</p>
                        </div >
                        <div className="Moviefulldetail-cast-title">
                        <p>Cast</p>
                        </div >
                        <div className="Moviefulldetail-cast">
                        {
                            element.credits.cast.map((actorlist)=>{
                                return(
                                    <div key={actorlist.cast_id}>
                                    <span className="first-label"><label>Character: {actorlist.character}</label></span>
                                    <span className="second-label"><label>Actor: {actorlist.name}</label></span>
                                    </div>
                                )
                            })
                        }
                        </div>
                        <div>
                            <button id={element.id} className="Readreview" onClick={this.getReview}>Read Reviews</button>
                        </div>
                        </div>
                    )
                })}
            <div>
                {this.state.moviereview ? movieReview : null}
            </div>
            </div>
            </div>
        )

        return(
            Moviedetail
            // this.state.movie_detail ? Moviedetail : null
        );
    }
}

export default Moviedetail;