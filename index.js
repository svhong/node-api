const Joi = require("joi");
const helmet = require("helmet");
const morgan = require("morgan");
const logger = require("./logger");
const express = require("express");
const app = express();

// JSON middleware
app.use(express.json());
// app.use(logger);
app.use(express.urlencoded({ extended: true }));
// serve static files from public folder
app.use(express.static('public'));
app.use(helmet());

if (app.get('env') === 'development') {
  // shows info in the terminal regarding requests
  app.use(morgan("tiny"));
}



const fighters = [
  { id: 1, name: "Darren Till" },
  { id: 2, name: "Henry Cejudo" },
  { id: 3, name: "Fabricio Werdum" }
];

app.get("/", (req, res) => {
  res.send("Welcome to Sean's fighter api");
});

app.get("/api/fighters", (req, res) => {
  res.send(fighters);
});

app.get("/api/fighters/:id", (req, res) => {
  const fighter = fighters.find(f => f.id === parseInt(req.params.id));
  if (!fighter) {
    res.status(404).send("The fighter with the given ID was not found");
  }
  res.send(fighter);
});

// POST method
app.post("/api/fighters", (req, res) => {
  // use joi to validate the reqeust body object and compare to the schema we set up
  const { error } = validateFighter(req.body);
  //input validation
  if (error) {
    res.status(400).send(error.details[0].message);
    //kick out of the post
    return;
  }

  const fighter = {
    id: fighters.length + 1, //increase the id value by 1. usually taken care of by database
    name: req.body.name // use the name in the request body to assign
  };
  fighters.push(fighter); // push the fighter into the array of data
  res.send(fighter); // send the fighter data back to the user
});

//PUT method to update db resource
app.put("/api/fighters/:id", (req, res) => {
  //look up the fighter
  const fighter = fighters.find(f => f.id === parseInt(req.params.id));
  // if fighter doesn't exist, return 404
  if (!fighter) {
    return res.status(404).send("The fighter with the given ID was not found");
  }

  // validate
  const { error } = validateFighter(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  // update fighter
  fighter.name = req.body.name;
  //return the updated fighter
  res.send(fighter);
});

app.delete("/api/fighters/:id", (req, res) => {
  // look up the figher
  const fighter = fighters.find(f => f.id === parseInt(req.params.id));
  // if fighter doesn't exist, return 404
  if (!fighter) {
    return res.status(404).send("The fighter with that id was not found");
  }
  // Delete
  const index = fighters.indexOf(fighter);
  fighters.splice(index, 1);

  // Return the same course
  res.send(fighter);
});

// function to validate
function validateFighter(fighter) {
  const schema = {
    name: Joi.string()
      .min(3)
      .required()
  };
  return Joi.validate(fighter, schema);
}

//PORT
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
