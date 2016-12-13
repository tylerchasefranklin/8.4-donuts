var React = require('react');
var models = require('../models/recipe');
var $ = require('jquery');
var RecipeAddEditForm = require('./recipeform.jsx').RecipeAddEditForm;
var Navbar = require('../templates/navbar.jsx').Navbar;
var User = require('../models/user').User;

var RecipeList = React.createClass({
  getInitialState: function(){
    return  {
      user: User.current(),
      recipeCollection: new models.RecipeCollection()
    };
  },
  componentWillMount: function(){
    var self = this;
    this.state.recipeCollection.fetch().then(function(data){
      // console.log(data.results);
      self.setState({recipeCollection: data.results})
    });
  },
  render: function(){
    var recipeCollection = this.state.recipeCollection;
    var user = this.state.user;
    var self = this;
    var userId = user.attributes.objectId;
    // console.log(userId);
    var recipes = recipeCollection.map(function(recipe){
      // console.log(recipe);
      if(userId === recipe.user.objectId){
        return (
          <p className="list-group-item col-md-2" key={recipe.title}><a href={'#recipes/' + recipe.objectId + '/'}>{recipe.title}</a></p>
        )
      }
    });
    return (
      <div>
        <Navbar />
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="recipe-list">Recipes</h1>
              <div className="list-group">
                {recipes}
              </div>
            </div>
            <RecipeAddEditForm />
          </div>
        </div>
      </div>
    )
  }
});

module.exports = {
  RecipeList: RecipeList
};
