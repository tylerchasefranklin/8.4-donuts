var React = require('react');
var User = require('../models/user').User;
var $ = require('jquery');
var Backbone = require('backbone');


var SignUpForm = React.createClass({
  getInitialState: function(){
    return {
      email: '',
      password: '',
    };
  },
  handleEmail: function(e){
    var email = e.target.value;
    // console.log(email);
    this.setState({email: email});
  },
  handlePassword: function(e){
    var password = e.target.value;
    // console.log(password);
    this.setState({password: password})
  },
  handleSubmit: function(e){
    e.preventDefault();
    // console.log('signed up!');
    var signUpData = {
      email: this.state.email,
      password: this.state.password
    };

    this.props.signUpNewUser(signUpData);
    // console.log(signUpData);
    this.setState({email: '', password: ''});
  },
  render: function(){
    return (
          <form id="signup" onSubmit={this.handleSubmit}>
            <h2>Need an Account? Sign Up!</h2>
            <div className="form-group">
              <label htmlFor="email">Email address</label>
              <input className="form-control" onChange={this.handleEmail} value={this.state.email} name="email" id="email" type="email" placeholder="email" />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input className="form-control" onChange={this.handlePassword} value={this.state.password} name="password" id="password" type="password" placeholder="Password" />
            </div>

            <input className="btn btn-primary" type="submit" value="Sign Me Up!" />
          </form>
    )
  }
});


var LoginForm = React.createClass({
  getInitialState: function(){
    return {
      email: '',
      password: '',
    };
  },
  handleEmail: function(e){
    var email = e.target.value;
    // console.log(email);
    this.setState({email: email});
  },
  handlePassword: function(e){
    var password = e.target.value;
    // console.log(password);
    this.setState({password: password})
  },
  handleSubmit: function(e){
    e.preventDefault();
    // console.log('signed up!');
    var signUpData = {
      email: this.state.email,
      password: this.state.password
    };

    this.props.signUpNewUser(signUpData);
    // console.log(signUpData);
    this.setState({email: '', password: ''});
  },
  render: function(){
    return (
      <form id="login" onSubmit={this.props.handleLogin}>
        <h2>Please Login</h2>
        <div className="form-group">
          <label htmlFor="email-login">Email address</label>
          <input className="form-control" value={this.email} name="email" id="email-login" type="email" placeholder="email" />
        </div>
        <div className="form-group">
          <label htmlFor="password-login">Password</label>
          <input className="form-control" value={this.password} name="password" id="password-login" type="password" placeholder="Password" />
        </div>

        <input className="btn btn-primary" type="submit" value="Login" />
      </form>
    )
  }
});

// function setHeaders(response){
//   $.ajaxSetup({
//     beforeSend: function(xhr){
//       xhr.setRequestHeader("X-Parse-Application-Id", "spidermanparseserver");
//       xhr.setRequestHeader("X-Parse-REST-API-Key", "webslinger");
//
//       if(response){
//         xhr.setRequestHeader("X-Parse-Session-Token", response.sessionToken);
//       }
//
//     }
//   });
// }

// Smart Component
var LoginContainer = React.createClass({
  getInitialState: function(){
    return {
      user: new User()
    };
  },
  signUpNewUser: function(signUpData){
    var data = {
      'username': signUpData.email,
      'password': signUpData.password
    };
    var reponse = $.post('https://spider-man.herokuapp.com/users/', data).then(function(response){
      console.log('test', response.sessionToken);
      // setHeaders(response.sessionToken);
      // console.log(response);
      console.log(data);
      localStorage.setItem('username', response.username);
      localStorage.setItem('token', response.sessionToken);
   });
  },
  handleLogin: function(e){
    e.preventDefault();
    var self = this;
    var username = localStorage.username;
    var password = localStorage.password;
    var token = localStorage.token;
    console.log('logged in!');
    var url = 'https://spider-man.herokuapp.com/login';
    // console.log(localStorage);
    $.get(url + '?username=' + username + '&password=' + password ).then(function(response){
      console.log('get', response);
      localStorage.setItem('username', response.username);
      localStorage.setItem('token', response.sessionToken);
      if(token){
        Backbone.history.navigate('home/', {trigger: true});
      };
    });
  },
  render: function(){
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <LoginForm handleLogin={this.handleLogin}/>
          </div>
          <div className="col-md-6">
            <SignUpForm signUpNewUser={this.signUpNewUser}/>
          </div>
        </div>
      </div>
    )
  }
});



module.exports = {
  LoginContainer: LoginContainer
};
