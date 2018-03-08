import React, { Component } from 'react';
import './App.css';
import bootstrap from 'bootstrap';
import axios from 'axios';

class Signuppage extends Component {

    constructor(props){
        super(props);
        this.state={
            username:'',
            password:'',
            admin:false
        }
        this.makeadmin=this.makeadmin.bind(this);
        this.getusername=this.getusername.bind(this);
        this.getpassword=this.getpassword.bind(this);
    }

    //function to make the user admin
    makeadmin(){
        this.setState({
            admin:!this.state.admin
        })
    }

    //function to get username
    getusername(event){
        this.setState({
            username:event.target.value
        })
    }

    //function to get password
    getpassword(event){
        this.setState({
            password:event.target.value
        })
    }

    render(){
        return(
            <div className="Slideshow">
            <header className="App-header">
            <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous" />
            <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script>
            </header>
            <div className="Signupbackground">
                <input type="text" placeholder="Username" className="Username" onChange={this.getusername} value={this.state.username}></input>
                <input type="password" placeholder="Password" className="Password" onChange={this.getpassword} value={this.state.password}></input>
                <div className="Signupformcheckboxcontent">
                    <input type="checkbox" onClick={this.makeadmin} className="Signupformcheckbox"></input>
                    <label>I want to be an Editor</label>
                </div>
                <button className="Signupformbutton">SIGN UP</button>
            </div>
            </div>
        )
    }
}

export default Signuppage