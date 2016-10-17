var utils = {

  API: function (type, query){
    query = query || '';
    var url = 'http://pokeapi.co/api/v2/';

    switch (type) {
      case 'pokemon':
        url += type + '/' + query;
        break;
      case 'encounters':
        url += 'pokemon/' + query + '/' + type;
      break;
      default:
        url = '';
        break;
    }

    var settings = {
      type: 'GET',
      url: url,
      datatype: 'jsonP',
      async: true
    };

    return settings;
  },

  template: function(source, context){
    source = $(source).html();
    var template = Handlebars.compile(source);
    context = {} || context;
    var html = template(context);
    return html;
  },

  loader: {
    isLoading: false,
    show: function(){
      this.isLoading = true;
      var icon = utils.template('#pokeloading');
      $(icon).appendTo('main').hide().fadeIn();
    },
    hide: function(){
      this.isLoading = false;
      $('.loader').fadeOut(function(){
        this.remove();
      });
    }
  },

  grabPokemon: function(callback){
    callback = callback || function(){};
    var randomId = Math.floor(Math.random()*811);
    $.ajax(utils.API('pokemon', randomId)).done(function(response){
      console.log(response);
      var locations;
      utils.getLocations(randomId, function(locations){
        utils.loader.hide();
        callback(new Pokemon(response, locations));
      });
    });
  },

  getLocations: function(id, callback){
    callback = callback || function(){};
    var locations;
    $.ajax(utils.API('encounters', id)).done(function(response){
      locations = utils.getNames(response, 'location_area');
      callback(locations);
    });
  },

  getNames: function(array, keyname){
    var names = [];
    for (var index = 0; index < array.length; index++){
      names.push(array[index][keyname].name);
    }
    return names;
  },

};
