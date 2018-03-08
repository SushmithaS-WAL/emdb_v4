import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import bootstrap from 'bootstrap';

class Moviedetail extends Component {



    render(){
        return(
            <div className="Slideshow">
            {this.props.moviedetails.map((element,index)=>{
                return(
                    <div key={index}>
                    <p className="searchresult-div-title">{element.title}</p>
                    <img className="searchresult-image" src={`https://image.tmdb.org/t/p/w92/${element.poster_path}`} alt="poster" />
                    <p className="searchresult">Rating: </p><label className="searchcontent">{element.vote_average}</label>
                    <p className="searchresult">Language: </p><label className="searchcontent">{element.original_language}</label>
                    <p className="searchresult">Overview: </p><label className="searchcontent">{element.overview}</label>
                    <p className="searchresult">Release Date: </p><label className="searchcontent">{element.release_date.split('T00:00:00.000Z')}</label>
                    <br />
                    <button id={element.id} className="searchresult-read-more" onClick={this.moreDetails}>Read More</button>
                    </div>
                )
            })}
            </div>
        )
    }
}

export default Moviedetail;