var React = require('react');


var Navbar = React.createClass({
  logoutUser: function(){
    delete localStorage.username;
    delete localStorage.password;
    delete localStorage.token;
    delete localStorage.user;
  },
  render: function(){
    var username = localStorage.username;
    return (
      <nav className="navbar navbar-default">
        <div className="container-fluid">
          <div className="navbar-header">
            <a className="navbar-brand" href="#">Brand</a>
          </div>

          <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
            <ul className="nav navbar-nav">
              <li><a href="#">Link <span className="sr-only">(current)</span></a></li>
              <li><a href="#">Link</a></li>
            </ul>
            <ul className="nav navbar-nav navbar-right">
              <li><a href="#">Link</a></li>
              <li><a href="#profile/">Signed In As: {username[0].toUpperCase() + username.slice(1)}</a></li>
              <li><a href="#" onClick={this.logoutUser}>Logout</a></li>
            </ul>
          </div>
        </div>
      </nav>
    )
  }
});


module.exports = {
  Navbar: Navbar
};
