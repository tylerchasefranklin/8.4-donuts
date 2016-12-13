var Backbone = require('backbone');
var $ = require('jquery');


var User = Backbone.Model.extend({
  urlRoot: 'https://spider-man.herokuapp.com/classes/User',
}, {
  current: function(){
    var userData = localStorage.getItem('user');

    if (!userData || !JSON.parse(userData).sessionToken){
      return undefined;
    }

    return new User(JSON.parse(userData));
  },
  signUp: function(){
    var self = this;
    var username = this.get('username');
    var password = this.get('password');

    this.save().then(function(data){
      console.log(data);
      localStorage.setItem('user', JSON.stringify(self.toJSON()));
    });
  }
});


module.exports = {
  User: User
};
