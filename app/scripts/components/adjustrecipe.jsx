var React = require('react');
var RecipeCollection = require('../models/recipe.js').RecipeCollection;
var models = require('../models/recipe.js');
var RecipeForm = require('./recipeform.jsx').RecipeForm;
var RecipeList = require('./recipelist.jsx').RecipeList;
var RecipeDetailContainer = require('./recipedetail.jsx').RecipeDetailContainer;


// var recipeCollection = new RecipeCollection();

// recipeCollection.add([
//   {
//     title: 'Mashed Potatoes',
//     servingSize: '8',
//     ingredients: [
//       {"name": "potatoes", "unit": "lbs", "unitQty": 2},
//       {"name": "milk", "unit": "cups", "unitQty": 1},
//       {"name": "butter", "unit": "tablespoons", "unitQty": 2}
//     ]
//   }
// ]);

// var Ingredient = React.createClass({
//   render: function(){
//     var recipe = this.props.recipe;
//     // console.log('ingredients', recipe.attributes.ingredients);
//
//     return (
//       <li>{recipe.attributes.ingredients}</li>
//     );
//   }
// });

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
    // var servings = recipe.attributes.servings;
    // console.log(recipe.attributes.servings);
    // console.log('recipe', recipe);
    // console.log('recipeId', recipeId);

    if(!recipeId){
      return;
    };
    //  this.setState({servings: servings});
     ingredients.fetch().then(function(){
       self.setState({ingredients: ingredients});
       // console.log('ingredients will mount', ingredients);
     });
    recipe.set('objectId', recipeId);
    recipe.fetch().then(function(){
      self.setState({recipe: recipe});
    });
  },
  adjustServings: function(newServings){
    var recipe = this.props.recipe;
    // console.log(recipe);
    var factor = this.state.factor;
    var servings = recipe.get('servings');
    // console.log('servings', recipe.get('servings'));
    var newServings = this.state.servings;
    // console.log('newServings', newServings);
    // this.props.recipe.attributes.servings = servings;
    var ingredients = this.state.ingredients;
    // console.log('servings', servings);
    // console.log('factor', factor);
    var newFactor = (newServings / servings ) || 1;
    // console.log('newservings', newServings);

    this.setState({factor: newFactor});
    // console.log('newFactor', newFactor);
  },
  handleServings: function(e){
    var servings = e.target.value;
    this.setState({servings: servings})
    // console.log(servings);
    // this.props.recipe.attributes.servings = servings;
    // this.forceUpdate();
    // console.log(servings);
  },
  handleSubmit: function(e){
    e.preventDefault();
    var ingredients = this.state.ingredients;
    // console.log(ingredients);
    var servings = this.state.servings;
    // console.log(servings);
    this.adjustServings(this.state.ingredients);
  },
  render: function(){
    var recipe = this.props.recipe;
    var servings = recipe.attributes.servings;
    var recipeId = this.props.recipeId;
    var self = this;
    // console.log('recipeId', recipeId);
    var ingredients = this.state.ingredients;
    // console.log('ingredients', ingredients);
    var factor = this.state.factor;
    var ingredientItem = ingredients.map(function(ingredientCollection){
      // console.log('ingredientId', ingredientCollection.id);
      // console.log('recipe id', ingredientCollection.attributes.recipe.objectId);
      // console.log('recipe id', recipeId);
      var adjustedAmount = ingredientCollection.attributes.amount * factor;
      // console.log('adjusted amount', adjustedAmount);
      var amount = parseInt(adjustedAmount) === adjustedAmount ? adjustedAmount : adjustedAmount.toFixed(2);

      if(recipeId === ingredientCollection.attributes.recipe.objectId){
        return (
          <li className="list-group-item" key={ingredientCollection.attributes.name}>{amount} {ingredientCollection.attributes.units} of {ingredientCollection.attributes.name}</li>
        );
      };
    });
    // console.log('servings', recipe.attributes.servings);
    return (
        <div>
          <h1>Adjust Servings:</h1>
          <div className="well">
            <form className="form-inline" onSubmit={this.handleSubmit}>
              <div className="form-group">
                <h3>{recipe.attributes.title}</h3>
                <span><i>Makes </i></span>
                <input className="form-control" id="exampleInputAmount" onChange={this.handleServings} placeholder={recipe.attributes.servings}/>
                <span><i> Servings</i></span>
                <button type="submit" className="btn btn-primary">Adjust Recipe</button>
              </div>

            </form>
            <br></br>
            <ul className="list-group">
              {ingredientItem}
            </ul>
          </div>
        </div>
    );
  }
});


module.exports = {
  AdjustRecipe: AdjustRecipe
};
