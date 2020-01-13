const express = require("express");
const cors = require("cors");

const { find, findById, insert, update, remove } = require("./data/db");

const app = express();

app.use(express.json());

app.use(cors());

app.get("/api/users", (req, res) => {
  // GET all hubs, no extra info needed (id etc)
  find()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(error => {
      res.status(500).json({
        errorMessage: "The users information could not be retrieved."
      });
    });
});

app.get("api/users/:id", (req, res) => {
  const { id } = req.params;
  findById(id)
    .then(data => {
      if (data) {
        res.status(200).json(data);
      } else {
        res
          .status(404)
          .json({ message: "The user with the specified ID does not exist" });
      }
    })
    .catch(error => {
      res.status(500).json({
        errorMessage: "The users information could not be retrieved."
      });
    });
});

app.post("/api/users", (req, res) => {
  const newUser = {
    name: req.body.name,
    bio: req.body.bio
  };

  if (!newUser.name || !newUser.bio) {
    res.status(404).json({
      message: "Please provide name and bio for the user."
    });
  }

  insert(newUser)
    .then(user => {
      res.status(201).json(user);
    })
    .catch(error => {
      res.status(500).json({
        errorMessage: "There was an error while saving the user to the database"
      });
    });
});

app.delete("/api/users/:id", (req, res) => {
  const { id } = req.params;

  remove(id)
    .then(data => {
      if (data) {
        res.status(202).json(`User with id ${data.id} got deleted`);
      } else {
        res.status(404).json({
          message: `User with id ${data.id} does not exist`
        });
      }
    })
    .catch(error => {
      res.status(500).json({
        message: "The user could not be removed."
      });
    });
});

app.put("/hubs/:id", async (req, res) => {
  const { id } = req.params;
  const replacementUser = {
    name: req.body.name,
    bio: req.body.bio
  };

  if (!user.name || !user.bio) {
    res.status(400).json({
      message: "Please provide name and bio for the user."
    });
  }

  try {
    const updatedUser = await update(id, replacementUser);
    if (updatedUser) {
      res.status(200).json(updatedUser);
    } else {
      res.status(404).json({
        message: `The user with the ${id} does not exist.`
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "The user could not be modified."
    });
  }
});

app.get("/", (req, res) => {
  res.json("this is the response");
});

app.listen(6000, () => {
  console.log("listening on 6000");
});
