import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import bootstrap from 'bootstrap';
import swal from 'sweetalert'
import Slideshow from './slideshow';
import AdminMovieList from './adminMovieList';
import AdminActorlist from './adminActorList';

class Adminuserloggedin extends Component {

  constructor(props){
    super(props);
    this.state={
      list:'',
      category:'',
      keyword:'',
      results:[],
      listorslideshow:false,
      actor:false,
      slideshow:true,
      sort_toggle:{
        visibility:'hidden'
      },
      userlist:false,
      userloggedin:true,
      userchoicelist:[],
      userListFunctionCall:false,
      movieCreate:false,
      personCreate:false
    }
    this.searchKeyword=this.searchKeyword.bind(this);
    this.search=this.search.bind(this);
    this.home=this.home.bind(this);
    this.category=this.category.bind(this);
    this.sort=this.sort.bind(this);
    this.logout=this.logout.bind(this);
    this.user_data_list=this.user_data_list.bind(this);
    this.user_data_list_request=this.user_data_list_request.bind(this);
    this.remove=this.remove.bind(this);
    this.create_data=this.create_data.bind(this);
    this.actortohome=this.actortohome.bind(this);
    this.movietohome=this.movietohome.bind(this);
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
            userlist:false,
            actor:false
          })
        }
        else if(this.state.category === 'person')
        {
          this.setState({
            results:obj.data,
            actor:true,
            slideshow:false,
            userlist:false,
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
      userlist:false,
      actor:false,
      slideshow:true,
      sort_toggle:{
        visibility:'hidden'
      },
      keyword:''
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
            actor:false,
            userlist:false
          })
        }
        else if(this.state.category === 'person')
        {
          this.setState({
            results:obj.data,
            actor:true,
            slideshow:false,
            listorslideshow:false,
            userlist:false
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

  //function used to request for rendering the user list
  user_data_list_request(event){
    this.setState({
      userListFunctionCall:true,
      list:event.target.value
    })
  }

  user_data_list(){
    axios({
      method:'post',
      url:'http://localhost:3001/user-data-list',
      data:{
        list:this.state.list
      },
      withCredentials:true
    })
    .then((obj)=>{
      if(obj.data === 'nothing'){
        this.setState({
          userlist:false,
          slideshow:true,
        })
      }
      else if(obj.data.length === 0){
        swal({
          title: "Sorry",
          text: "No User List",
          icon: "warning",
        });
      }
      else{
        this.setState({
          userlist:true,
          listorslideshow:false,
          slideshow:false,
          actor:false,
          userchoicelist:obj.data,
          userListFunctionCall:false
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

  //function to remove user list
  remove(event){
    axios({
      method:'post',
      url:'http://localhost:3001/delete-user-list',
      data:{
        id:event.target.id,
        list:this.state.list
      },
      withCredentials:true
    })
    .then((obj)=>{
      this.setState({
        userListFunctionCall:true
      })
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

  create_data(event){
    if(event.target.value === 'movie'){
      this.setState({
        movieCreate:true
      })
    }
    else if(event.target.value === 'person'){
      this.setState({
        personCreate:true
      })
    }
  }

  actortohome(){
      this.setState({
          actor:false,
          slideshow:true,
          sort_toggle:{
            visibility:'hidden'
          }
      })
  }

  movietohome(){
    this.setState({
        listorslideshow:false,
        slideshow:true,
        sort_toggle:{
          visibility:'hidden'
        }
    })
}

render() {

  var userchoice=(
    <div className="Slideshow1">
    <div>
    <header className="App-header">
      <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous" />
      <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script>
    </header>
    </div>
      {
        this.state.userchoicelist.map((element,index)=>{
          return(
            <div key={index} className="userslist">
            <p>{element.title}</p>
            <button className="userlist-button" id={element.id} onClick={this.remove}>Remove</button>
            </div>
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
        <button className="Userlogoutbutton" onClick={this.logout}>Logout</button>
      </div>
      {this.state.slideshow ? <Slideshow /> : null}
      {this.state.listorslideshow ? <AdminMovieList result = {this.state.results} movietohome = {this.movietohome} /> : null}
      {this.state.actor ? <AdminActorlist result = {this.state.results} actortohome = {this.actortohome}/> : null}
      {this.state.userlist ? userchoice : null}
      {this.state.userListFunctionCall ? this.user_data_list() : null}
    </div>
  )

    

    return(this.state.userloggedin ? homePage : null)
  }
}

export default Adminuserloggedin;
