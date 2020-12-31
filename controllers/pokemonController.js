

const axios = require("axios");

class PokemonController {
    constructor(pokemonService) {
        this.pokemonService = pokemonService;
    }

    async getPokemons(req, res) {
        console.log(req.query);
        const {limit, page} = req.query;
        const offset =  limit * (page - 1);
        console.log(offset)
        const pokemonList = await this.pokemonService.getPokemon(limit, offset);
        console.log(pokemonList, "lista controller");
        res.json(pokemonList)
    }

   async postPokemon(req, res) {
        console.log(req.body, req.file);
        const { name } = req.body;
        const { file } = req.file;
        const data = {
            "name" : req.body.poke_name,
            "image" : req.file.filename
        }

        const savePokemon = await this.pokemonService.postPokemon(data);
        res.send(savePokemon);

    }

    async editPokemon(req, res) {

        const { pokeName } = req.param;
        const apiData = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokeName}`);
        const data = {
            "id" : apiData.id,
            "height" : apiData.height,
            "weight" :  apiData.weight,
            "type" : apiData.types.type.name
        }

        const editPokemon = await this.pokemonService.editPokemon(pokeName, data);
        res.json(editedPokemon);

    }

    async deletePokemon(req, res) {

        res.send('Pokemon borrado con exito');
    }
}


module.exports = PokemonController;