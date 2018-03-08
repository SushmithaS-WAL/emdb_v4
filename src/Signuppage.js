import React, { Component } from 'react';
import './App.css';
import bootstrap from 'bootstrap';
import axios from 'axios';
import swal from 'sweetalert';

class Signuppage extends Component {
    render(){
        return(
            <div className="Slideshow">
            <header className="App-header">
            <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous" />
            <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script>
            </header>
            <div className="Signupbackground">
                <input type="text" placeholder="Username" className="Username"></input>
                <input type="password" placeholder="Password" className="Password"></input>
                <button className="Loginformbutton">SIGN UP</button>
            </div>
            </div>
        )
    }
}

export default Signuppage