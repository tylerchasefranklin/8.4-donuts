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
        <div>
          <h1>Recipe Detail:</h1>
          <ul className="list-group">
            <li className="list-group-item">{recipe.attributes.title}:</li>
            <li className="list-group-item">{recipe.attributes.servings} serving(s)</li>
            {ingredientItem}
          </ul>
          <AdjustRecipe recipe={this.state.recipe} recipeId={this.props.recipeId}/>
          <RecipeEdit recipe={this.state.recipe} recipeId={this.props.recipeId}/>
        </div>
      </div>
    )
  }
});




// <div>
//   <h1>Recipe Detail</h1>
//   <ul className="list-group">
//     <li className="list-group-item">{recipe.attributes.title}:</li>
//     <li className="list-group-item">{recipe.attributes.servings} serving(s)</li>
//     <li className="list-group-item">{recipe.attributes.ingredients}</li>
//   </ul>
//   <RecipeEdit recipe={this.state.recipe} recipeId={this.props.recipeId}/>
// </div>

module.exports = {
  RecipeDetailContainer: RecipeDetailContainer
};
