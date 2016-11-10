var React = require('react');
var models = require('../models/recipe');
var $ = require('jquery');
var RecipeAddEditForm = require('./recipeform.jsx').RecipeAddEditForm;

var RecipeList = React.createClass({
  getInitialState: function(){
    return  {
      recipeCollection: new models.RecipeCollection()
    };
  },
  componentWillMount: function(){
    var self = this;
    var recipeCollection = this.state.recipeCollection;
    // var url = 'https://spider-man.herokuapp.com/classes/Recipes';
    var recipeList = recipeCollection.fetch().then(function(data){
      // console.log(data.results);
      self.setState({recipeCollection: data.results})
    });
  },
  render: function(){
    var recipeCollection = this.state.recipeCollection;
    var recipes = recipeCollection.map(function(recipe){
      return (
        <p className="list-group-item" key={recipe.title}><a href={'#recipes/' + recipe.objectId + '/'}>{recipe.title}</a></p>
      )
    });
    return (
      <div className="col-md-12">
        <div>
          <p>Recipes</p>
          <div className="list-group">
            {recipes}
          </div>
        </div>
        <RecipeAddEditForm />
      </div>
    )
  }
});

module.exports = {
  RecipeList: RecipeList
};
