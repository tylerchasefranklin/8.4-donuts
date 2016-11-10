var Backbone = require('backbone');

var Ingredient = Backbone.Model.extend({
  urlRoot: 'https://spider-man.herokuapp.com/classes/Ingredients',
  idAttribute: 'objectId',
  defaults: {
    name: '',
    amount: 0,
    units: ''
  },
});

var IngredientCollection = Backbone.Collection.extend({
  model: Ingredient,
  url: 'https://spider-man.herokuapp.com/classes/Ingredients',
  parse: function(data){
    console.log('recipe parse', data);
    return data.results;
  }
});

var Recipe = Backbone.Model.extend({
  idAttribute: 'objectId',
  urlRoot: 'https://spider-man.herokuapp.com/classes/Recipes',
  defaults: {
    title: '',
    servings: 0,
    ingredients: []
  }
});


var RecipeCollection = Backbone.Collection.extend({
  model: Recipe,
  url: 'https://spider-man.herokuapp.com/classes/Recipes',
  parse: function(data){
    // console.log('recipe parse', data);
    return data.results;
  }
});



module.exports = {
  Ingredient: Ingredient,
  IngredientCollection: IngredientCollection,
  Recipe: Recipe,
  RecipeCollection: RecipeCollection
};
