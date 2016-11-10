var Backbone = require('backbone');
var React = require('react');
var ReactDOM = require('react-dom');
var $ = require('jquery');

var LoginContainer = require('./components/login.jsx').LoginContainer;

var RecipeDetailContainer = require('./components/recipedetail.jsx').RecipeDetailContainer;
var RecipeList = require('./components/recipelist.jsx').RecipeList;


var AppRouter = Backbone.Router.extend({
  routes: {
    '': 'index',
    'home/': 'home',
    'recipes/': 'recipeList',
    'recipes/:id/': 'recipeDetail',
    'recipes/add/': 'recipeAddEdit',
    'recipes/:id/edit/': 'recipeAddEdit',
  },
  initialize: function(response){
    $.ajaxSetup({
      beforeSend: function(xhr){
        xhr.setRequestHeader('X-Parse-Application-Id', 'spidermanparseserver');
        xhr.setRequestHeader('X-Parse-REST-API-Key', 'webslinger');
        if (response){
          xhr.setRequestHeader('X-Parse-Session-Token', response.sessionToken);
        }
      }
    });
  },
  // overload the execute method so we can check for logged in user
  // redirect to login screen if not logged in
  // execute: function(callback, args, name){
  //   var user = User.current();
  //   if (!user){
  //     this.navigate('login/', {trigger: true});
  //     return;
  //   }
  //   return Backbone.Router.prototype.execute.call(this,callback, args, name);
  // },
  index: function(){
    // console.log('index screen working');
    ReactDOM.render(
      React.createElement(LoginContainer),
      document.getElementById('app')
    );
  },
  home: function(){
    // console.log('home screen working');

    ReactDOM.render(
      React.createElement(RecipeList),
      document.getElementById('app')
    );
  },
  recipeDetail: function(recipeId){
    // console.log('recipe detail working');

    ReactDOM.render(
      React.createElement(RecipeDetailContainer, {recipeId: recipeId}),
      document.getElementById('app')
    );
  },
  recipeAddEdit: function(recipeId){
    console.log('add recipe page working');

    ReactDOM.render(
      React.createElement(RecipeDetailContainer, {recipeId: recipeId}),
      document.getElementById('app')
    );
  }
});


var router = new AppRouter();

module.exports = {
  router: router
};
