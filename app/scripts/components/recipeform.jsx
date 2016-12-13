var React = require('react');
var models = require('../models/recipe');
var $ = require('jquery');
var Backbone = require('backbone');
var User = require('../models/user').User;


var RecipeForm = React.createClass({
  getInitialState: function(){
    return {
      recipe: new models.Recipe(),
      ingredients: new models.IngredientCollection()
    }
  },
  handleTitle: function(e){
    var title = e.target.value;
    this.setState({title: title});
  },
  handleServings: function(e){
    var servings = e.target.value;
    this.setState({servings: servings});
  },
  handleAmount: function(e){
    var amount = e.target.value;
    this.setState({amount: amount});
  },
  handleUnits: function(e){
    var units = e.target.value;
    this.setState({units: units});
  },
  handleName: function(e){
    var name = e.target.value;
    this.setState({name: name});
  },
  handleSubmit: function(e){
    e.preventDefault();
    var recipeData = {
      title: this.state.title,
      servings: this.state.servings,
    };
    var ingredientData = {
      amount: this.state.amount,
      units: this.state.units,
      name: this.state.name
    };
    this.addIngredient(ingredientData);
    this.makeNewRecipe(recipeData);
    this.setState({title: '', servings: '', amount: '', units: '', name: ''});
  },
  addIngredient: function(ingredientData){
    var ingredients = this.state.ingredients;
    var ingredientData = {
      'amount': this.state.amount,
      'units': this.state.units,
      'name': this.state.name
    };
    ingredients.set(ingredientData);
  },
  makeNewRecipe: function(recipeData){
    var recipe = this.state.recipe;
    var user = User.current();
    var ingredients = this.state.ingredients;
    var data = {
      'title': recipeData.title,
      'servings': recipeData.servings,
    };


    // Maybe add route here
    recipe.set(data);
    recipe.set('user', {"__type":"Pointer","className":"_User","objectId":(user.get("objectId"))});
    recipe.save().then(function(){
      ingredients.each(function(ingredient){
        ingredient.set('recipe', {"__type":"Pointer","className":"Recipes","objectId":recipe.get('objectId')});
        ingredient.save();
      });
    });
  },
  render: function(){
    var recipe = this.props.recipe;
    return (
      <form className="form-horizontal" onSubmit={this.handleSubmit}>
        <div className="form-group">
          <label htmlFor="recipe-title" className="col-md-2 control-label">Recipe Title:</label>
          <div className="col-md-4">
            <input type="text" value={this.state.title} onChange={this.handleTitle} className="form-control" id="recipe-title" placeholder="Title" />
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="recipe-servings" className="col-md-2 control-label">Amount of Servings:</label>
          <div className="col-md-4">
            <input type="text" value={this.state.servings} onChange={this.handleServings} className="form-control" id="recipe-servings" placeholder="Amount of Servings" />
          </div>
        </div>
        <br></br>
        <br></br>
        <h4 className="col-md-offset-1">First Ingredient:</h4>
        <div id="ingredients">
          <div className="form-group">
            <label className="col-md-2 control-label" htmlFor="ingredient-amount">Amount:</label>
            <div className="col-md-4">
              <input onChange={this.handleAmount} type="text" className="form-control" name="amount" id="ingredient-amount" placeholder="Amount" value={this.state.amount} />
            </div>
          </div>
          <div className="form-group">
            <label className="col-md-2 control-label" htmlFor="ingredient-units">Units:</label>
            <div className="col-md-4">
              <input onChange={this.handleUnits} type="text" className="form-control" name="units" id="ingredient-units" placeholder="Units" value={this.state.units} />
            </div>
          </div>
          <div className="form-group">
            <label className="col-md-2 control-label" htmlFor="ingredient-name">Name:</label>
            <div className="col-md-4">
              <input onChange={this.handleName} type="text" className="form-control" name="name" id="ingredient-name" placeholder="Name" value={this.state.name} />
            </div>
          </div>
        </div>
        <button type="submit" className="btn btn-success">Submit Recipe!</button>
      </form>
    )
  }
})

var RecipeAddEditForm = React.createClass({
  getInitialState: function(){
    return {
      recipe: new models.Recipe(),
      ingredients: new models.IngredientCollection()
    };
  },

  render: function(){
    return (
      <div className="col-md-12">
        <h1 className="recipe-form-heading">Submit Your Own Recipe!</h1>
        <RecipeForm  recipe={this.state.recipe} />
      </div>
    )
  }
});


module.exports = {
  RecipeAddEditForm: RecipeAddEditForm,
};
