var React = require('react');
var models = require('../models/recipe')
var $ = require('jquery');



var RecipeForm = React.createClass({
  getInitialState: function(){
    return {
      recipe: new models.Recipe(),
    };
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
  handleIngredients: function(e){
    var ingredients = e.target.value;
    // console.log(ingredients);
    this.setState({ingredients: ingredients});
  },
  handleSubmit: function(e){
    e.preventDefault();
    console.log('you made a new recipe!');
    var recipeData = {
      title: this.state.title,
      servings: this.state.servings,
      ingredients: this.state.ingredients
    };

    this.makeNewRecipe(recipeData);
    console.log(recipeData);
    this.setState({title: '', servings: '', ingredients: ''});
  },
  makeNewRecipe: function(recipeData){
    var data = {
      'title': recipeData.title,
      'servings': recipeData.servings,
      'ingredients': recipeData.ingredients
    };
    var reponse = $.post('https://spider-man.herokuapp.com/classes/Recipes', data).then(function(response){
      console.log('test', response);
      // console.log(response);
      console.log(data);
      // localStorage.setItem('username', response.username);
      // localStorage.setItem('token', response.sessionToken);
   });
  },
  render: function(){
    return (
      <div>
        <form className="form-horizontal" onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="recipe-title" className="col-sm-2 control-label">Recipe Title</label>
            <div className="col-sm-10">
              <input type="text" value={this.state.title} onChange={this.handleTitle} className="form-control" id="recipe-title" placeholder="Title" />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="recipe-ingredients" className="col-sm-2 control-label">Recipe Ingredients</label>
            <div className="col-sm-10">
              <input type="text" value={this.state.ingredients} onChange={this.handleIngredients} className="form-control" id="recipe-ingredients" placeholder="Ingredients" />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="recipe-servings" className="col-sm-2 control-label">Amount of Servings</label>
            <div className="col-sm-10">
              <input type="text" value={this.state.servings} onChange={this.handleServings} className="form-control" id="recipe-servings" placeholder="Amount of Servings" />
            </div>
          </div>
          <div className="form-group">
            <div className="col-sm-offset-2 col-sm-10">
              <button type="submit" className="btn btn-success">Submit Recipe!</button>
            </div>
          </div>
        </form>
      </div>
    )
  }
});




module.exports = {
  RecipeForm: RecipeForm,
};
