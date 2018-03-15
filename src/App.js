import React, { Component } from 'react';
import './App.css';
import Unregistereduser from './unregistereduser';
import Commonuserloggedin from './Commonuserloggedin';
import Adminuserloggedin from './admin-user-loggedin';
import cookie from 'react-cookies'

class App extends Component {

  constructor(props){
    super(props);
    this.state={
      token:cookie.loadAll()
    }
    this.checkCookie=this.checkCookie.bind(this);
  }

  //checks for cookie and redirects
  checkCookie(){
    if(this.state.token.token){
      return(<Commonuserloggedin />)
    }
    else if(this.state.token.admintoken){
      return<Adminuserloggedin />
    }
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
