// constructors
function Pokemon(data, locations){
  this.name = data.name;
  this.picURL = data.sprites.front_default;
  this.moves = utils.getNames(data.moves, 'move');
  this.species = data.species.name;
  this.types = utils.getNames(data.types, 'type');
  this.id = data.id;
  this.locations = locations;
}

Pokemon.prototype = {

};

function PokemonViewer(Pokemon){

}
