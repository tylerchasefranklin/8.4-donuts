var React = require('react');
var models = require('../models/user');
var $ = require('jquery');
var Backbone = require('backbone');
var User = require('../models/user').User;


var SignUpForm = React.createClass({
  getInitialState: function(){
    return {
      username: '',
      password: '',
    };
  },
  handleUsername: function(e){
    var username = e.target.value;
    // console.log(username);
    this.setState({username: username});
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
      username: this.state.username.toLowerCase(),
      password: this.state.password
    };

    this.props.signUpNewUser(signUpData);
    // console.log(signUpData);
    this.setState({username: '', password: ''});
  },
  render: function(){
    return (
          <form id="signup" onSubmit={this.handleSubmit}>
            <h2>Need an Account? Sign Up!</h2>
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input className="form-control" onChange={this.handleUsername} value={this.state.username} name="username" id="username" type="username" placeholder="Username" />
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
      username: '',
      password: '',
    };
  },
  handleUsername: function(e){
    var username = e.target.value;
    // console.log(username);
    this.setState({username: username});
  },
  handlePassword: function(e){
    var password = e.target.value;
    // console.log(password);
    this.setState({password: password})
  },
  handleLogin: function(e){
    e.preventDefault();
  var username = this.state.username.toLowerCase();
  var password = this.state.password;
  var url = 'https://spider-man.herokuapp.com/login?';
  var loginUrl = url + 'username=' + encodeURI(username) + '&password=' + encodeURI(password);
  $.ajax(loginUrl, {
    headers: {
      "X-Parse-Application-Id": "spidermanparseserver",
      "X-Parse-REST-API-Key": "webslinger"
    },
    success: function(response){
      var token = localStorage.token;
      localStorage.setItem('username', username);
      localStorage.setItem('password', password);
      localStorage.setItem('token', response.sessionToken);
      localStorage.setItem('user', JSON.stringify(response));
      if(response.sessionToken){
        Backbone.history.navigate('home/', {trigger: true});
      }
    },
    error: function(xhr){
      $('.error').html(xhr.responseJSON.error);
    }
  });
  this.setState({username: '', password: ''});
},
  render: function(){
    return (
      <form id="login" onSubmit={this.handleLogin}>
        <h2>Please Login</h2>
        <div className="form-group">
          <label htmlFor="username-login">Username</label>
          <input className="form-control" onChange={this.handleUsername} value={this.state.username} name="username" id="username-login" type="username" placeholder="Username" />
        </div>
        <div className="form-group">
          <label htmlFor="password-login">Password</label>
          <input className="form-control" onChange={this.handlePassword} value={this.state.password} name="password" id="password-login" type="password" placeholder="Password" />
        </div>

        <input className="btn btn-primary" type="submit" value="Login" />
      </form>
    )
  }
});

// Smart Component
var LoginContainer = React.createClass({
  getInitialState: function(){
    return {
      user: new models.User()
    };
  },
  signUpNewUser: function(signUpData){
    var user = new models.User();
    var data = {
      'username': signUpData.username,
      'password': signUpData.password
    };
    var reponse = $.post('https://spider-man.herokuapp.com/users/', data).then(function(response){
      localStorage.setItem('username', data.username);
      localStorage.setItem('password', data.password);
      localStorage.setItem('token', response.sessionToken);
      localStorage.setItem('user', JSON.stringify(user.toJSON()));
      if(response.sessionToken){
        Backbone.history.navigate('home/', {trigger: true});
      }
   });
  },
  render: function(){
    return (
      <div className="login-screen container">
        <br></br>
        <br></br>
        <br></br>
        <h1 className="title">The BatchMaker App</h1>
        <br></br>
        <br></br>
        <br></br>
        <div className="row">
          <div className="col-md-6">
            <LoginForm />
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
