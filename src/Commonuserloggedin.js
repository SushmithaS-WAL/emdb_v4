import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import swal from 'sweetalert'
import Slideshow from './slideshow';
import UserMovieList from './common-user-logged-in-movie-list';
import Actorlist from './Actorlist';
// import Loginpage from './Loginpage';

class Commonuserloggedin extends Component {

  constructor(props){
    super(props);
    this.state={
      category:'movie',
      keyword:'',
      results:[],
      listorslideshow:false,
      actor:false,
      // loginform:false
    }
    this.searchKeyword=this.searchKeyword.bind(this);
    this.search=this.search.bind(this);
    this.home=this.home.bind(this);
    this.category=this.category.bind(this);
    this.logout=this.logout.bind(this);
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
      if(this.state.category === 'movie')
      {
        this.setState({
          results:obj.data,
          listorslideshow:true
        })
      }
      else if(this.state.category === 'person')
      {
        this.setState({
          results:obj.data,
          actor:true
        })
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
      actor:false
    })
  }

  //selects the category for search
  category(event){
    this.setState({
      category:event.target.value
    })
  }

  //sets the state to display the login form
  logout(){
    axios({
      method:'post',
      url:'http://localhost:3001/logout',
      withCredentials:true
    })
    .then((obj)=>{
      swal({
        title: "Success",
        text: "You've been logged out",
        icon: "success",
        button: "Bye"
      });
      window.location.reload()
    })
    .catch((error)=>{
      console.log('Could not logout');
    })
  }

  render() {
    var homePage=(
      <div className="Container">
        <div className="Navbar">
          <div className="Title" onClick={this.home}>
            emdb
          </div>
          <div className="UserSearchbar">
            <input className="Searchfield" type="text" placeholder="Search...." value={this.state.keyword} onChange={this.searchKeyword}></input>
            <button className="Searchbutton" onClick={this.search}>Find</button>
            <select className="Searchcategory" onChange={this.category}>
              <option value='movie'>Movie</option>
              <option value='person'>Cast and Crew</option>
            </select>
          </div>
          <select className="userlists" onChange={this.category}>
              <option value='watchlist'>Show Watchlist</option>
              <option value='favourites'>Show Favourites</option>
          </select>
          <button className="Userlogoutbutton" onClick={this.logout}>Logout</button>
        </div>
        {this.state.listorslideshow ? <UserMovieList result = {this.state.results} /> : null}
        {this.state.actor ? <Actorlist result = {this.state.results} /> : null}
      </div>
    )

    return(
      homePage
    )
  }
}

export default Commonuserloggedin;
