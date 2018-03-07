import React, { Component } from 'react';
import './App.css';
import bootstrap from 'bootstrap';

class Movielist extends Component {

    render() {
                return(
                    <div className="Slideshow">
                    <header className="App-header">
                    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous" />
                    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script>
                    </header>
                    <div>
                        {
                            this.props.result.map((element,index)=>{
                                var fakeid = index;
                                return(
                                    <div class="card" key={index}> 
                                    <div class="card-header" id={fakeid}>
                                    <h5 class="mb-0">
                                    <button class="btn btn-link collapsed" className="searchresult" data-toggle="collapse" data-target={`#collapse${fakeid}`} aria-expanded="false" aria-controls={`collapse${fakeid}`}>
                                    {element.title}
                                    </button>
                                    </h5>
                                    </div>
                                    <div id={`collapse${fakeid}`} class="collapse" aria-labelledby={fakeid} data-parent="#accordion">
                                        <div class="card-body">
                                        {element.overview}
                                        </div>
                                    </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                  </div> 
                )
    }
}

export default Movielist