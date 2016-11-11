var React = require('react');
var Backbone = require('backbone');
var models = require('../models/recipe');
var AdjustRecipe = require('./adjustrecipe.jsx').AdjustRecipe;

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

var RecipeEdit = React.createClass({
  getInitialState: function(){
    return {
      recipe: new models.Recipe(),
      ingredients: new models.IngredientCollection()
    };
  },
  componentWillMount: function(){
    var recipe = this.props.recipe;
    var recipeId = this.props.recipeId;
    var self = this;
    var ingredients = this.state.ingredients;
    // console.log('recipe', recipe);
    // console.log('recipeId', recipeId);

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
  // },
  // componentWillReceiveProps: function(){
  //   this.getRecipe();
  // },
  // getRecipe: function(){
  //   var recipe = this.props.recipe;
  //   var recipeId = this.props.recipeId;
  //   var self = this;
  //   console.log('recipe', recipe);
  //   console.log('recipeId', recipeId);
  //
  //   if(!recipeId){
  //     return;
  //   };

    // recipe.set('objectId', recipeId);
    // recipe.fetch().then(function(){
    //   self.setState({recipe: recipe});
    // });
  // },
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
    // console.log(recipe);
    return (
      <div>
        <h1>Edit Recipe:</h1>
        <h2>{recipe.attributes.title}</h2>
        <ul className="list-group">
          {ingredientItem}
        </ul>
        <h5>Add Ingredient: <button type="button" onClick={this.props.addIngredient} className="pull-right btn btn-success">Add Ingredient</button></h5>
        <IngredientForm recipe={this.props.recipe} ingredients={this.state.ingredients}/>
      </div>
    );
  }
});

var IngredientForm = React.createClass({
  getInitialState: function(){
    return {
      recipe: new models.Recipe(),
      ingredients: new models.IngredientCollection()
    };
  },
  componentWillMount: function(){
    var recipe = this.props.recipe;
    console.log(recipe);
    var ingredients = this.props.ingredients;
    console.log(ingredients);
  },
  handleAmount: function(e){
    var amount = e.target.value;
    this.setState({amount: amount});
    // console.log({amount: amount});
  },
  handleUnits: function(e){
    var units = e.target.value;
    // console.log({units: units});
    this.setState({units: units});
  },
  handleName: function(e){
    var name = e.target.value;
    // console.log(name);
    this.setState({name: name});
  },
  addIngredient: function(){

  },
  render: function(){
    return (
      <div className="col-sm-10">
        <div id="ingredients" className="form-group">
          <label className="" htmlFor="ingredient-amount">Amount:</label>
          <input onChange={this.handleAmount} type="text" className="form-control" name="amount" id="ingredient-amount" placeholder="Amount"  />
        </div>
        <div className="form-group">
          <label className="" htmlFor="ingredient-units">Units:</label>
          <input onChange={this.handleUnits} type="text" className="form-control" name="units" id="ingredient-units" placeholder="Units"  />
        </div>
        <div className="form-group">
          <label className="" htmlFor="ingredient-name">Name:</label>
          <input onChange={this.handleName} type="text" className="form-control" name="name" id="ingredient-name" placeholder="Name"  />
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
