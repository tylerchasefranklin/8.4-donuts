var React = require('react');
var Backbone = require('backbone');
var models = require('../models/recipe');

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
        <IngredientForm recipe={this.props.recipe} ingredients={this.state.ingredients} recipeId={this.props.recipeId}/>
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
    // console.log(recipe);
    var ingredients = this.props.ingredients;
    // console.log(ingredients);
    var recipeId = this.props.recipeId;
    // console.log(recipeId);
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
  addIngredient: function(data){
    console.log('data', data);

    var ingredients = new models.IngredientCollection();
    ingredients.create(data);

  },
  saveRecipe: function(recipeData){
    // console.log(this.state.ingredients);
    // console.log(this.props.ingredients);
    var recipeId = this.props.recipeId;
    var ingredientData = {
      'amount': this.state.amount,
      'units': this.state.units,
      'name': this.state.name,
      'recipe': {"__type":"Pointer","className":"Recipes","objectId":recipeId}
    };
    // ingredientData.set('recipe', {"__type":"Pointer","className":"Recipes","objectId":recipeId});
    // var recipe = this.props.recipe;
    var ingredients = this.props.ingredients;
    this.addIngredient(ingredientData);
    //
    // recipe.set();
    //
    // recipe.save();
    // console.log('recipe', recipe);
    // // console.log('ingredients', ingredients);
    this.setState({amount: '', units: '', name: ''});
  },
  render: function(){
    return (
      <div className="col-sm-10">
        <div id="ingredients" className="form-group">
          <label className="" htmlFor="ingredient-amount">Amount:</label>
          <input onChange={this.handleAmount} type="text" className="form-control" name="amount" id="ingredient-amount" placeholder="Amount" value={this.state.amount} />
        </div>
        <div className="form-group">
          <label className="" htmlFor="ingredient-units">Units:</label>
          <input onChange={this.handleUnits} type="text" className="form-control" name="units" id="ingredient-units" placeholder="Units" value={this.state.units} />
        </div>
        <div className="form-group">
          <label className="" htmlFor="ingredient-name">Name:</label>
          <input onChange={this.handleName} type="text" className="form-control" name="name" id="ingredient-name" placeholder="Name" value={this.state.name} />
        </div>
        <button type="button" onClick={this.saveRecipe} className="pull-right btn btn-success">Add Ingredient</button>
      </div>
    )
  }
});


module.exports = {
  RecipeEdit: RecipeEdit
};
