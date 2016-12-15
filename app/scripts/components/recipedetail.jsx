var React = require('react');
var Backbone = require('backbone');
var models = require('../models/recipe');
var AdjustRecipe = require('./adjustrecipe.jsx').AdjustRecipe;
var RecipeEdit = require('./recipeedit.jsx').RecipeEdit;

var RecipeDetailContainer = React.createClass({
  getInitialState: function(){
    return {
      recipe: new models.Recipe(),
      ingredients: new models.IngredientCollection()
    }
  },
  componentWillMount: function(){
    var recipe = this.state.recipe;
    var recipeId = this.props.recipeId;
    var ingredients = this.state.ingredients;
    // console.log('ingredients', ingredients);
    var self = this;
    // console.log(recipeId);
    // console.log(recipe);
    if(!recipeId){
      return;
    };


    recipe.set('objectId', recipeId);
    recipe.fetch().then(function(){
      self.setState({recipe: recipe});
    });
    ingredients.fetch().then(function(){
      self.setState({ingredients: ingredients});
      // console.log('ingredients will mount', ingredients);
    });

  },
  render: function(){
    var recipe = this.state.recipe;
    var recipeId = this.props.recipeId;
    var self = this;
    // console.log('recipeId', recipeId);
    var ingredients = this.state.ingredients;
    // console.log('ingredients', ingredients);
    var ingredientItem = ingredients.map(function(ingredientCollection){
      // console.log('ingredientId', ingredientCollection.id);
      // console.log('recipe id', ingredientCollection.attributes.recipe.objectId);
      // console.log('recipe id', recipeId);
      if(recipeId === ingredientCollection.attributes.recipe.objectId){
        return (
          <li className="list-group-item" key={ingredientCollection.attributes.name}>{ingredientCollection.attributes.amount} {ingredientCollection.attributes.units} of {ingredientCollection.attributes.name}</li>
        );
      };
    });
    return (
      <div>
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1>Recipe Detail:</h1>
              <ul className="list-group col-md-6">
                <label htmlFor="recipe-title" className="control-label">Recipe Title:</label>
                <li className="list-group-item" id="recipe-title">{recipe.attributes.title}</li>
                <br></br>
                <label htmlFor="recipe-servings" className="control-label">Servings:</label>
                <li className="list-group-item" id="recipe-servings">{recipe.attributes.servings} serving(s)</li>
                <br></br>
                <label className="control-label">Ingredients:</label>
                {ingredientItem}
              </ul>
            </div>
          </div>
        </div>
            <AdjustRecipe recipe={this.state.recipe} recipeId={this.props.recipeId}/>
            <RecipeEdit recipe={this.state.recipe} recipeId={this.props.recipeId}/>
      </div>
    )
  }
});

module.exports = {
  RecipeDetailContainer: RecipeDetailContainer
};
