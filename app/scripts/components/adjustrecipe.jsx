var React = require('react');
var RecipeCollection = require('../models/recipe.js').RecipeCollection;


var recipeCollection = new RecipeCollection();

recipeCollection.add([
  {
    title: 'Mashed Potatoes',
    servingSize: '8',
    ingredients: [
      {"name": "potatoes", "unit": "lbs", "unitQty": 2},
      {"name": "milk", "unit": "cups", "unitQty": 1},
      {"name": "butter", "unit": "tablespoons", "unitQty": 2}
    ]
  }
])

var Ingredient = React.createClass({
  render: function(){
    var ingredients = this.props.ingredients; // []

    // console.log('ingredients', ingredients);
    // var ingredientCollection = ingredients.map(function(ingredient){
    //   console.log(ingredient);
    //   return (
    //     <div>
    //       {ingredient}
    //     </div>
    //   )
    // });
    return (
      <ul>
        {ingredients.map(function(ingredient){
            return(
              <li key={ingredient.name}>{ingredient.unitQty} {ingredient.unit} {ingredient.name}</li>
            );
          })
        }
      </ul>
    );
  }
});

var AdjustRecipe = React.createClass({

  render: function(){

    console.log('collection', recipeCollection);
    var collection = recipeCollection.map(function(recipe){
      return (
        <Ingredient key={recipe.cid} ingredients={recipe.get('ingredients')} />
      );
    });
    return (
      <div className="container">
        <div className="row">
          <h1>Recipe Time!</h1>
          <div className="well">
            <form className="form-inline">
              <div className="form-group">
                <span><i>Makes</i></span>
                <input type="text" className="form-control" id="exampleInputAmount" placeholder='serving size' />
                <span><i>Servings</i></span>
              </div>
              <button type="submit" className="btn btn-primary">Adjust Recipe</button>
            </form>
            <ul>
              {collection}
            </ul>

          </div>
        </div>
      </div>
    )
  }
});


module.exports = {
  AdjustRecipe: AdjustRecipe
};
