// install express and cors (npm packages)
// STEP 1: flesh out a dummy server
// STEP 2: flesh out the five endpoints (will use those helpers)

// imports
const express = require("express"); // commonjs equivalent to "import express from 'express'"
const cors = require("cors");

const { find, findById, insert, update, remove } = require("./data/db");

// instantiate an express app
const app = express();

// plug extra functionality to our app
// we need to be able to read req.body
app.use(express.json());
// we need to enable CORS so this server works for all origins
app.use(cors());

app.get("/api/users", (req, res) => {
  // GET all hubs, no extra info needed (id etc)
  find()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(error => {
      res.status(500).json({
        message: error.message,
        stack: error.stack
      });
    });
});

// app.get("/hubs/:id", (req, res) => {
//   // GET a hub by its id, which is a parameter of the path
//   const { id } = req.params;
//   findById(id)
//     .then(data => {
//       // two things can happen: id exists or not
//       // id exists: we just res.json the data
//       // id does not exist: we just res.json a 404
//       if (data) {
//         res.status(200).json(data);
//       } else {
//         res.status(404).json({ message: "we can not find that hub" });
//       }
//     })
//     .catch(error => {
//       // crashes and such
//       // res.json the error message and stack
//       console.log(error);
//     });
// });

app.post("/api/users", (req, res) => {
  // POST a new hub using the request body
  const newUser = req.body;

  add(newUser)
    .then(user => {
      res.status(201).json(user);
    })
    .catch(error => {
      res.status(500).json({ message: error.message });
    });
});

// app.delete("/hubs/:id", (req, res) => {
//   // DELETE a hub by its id
//   const { id } = req.params;

//   remove(id)
//     .then(data => {
//       if (data) {
//         res.status(202).json(`Hub with id ${data.id} got deleted`);
//       } else {
//         res.status(404).json({
//           message: `Hub with id ${data.id} does not exist`
//         });
//       }
//     })
//     .catch(error => {
//       console.log(error.message);
//     });
// });

// app.put("/hubs/:id", async (req, res) => {
//   // PUT a hub by id using the request body
//   const { id } = req.params;
//   const replacementHub = req.body;

//   // REACT
//   // axios.put('url', { name: 'new name' } )

//   try {
//     const updatedHub = await update(id, replacementHub);
//     if (updatedHub) {
//       res.status(200).json(updatedHub);
//     } else {
//       res.status(404).json({ message: `hub with id ${id} is not here` });
//     }
//   } catch (error) {
//     res.status(500).json(error.message);
//   }
// });

// write a dummy endpoint
app.get("/", (req, res) => {
  // callback takes two args:
  // req -> object from which we can gather all details about the request
  // res -> object with useful methods (for example to respond!!)
  // end() send(ANYTHING) json(JSON)
  res.json("this is the response");
});

// we need code to spin up the server and just have it listen for incoming
app.listen(6000, () => {
  console.log("listening on 6000");
});
