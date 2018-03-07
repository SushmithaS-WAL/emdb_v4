import React, { Component } from 'react';
import './App.css';
import bootstrap from 'bootstrap';

class Slideshow extends Component {

    render() {
        return (
            <div>
                <header className="App-header">
                    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous" />
                    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script>
                </header>
                <div className="Slideshow">
                    <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
                        <ol class="carousel-indicators">
                            <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
                            <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
                            <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
                        </ol>
                        <div class="carousel-inner">
                            <div class="carousel-item active">
                                <img class="d-block w-100" src="https://i.imgur.com/b4PoKrU.jpg" alt="First slide" />
                            </div>
                            <div class="carousel-item">
                                <img class="d-block w-100" src="http://mtennon.org/FAITHNETWORK_USERFILESTORE/imagelibraries/ministries/27d1cb3f-04a1-4a06-92bb-2831e2294fe5/SermonsNew/Wakanda-Forever.jpg" alt="Second slide" />
                            </div>
                            <div class="carousel-item">
                                <img class="d-block w-100" src="https://images.wallpapersden.com/image/download/chadwick-boseman-in-black-panther_60921_1920x1080.jpg" alt="Third slide" />
                            </div>
                        </div>
                        <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
                            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span class="sr-only">Previous</span>
                        </a>
                        <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
                            <span class="carousel-control-next-icon" aria-hidden="true"></span>
                            <span class="sr-only">Next</span>
                        </a>
                    </div>
                </div>
            </div>
        )
    }
}

export default Slideshow;