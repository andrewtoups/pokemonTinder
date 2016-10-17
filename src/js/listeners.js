//event listeners:
var addListeners = {
  init: function(){
    $('body')
      .on('click', '#idek', function(){
        utils.loader.show();
        utils.grabPokemon(function(pokemon){
          console.log(pokemon);
        });
      });
  }
};

addListeners.init();
