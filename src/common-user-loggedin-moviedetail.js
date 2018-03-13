import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import bootstrap from 'bootstrap';
import swal from 'sweetalert';

class UserMoviedetail extends Component {

    constructor(props){
        super(props);
        this.state={
            reviews:[],
            moviereview:false,
            review:'',
            watchlist:false,
            favourites:false,
            title:''
        }
        this.getReviews=this.getReviews.bind(this);
        this.getreview=this.getreview.bind(this);
        this.watchlist=this.watchlist.bind(this);
        this.favourites=this.favourites.bind(this);
        this.submit=this.submit.bind(this);
    }

    getReviews(event){
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
                    reviews:obj.data,
                    moviereview:true
                })
            }
        })
        .catch((error)=>{
            console.log(error);
        })
    }

    //function to get review
    getreview(event){
        this.setState({
            review:event.target.value,
            title:event.target.id
        })
    }

    //function to add to watchlist
    watchlist(){
        this.setState({
            watchlist:!this.state.watchlist
        })
    }

    //function to add to favourites
    favourites(){
        this.setState({
            favourites:!this.state.favourites
        })
    }

    //function to add review,favourite,watchlist
    submit(){
        axios({
            method:'post',
            url:'http://localhost:3001/userreview',
            data:{
                review:this.state.review,
                watchlist:this.state.watchlist,
                favourites:this.state.favourites,
                title:this.state.title
            },
            withCredentials:true
        })
        .then((obj)=>{
            swal({
                title: "Success",
                text: "Review has been added",
                icon: "success",
                button: "Good One"
              })
        })
    }

    render(){

        var movieReview=(
            <div className="Review">
            {
                this.state.reviews.map((element,index)=>{
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
                        <div className="whitener"></div>
                        <p className="Moviefulldetail-title">{element.title}</p>
                        <img className="Moviefulldetail-image" src={`https://image.tmdb.org/t/p/w154/${element.poster_path}`} alt="poster" />
                        <div className="Moviefulldetail-rating">
                            <p className="searchresult">Rating:{element.vote_average}</p>
                        </div>
                        <div className="Moviefulldetail-language">
                        <p className="searchresult">Language:{element.original_language}</p>
                        </div>
                        <div className="Moviefulldetail-review-title">
                        <p className="searchresult">Review:</p>
                        </div>
                        <div className="Moviefulldetail-watchlist">
                            <input type="checkbox"  className="Userwatchlistcheckbox" onClick={this.watchlist}></input>
                            <label>Add to Watchlist</label>
                        </div>
                        <div className="Moviefulldetail-favourites">
                            <input type="checkbox"  className="Userfavouritecheckbox" onClick={this.favourites}></input>
                            <label>Add to Favourites</label>
                        </div>
                        <button className="Moviefulldetail-submit" onClick={this.submit}>
                            Submit
                        </button>
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
                        <div className="Moviefulldetail-review">
                            <textarea id={element.id} rows="5" cols="40" onChange={this.getreview} value={this.state.review}>
                            </textarea>
                        </div>
                        <div>
                            <button id={element.id} className="Readreview" onClick={this.getReviews}>Read Reviews</button>
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

        return(Moviedetail);
    }
}

export default UserMoviedetail;