var Backbone = require('backbone');
var $ = require('jquery');


var User = Backbone.Model.extend({
  urlRoot: 'https://spider-man.herokuapp.com/classes/User',
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
