const Pokemon =  require("./../models/pokemonModel");

class PokemonService {
    
    async getPokemon(limit, offset) {
        const query = await Pokemon.find().skip(offset).limit(Number(limit)).exec();
        console.log(query);
        return query;
    }

    postPokemon(pokemon) {
        const newPokemon = new Pokemon(pokemon);
        return newPokemon.save();
    }

    editPokemon(name, data) {

        const editedPokemon = Pokemon.findOneAndUpdate({name : name}, data).exec();
        return editedPokemon;

    }

}

module.exports = PokemonService;