import React, { Component } from 'react';
import './App.css';
import Unregistereduser from './unregistereduser';
import Commonuserloggedin from './Commonuserloggedin';
import cookie from 'react-cookies'

class App extends Component {

  constructor(props){
    super(props);
    this.state={
      token:cookie.load('token'),
      // admintoken:cookie.load('admintoken')
    }
    this.checkCookie=this.checkCookie.bind(this);
  }

  //checks for cookie and redirects
  checkCookie(){
    if(this.state.token){
      return(<Commonuserloggedin />)
    }
    // else if(this.state.admintoken){
    //   return<Unregistereduser />
    // }
    else{
      return(<Unregistereduser />)
  }
}
  

  render() {
    return(
      <div>
        {
          this.checkCookie()
        }
      </div>
    )
  }
}

export default App;
