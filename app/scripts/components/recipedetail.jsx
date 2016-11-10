var React = require('react');
var Backbone = require('backbone');
var models = require('../models/recipe');
var AdjustRecipe = require('./adjustrecipe.jsx').AdjustRecipe;

var RecipeDetailContainer = React.createClass({
  getInitialState: function(){
    return {
      recipe: new models.Recipe()
    }
  },
  componentWillMount: function(){
    var recipe = this.state.recipe;
    var recipeId = this.props.recipeId;
    var self = this;
    // console.log(recipeId);
    // console.log(recipe);
    if(!recipe){
      return;
    };

    recipe.set('objectId', recipeId);
    recipe.fetch().then(function(){
      self.setState({recipe: recipe});
    });
  },
  render: function(){
    var recipe = this.state.recipe;
    return (
      <div>
        <div>
          <h1>Recipe Detail</h1>
          <ul className="list-group">
            <li className="list-group-item">{recipe.attributes.title}:</li>
            <li className="list-group-item">{recipe.attributes.servings} serving(s)</li>
            <li className="list-group-item">{recipe.attributes.ingredients}</li>
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

    recipe.set('objectId', recipeId);
    recipe.fetch().then(function(){
      self.setState({recipe: recipe});
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
    // console.log(recipe);
    return (
      <div>
        <h1>Edit Recipe</h1>
        <ul className="list-group">
          <li className="list-group-item">{recipe.attributes.title}:</li>
          <li className="list-group-item">{recipe.attributes.servings} serving(s)</li>
          <li className="list-group-item">{recipe.attributes.ingredients}</li>
        </ul>
      </div>
    );
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
