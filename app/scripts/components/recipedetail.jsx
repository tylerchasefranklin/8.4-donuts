var React = require('react');
var Backbone = require('backbone');
var models = require('../models/recipe');

var RecipeDetailContainer = React.createClass({
  getInitialState: function(){
    return {
      recipe: new models.Recipe()
    }
  },
  componentWillMount: function(){
    var recipe = this.state.recipe,
    recipeId = this.props.recipeId;
    var self = this;
    console.log(recipeId);
    console.log(recipe);
    if(!recipe){
      return;
    };

    recipe.set('objectId', recipeId);
    recipe.fetch().then(function(){
      self.setState({recipe: recipe});
    });
  },
  render: function(){
    return (
      <div>
        <h1>Recipe Detail</h1>
        <RecipeEdit />
      </div>
    )
  }
});

var RecipeEdit = React.createClass({
  getInitialState: function(){
    return {
      recipe: new models.Recipe()
    };
  },
  componentWillMount: function(){
    this.getRecipe();
  },
  componentWillReceiveProps: function(){
    this.getRecipe();
  },
  getRecipe: function(){
    var recipe = this.state.recipe;
    var recipeId = this.props.recipeId;
    var self = this;
    console.log(recipe);
    console.log(recipeId);

    if(!recipeId){
      return;
    };

    recipe.set('objectId', recipeId);
    recipe.fetch().then(function(){
      self.setState({recipe: recipe});
    });
  },
  render: function(){
    return (
      <h1>Edit Recipe</h1>
    );
  }
})


module.exports = {
  RecipeDetailContainer: RecipeDetailContainer
};
