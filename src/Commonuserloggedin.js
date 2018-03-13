import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import swal from 'sweetalert'
import Slideshow from './slideshow';
import UserMovieList from './common-user-logged-in-movie-lists';
import Actorlist from './Actorlist';

class Commonuserloggedin extends Component {

  constructor(props){
    super(props);
    this.state={
      list:'',
      category:'movie',
      keyword:'',
      results:[],
      listorslideshow:false,
      actor:false,
      slideshow:true,
      sort_toggle:{
        visibility:'hidden'
      },
      userlist:false,
      userchoicelist:[]
    }
    this.searchKeyword=this.searchKeyword.bind(this);
    this.search=this.search.bind(this);
    this.home=this.home.bind(this);
    this.category=this.category.bind(this);
    this.sort=this.sort.bind(this);
    this.logout=this.logout.bind(this);
    this.user_data_list=this.user_data_list.bind(this);
    this.remove=this.remove.bind(this);
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
      this.setState({
        sort_toggle:{
          visibility:'visible'
        }
      })
      if(obj.data === 'error'){
        swal({
          title: "Sorry",
          text: "Could not find what you are searching for.",
          icon: "warning",
        });
      }
      else {
        if(this.state.category === 'movie')
        {
          this.setState({
            results:obj.data,
            listorslideshow:true,
            slideshow:false,
            actor:false
          })
        }
        else if(this.state.category === 'person')
        {
          this.setState({
            results:obj.data,
            actor:true,
            slideshow:false,
            listorslideshow:false
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
      userlist:false,
      actor:false,
      slideshow:true,
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
          text: "Could not perforom the sorting method for Persons.",
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
            actor:false
          })
        }
        else if(this.state.category === 'person')
        {
          this.setState({
            results:obj.data,
            actor:true,
            slideshow:false,
            listorslideshow:false
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

  user_data_list(event){
    axios({
      method:'post',
      url:'http://localhost:3001/user-data-list',
      data:{
        list:event.target.value
      },
      withCredentials:true
    })
    .then((obj)=>{
      this.setState({
        userlist:true,
        listorslideshow:false,
        slideshow:false,
        actor:false,
        userchoicelist:obj.data
      })
    })
    .catch((error)=>{
      console.log('error')
    })
    // this.setState({
    //   list:event.target.value,
    // })
  }

  //function to remove user list
  remove(event){
    axios({
      method:'delete',
      url:'http://localhost:3001/delete-user-list',
      data:{
        id:event.target.id,
        list:this.state.list
      },
      withCredentials:true
    })
    .then((obj)=>{
      if(obj.data === 'success'){
        swal({
          title: "Success",
          text: "Removed from your list",
          icon: "success",
        });
      }
    })
    .catch((error)=>{
      swal({
        title: "Sorry",
        text: "Could not remove from the list",
        icon: "warning",
      });
    }) 
  }

render() {
  var userchoice=(
    <div className="Slideshow1">
      {
        this.state.userchoicelist.map((element,index)=>{
          return(
            <div key={index} className="userslist">
            <p>{element.title}</p>
            </div>
            //<button className="userlist-button" id={element.id} onClick={this.remove}>Remove</button>
          )
        })
      }
    </div> 
  )
  
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
            <option value='movie'>Movie</option>
            <option value='person'>Cast and Crew</option>
          </select>
          <select style={this.state.sort_toggle} className="Searchsort" onChange={this.sort}>
            <option>Sort By</option>
            <option value='highr'>Rating: High to Low</option>
            <option value='lowr'>Rating: Low to High</option>
            <option value='new'>Latest</option>
            <option value='old'>Oldest</option>
          </select>
        </div>
        <select className="userlists" onChange={this.user_data_list}>
            <option>User List</option>
            <option value='watchlist'>Show Watchlist</option>
            <option value='favourites'>Show Favourites</option>
        </select>
        <button className="Userlogoutbutton" onClick={this.logout}>Logout</button>
      </div>
      {this.state.slideshow ? <Slideshow /> : null}
      {this.state.listorslideshow ? <UserMovieList result = {this.state.results} /> : null}
      {this.state.actor ? <Actorlist result = {this.state.results} /> : null}
      {this.state.userlist ? userchoice : null}
    </div>
  )

    

    return(
      homePage
    )
  }
}

export default Commonuserloggedin;
