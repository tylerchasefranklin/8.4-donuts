var Backbone = require('backbone');


var Recipe = Backbone.Model.extend({
  idAttribute: 'objectId',
  defaults: {
    title: '',
    servingSize: '',
    ingredients: []
  }
});


var RecipeCollection = Backbone.Collection.extend({
  model: Recipe,
  url: 'https://spider-man.herokuapp.com/classes/Recipes',
  parse: function(data){
    console.log('recipe parse', data);
    return data.results;
  }
});



module.exports = {
  Recipe: Recipe,
  RecipeCollection: RecipeCollection
};
