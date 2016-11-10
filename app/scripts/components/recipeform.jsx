var React = require('react');
var models = require('../models/recipe');
var $ = require('jquery');

// var IngredientForm = React.createClass({
//   getInitialState: function(){
//     return {
//       ingredient: new models.Ingredient(),
//       recipe: new models.Recipe()
//     };
//   },
//   handleAmount: function(e){
//     var amount = e.target.value;
//     // console.log(amount);
//     this.setState({amount: amount});
//   },
//   handleUnits: function(e){
//     var units = e.target.value;
//     // console.log(units);
//     this.setState({units: units});
//   },
//   handleName: function(e){
//     var name = e.target.value;
//     // console.log(name);
//     this.setState({name: name});
//   },
//   render: function(){
//     return (
//       <div className="col-sm-10">
//         <div id="ingredients" className="form-group">
//           <label className="" htmlFor="ingredient-amount">Amount:</label>
//           <input onChange={this.handleAmount} type="text" className="form-control" name="amount" id="ingredient-amount" placeholder="Amount" value={this.state.amount} />
//         </div>
//         <div className="form-group">
//           <label className="" htmlFor="ingredient-units">Units:</label>
//           <input onChange={this.handleUnits} type="text" className="form-control" name="units" id="ingredient-units" placeholder="Units" value={this.state.units} />
//         </div>
//         <div className="form-group">
//           <label className="" htmlFor="ingredient-name">Name:</label>
//           <input onChange={this.handleName} type="text" className="form-control" name="name" id="ingredient-name" placeholder="Name" value={this.state.name} />
//         </div>
//       </div>
//     );
//   }
// });

var Form = React.createClass({
  getInitialState: function(){
    return {
      recipe: new models.Recipe(),
      ingredients: new models.IngredientCollection()
    }
  },
  handleTitle: function(e){
    var title = e.target.value;
    // console.log(title);
    this.setState({title: title});
  },
  handleServings: function(e){
    var servings = e.target.value;
    // console.log(servings);
    this.setState({servings: servings});
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
  handleSubmit: function(e){
    e.preventDefault();
    console.log('you made a new recipe!');
    // var ingredient = this.state.ingredient;
    // console.log('ingredient', ingredient);
    var recipeData = {
      title: this.state.title,
      servings: this.state.servings,
    };
    var ingredientData = {
      amount: this.state.amount,
      units: this.state.units,
      name: this.state.name
    };
    // console.log(ingredientData);
    this.addIngredient(ingredientData);
    this.makeNewRecipe(recipeData);
    // console.log(recipeData);
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
  //   var reponse = $.post('https://spider-man.herokuapp.com/classes/Ingredients', ingredientData).then(function(response){
  //     // console.log('test', response);
  //     // console.log(response);
  //     // console.log(ingredientData);
  //     // localStorage.setItem('username', response.username);
  //     // localStorage.setItem('token', response.sessionToken);
  //  });
  },
  makeNewRecipe: function(recipeData){
    var recipe = this.state.recipe;
    var ingredients = this.state.ingredients;
    console.log('ingredients', ingredients);
    console.log('recipe', recipe);
    var data = {
      'title': recipeData.title,
      'servings': recipeData.servings,
    };

    console.log(data);


    // Maybe add route here
    recipe.set(data);
    recipe.save().then(function(){
      ingredients.each(function(ingredient){
        ingredient.set('recipe', {"__type":"Pointer","className":"Recipes","objectId":recipe.get('objectId')});
        ingredient.save();
      });
    });


  //   var reponse = $.post('https://spider-man.herokuapp.com/classes/Recipes', data).then(function(response){
  //     // console.log('test', response);
  //     // console.log(response);
  //     // console.log(data);
  //     // localStorage.setItem('username', response.username);
  //     // localStorage.setItem('token', response.sessionToken);
  //  });
  },
  render: function(){
    var recipe = this.props.recipe;
    // var ingredients = recipe.get('ingredients').map(function(ingredient){
    //   return (
    //
    //   )
    // });
    return (
      <form className="form-horizontal" onSubmit={this.handleSubmit}>
        <div className="form-group">
          <label htmlFor="recipe-title" className="col-sm-2 control-label">Recipe Title</label>
          <div className="col-sm-10">
            <input type="text" value={this.state.title} onChange={this.handleTitle} className="form-control" id="recipe-title" placeholder="Title" />
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="recipe-servings" className="col-sm-2 control-label">Amount of Servings</label>
          <div className="col-sm-10">
            <input type="text" value={this.state.servings} onChange={this.handleServings} className="form-control" id="recipe-servings" placeholder="Amount of Servings" />
          </div>
        </div>
        <h2>Ingredients <button type="button" onClick={this.addIngredient} className="pull-right btn btn-success">Add Ingredient</button></h2>

        <div className="form-group">
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
          </div>
        </div>

        <div className="form-group">
          <div className="col-sm-offset-2 col-sm-10">
            <button type="submit" className="btn btn-success">Submit Recipe!</button>
          </div>
        </div>
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
      <div>
        <h1>Submit Your Own Recipe!</h1>
        <Form  recipe={this.state.recipe} />
      </div>
    )
  }
});




// recipe.set('name', 'Pudding');
// recipe.set('ingredient', {"__type":"Pointer","className":"User","objectId": user.get('objectId')});
// ingredients.add({amount: 1, units: 'cups', name: 'milk'});
// recipe.save().then(function(){
//   ingredients.each(function(ingredient){
//     ingredient.set('recipe', {"__type":"Pointer","className":"Recipe","objectId":recipe.get('objectId')});
//     ingredient.save();
//   });
// });

module.exports = {
  RecipeAddEditForm: RecipeAddEditForm,
};
