const express = require('express');
const router = express.Router();
const multer = require("multer");
const pokemonModel = require('../models/pokemonModel');
const PokemonController = require("./../controllers/pokemonController");
const PokemonService = require('./../services/pokemonService')
const PokemonInstance = new PokemonController(new PokemonService());

const storage = multer.diskStorage({
 destination: function (req, file, cb) {
 cb(null, "./uploads");
 },
 filename: function (req, file, cb) {
 cb(null, file.fieldname + "-" + Date.now() + ".png");
 },
});
const upload = multer({ storage: storage });

/* GET home page. */
router.get('/', function(req, res, next) {
    res.send("hola pokeApi")
});

  /* GET Pokemon List. */
  router.get('/pokemons', function(req, res, next) {
    console.log(req.query);
    PokemonInstance.getPokemons(req, res);

  });

router.post('/create', upload.single("poke"), function(req, res, next) {
  PokemonInstance.postPokemon(req,res);
  });

router.put('/edit/:pokeName', function (req, res, next) {
  PokemonInstance.editPokemon(req, res);
})
 
router.delete('/delete/:pokeName', function (req, res, next) {
  PokemonInstance.deletePokemon(req, res);
})



module.exports = router;
