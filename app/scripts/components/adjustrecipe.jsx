var React = require('react');
var RecipeCollection = require('../models/recipe.js').RecipeCollection;
var models = require('../models/recipe.js');
var RecipeForm = require('./recipeform.jsx').RecipeForm;
var RecipeList = require('./recipelist.jsx').RecipeList;
var RecipeDetailContainer = require('./recipedetail.jsx').RecipeDetailContainer;


var AdjustRecipe = React.createClass({
  getInitialState: function(){
    return {
      factor: 1,
      // servings: 0,
      recipe: new models.Recipe(),
      ingredients: new models.IngredientCollection()
    };
  },
  componentWillMount: function(){
    var recipe = this.props.recipe;
    var recipeId = this.props.recipeId;
    var self = this;
    var ingredients = this.state.ingredients;

    if(!recipeId){
      return;
    };
     ingredients.fetch().then(function(){
       self.setState({ingredients: ingredients});
     });
    recipe.set('objectId', recipeId);
    recipe.fetch().then(function(){
      self.setState({recipe: recipe});
    });
  },
  adjustServings: function(newServings){
    var recipe = this.props.recipe;
    var factor = this.state.factor;
    var servings = recipe.get('servings');
    var newServings = this.state.servings;
    var ingredients = this.state.ingredients;
    var newFactor = (newServings / servings ) || 1;
    this.setState({factor: newFactor});
  },
  handleServings: function(e){
    var servings = e.target.value;
    this.setState({servings: servings})
  },
  handleSubmit: function(e){
    e.preventDefault();
    var ingredients = this.state.ingredients;
    var servings = this.state.servings;
    this.adjustServings(this.state.ingredients);
  },
  render: function(){
    var recipe = this.props.recipe;
    var servings = recipe.attributes.servings;
    var recipeId = this.props.recipeId;
    var self = this;
    var ingredients = this.state.ingredients;
    var factor = this.state.factor;
    var ingredientItem = ingredients.map(function(ingredientCollection){
      var adjustedAmount = ingredientCollection.attributes.amount * factor;
      var amount = parseInt(adjustedAmount) === adjustedAmount ? adjustedAmount : adjustedAmount.toFixed(2);

      if(recipeId === ingredientCollection.attributes.recipe.objectId){
        return (
          <li className="list-group-item" key={ingredientCollection.attributes.name}>{amount} {ingredientCollection.attributes.units} of {ingredientCollection.attributes.name}</li>
        );
      };
    });
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h1>Adjust Servings:</h1>
            <div className="well col-md-8">
              <form className="form-inline" onSubmit={this.handleSubmit}>
                <div className="form-group">
                  <h3>{recipe.attributes.title}</h3>
                  <span><i>Makes </i></span>
                  <input className="form-control" id="exampleInputAmount" onChange={this.handleServings} placeholder={recipe.attributes.servings}/>
                  <span><i> Servings</i></span>
                    <br></br>
                    <br></br>
                    <ul className="list-group">
                      {ingredientItem}
                    </ul>
                  <button type="submit" className="btn btn-primary">Adjust Recipe</button>
                </div>

              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
});


module.exports = {
  AdjustRecipe: AdjustRecipe
};
