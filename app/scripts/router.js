var Backbone = require('backbone');
var React = require('react');
var ReactDOM = require('react-dom');
var $ = require('jquery');

var LoginContainer = require('./components/login.jsx').LoginContainer;

var RecipeDetailContainer = require('./components/recipedetail.jsx').RecipeDetailContainer;
var RecipeList = require('./components/recipelist.jsx').RecipeList;
var RecipeEdit = require('./components/recipeedit.jsx').RecipeEdit;


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
  index: function(){
    ReactDOM.render(
      React.createElement(LoginContainer),
      document.getElementById('app')
    );
  },
  home: function(){
    ReactDOM.render(
      React.createElement(RecipeList),
      document.getElementById('app')
    );
  },
  recipeDetail: function(recipeId){
    ReactDOM.render(
      React.createElement(RecipeDetailContainer, {recipeId: recipeId}),
      document.getElementById('app')
    );
  },
  recipeAddEdit: function(recipeId){
    ReactDOM.render(
      React.createElement(RecipeEdit),
      document.getElementById('app')
    );
  }
});


var router = new AppRouter();

module.exports = {
  router: router
};
