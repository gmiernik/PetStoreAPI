var express = require('express');
var router = express.Router();
var bodyParser = require("body-parser");
const db = require("../db");

router.use(bodyParser.json());

/* GET PetStore API info */
router.get("/", (req, res) => {
  res.status(200).json({ info: `Node.js, Express, and Postgres PetStore API` });
});

//GET Pets
router.get("/pets", db.getPets);

module.exports = router;



/*
const db = require("./db");
const env = db.env;

app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.status(200).json({ info: `Node.js, Express, and Postgres PetStore API in ${env.toUpperCase} environment` });
});
//Pets

//GET Pets
app.get("/api/pets", db.getPets);

//GET Pet by Id

app.get("/api/pets/:id", db.getPetById);

//POST new Pet

app.post("/api/pets", db.createPet);

//PUT/Update Pet by id

app.put('/api/pets/:id', db.updatePet);

//DELETE existing pet by Id

app.delete("/api/pets/:id", db.deletePet);

module.exports = app;
*/