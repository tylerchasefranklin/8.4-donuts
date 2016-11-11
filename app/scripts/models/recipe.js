var Backbone = require('backbone');

var ParseModel = Backbone.Model.extend({
  idAttribute: 'objectId',
  save: function(key, val, options){
    delete this.attributes.createdAt;
    delete this.attributes.updatedAt;

    return Backbone.Model.prototype.save.apply(this, arguments);
  }
});

var ParseCollection = Backbone.Collection.extend({
  whereClause: {field: '', className: '', objectId: ''},
  parseWhere: function(field, className, objectId){
    this.whereClause = {
      field: field,
      className: className,
      objectId: objectId,
      '__type': 'Pointer'
    };

    return this;
  },
  url: function(){
    var url = this.baseUrl;

    if (this.whereClause.field){
      var field = this.whereClause.field;
      delete this.whereClause.field;
      url += '?where={"' + field + '":' + JSON.stringify(this.whereClause) + '}';
    }

    return url;
  },
  parse: function(data){
    return data.results;
  }
});

var Ingredient = ParseModel.extend({
  urlRoot: 'https://spider-man.herokuapp.com/classes/Ingredients',
  idAttribute: 'objectId',
  defaults: {
    name: '',
    amount: 0,
    units: ''
  },
});

var IngredientCollection = ParseCollection.extend({
  model: Ingredient,
  url: 'https://spider-man.herokuapp.com/classes/Ingredients',
  parse: function(data){
    // console.log('recipe parse', data);
    return data.results;
  }
});

var Recipe = ParseModel.extend({
  idAttribute: 'objectId',
  urlRoot: 'https://spider-man.herokuapp.com/classes/Recipes',
  defaults: {
    title: '',
    servings: '',
    ingredients: []
  }
});


var RecipeCollection = ParseCollection.extend({
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
