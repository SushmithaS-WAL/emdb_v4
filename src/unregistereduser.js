import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import swal from 'sweetalert'
import Slideshow from './slideshow';
import MovieList from './MovieList';
import Actorlist from './Actorlist';
import Loginpage from './Loginpage';
import Signuppage from './Signuppage';
import Commonuserloggedin from './Commonuserloggedin';

class Unregistereduser extends Component {

  constructor(props){
    super(props);
    this.state={
      category:'',
      keyword:'',
      results:[],
      listorslideshow:false,
      actor:false,
      loginform:false,
      slideshow:true,
      sort_toggle:{
        visibility:'hidden'
      },
      signupform:false,
      signinuser:false,
      unregistered:true,
    }
    this.searchKeyword=this.searchKeyword.bind(this);
    this.search=this.search.bind(this);
    this.home=this.home.bind(this);
    this.category=this.category.bind(this);
    this.loginform=this.loginform.bind(this);
    this.sort=this.sort.bind(this);
    this.signup=this.signup.bind(this);
    this.login=this.login.bind(this);
    this.registeredhomepage=this.registeredhomepage.bind(this);
  }
  
  //Gets the keyword from the textfield
  searchKeyword(event){
    this.setState({
      keyword:event.target.value
    })
  }

  //Search function
  search(){
    axios({
      method:'post',
      url:`http://localhost:3001/show`,
      data:{
        category:this.state.category,
        keyword:this.state.keyword
      },
      withCredentials:true
    })
    .then((obj)=>{
      if(obj.data === 'error'){
        swal({
          title: "Sorry",
          text: "Could not find what you are searching for.",
          icon: "warning",
        });
      }
      else if(obj.data === 'category-error'){
        swal({
          title: "Sorry",
          text: "Select a category to search",
          icon: "warning",
        });
      }
      else {
        this.setState({
          sort_toggle:{
            visibility:'visible'
          }
        })
        if(this.state.category === 'movie')
        {
          this.setState({
            results:obj.data,
            listorslideshow:true,
            slideshow:false,
            actor:false,
            loginform:false,
            signupform:false
          })
        }
        else if(this.state.category === 'person')
        {
          this.setState({
            results:obj.data,
            actor:true,
            slideshow:false,
            listorslideshow:false,
            loginform:false,
            signupform:false
          })
        }
      }
    })
    .catch((error)=>{
      swal({
        title: "Sorry",
        text: "Could not connect to the server",
        icon: "warning",
      });
    })
  }

  //emdb button returns to homepage
  home(){
    this.setState({
      listorslideshow:false,
      loginform:false,
      actor:false,
      slideshow:true,
      signupform:false,
      sort_toggle:{
        visibility:'hidden'
      }
    })
  }

  //selects the category for search
  category(event){
    this.setState({
      category:event.target.value
    })
  }

  //sets the state to display the login form
  loginform(){
    this.setState({
      slideshow:true,
      loginform:true,
      listorslideshow:false,
      actor:false,
      signupform:false,
      sort_toggle:{
        visibility:'hidden'
      }
    })
  }

  //function to sort the results
  sort(event){
    axios({
      method:'post',
      url:'http://localhost:3001/sort',
      data:{
        keyword:this.state.keyword,
        sortmethod:event.target.value,
        category:this.state.category
      },
      withCredentials:true
    })
    .then((obj)=>{
      console.log(obj);
      if(obj.data === 'error'){
        swal({
          title: "Sorry",
          text: "Cannot perform the sorting method for Persons.",
          icon: "warning",
        });
      }
      else{
        if(this.state.category === 'movie')
        {
          this.setState({
            results:obj.data,
            listorslideshow:true,
            slideshow:false,
            actor:false,
            loginform:false,
            signupform:false
          })
        }
        else if(this.state.category === 'person')
        {
          this.setState({
            results:obj.data,
            actor:true,
            slideshow:false,
            listorslideshow:false,
            loginform:false,
            signupform:false
          })
        }
      }
    })
    .catch((error)=>{
      swal({
        title: "Sorry",
        text: "Could not connect to the server",
        icon: "warning",
      });
    })
  }

  //function to render signup form
  signup(){
    this.setState({
      actor:false,
      slideshow:true,
      listorslideshow:false,
      loginform:false,
      signupform:true
    })
  }

  //function to display the login form from sign up form
  login(){
    this.setState({
      actor:false,
      slideshow:true,
      listorslideshow:false,
      loginform:true,
      signupform:false
    })
  }

  //function to render the registered user homepage
  registeredhomepage(){
    this.setState({
      actor:false,
      slideshow:false,
      listorslideshow:false,
      loginform:false,
      signupform:false,
      signinuser:true,
      unregistered:false
    })
  }


  render() {
    var homePage=(
      <div className="Container">
        <div className="Navbar">
          <div className="Title" onClick={this.home}>
            emdb
          </div>
          <div className="Searchbar">
            <input className="Searchfield" type="text" placeholder="Search...." value={this.state.keyword} onChange={this.searchKeyword}></input>
            <button className="Searchbutton" onClick={this.search}>Find</button>
            <select className="Searchcategory" onChange={this.category}>
              <option>Category</option>
              <option value='movie'>Movie</option>
              <option value='person'>Cast and Crew</option>
            </select>
            <select style={this.state.sort_toggle} className="Searchsort" onChange={this.sort}>
              <option value='Sort By'>Sort By</option>
              <option value='highr'>Rating: High to Low</option>
              <option value='lowr'>Rating: Low to High</option>
              <option value='new'>Latest</option>
              <option value='old'>Oldest</option>
            </select>
          </div>
          <button className="Loginbutton" onClick={this.loginform}>Log In</button>
        </div>
        {this.state.slideshow ? <Slideshow /> : null}
        {this.state.listorslideshow ? <MovieList result = {this.state.results} /> : null}
        {this.state.actor ? <Actorlist result = {this.state.results} /> : null}
        {this.state.loginform ? <Loginpage Signup={this.signup} Signin={this.registeredhomepage}/> : null}
        {this.state.signupform ? <Signuppage Login={this.login} /> : null}
      </div>
    )

    return(
      <div>
        {this.state.unregistered ? homePage : null}
        {this.state.signinuser ? <Commonuserloggedin /> : null}
      </div>
    )
  }
}

export default Unregistereduser;
