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

var Ingredient = React.createClass({
  render: function(){
    var recipe = this.props.recipe;
    // console.log('ingredients', recipe.attributes.ingredients);

    return (
      <li>{recipe.attributes.ingredients}</li>
    );
  }
});

var AdjustRecipe = React.createClass({
  getInitialState: function(){
    return {
      factor: 1,
      servings: 0,
      recipe: new models.Recipe()
    };
  },
  componentWillMount: function(){
    var recipe = this.props.recipe;
    var recipeId = this.props.recipeId;
    var self = this;
    // console.log('recipe', recipe);
    // console.log('recipeId', recipeId);

    if(!recipeId){
      return;
    };
     this.setState({servings: this.props.recipe.attributes.servings})
    // recipe.set('objectId', recipeId);
    // recipe.fetch().then(function(){
    //   self.setState({recipe: recipe});
    // });
  },
  handleServings: function(e){
    var servings = e.target.value;
    // console.log(servings);
    this.props.recipe.attributes.servings = servings;
    this.forceUpdate();
  },
  handleSubmit: function(e){
    e.preventDefault();

  },
  render: function(){
    var recipe = this.props.recipe;
    // console.log('servings', recipe.attributes.servings);
    return (
        <div>
          <h1>Recipe Time!</h1>
          <div className="well">
            <form className="form-inline" onSubmit={this.handleSubmit}>
              <div className="form-group">
                <h3>{recipe.attributes.title}</h3>
                <span><i>Makes </i></span>
                <input type="text" className="form-control" id="exampleInputAmount" onChange={this.handleServings} value={this.props.recipe.attributes.servings} />
                <span><i> Servings</i></span>
                <button type="submit" className="btn btn-primary">Adjust Recipe</button>
              </div>

            </form>
            <ul>
              <Ingredient recipe={this.props.recipe}/>
            </ul>
          </div>
        </div>
    );
  }
});


module.exports = {
  AdjustRecipe: AdjustRecipe
};
