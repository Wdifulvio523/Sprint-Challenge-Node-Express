const express = require("express");
const router = express.Router();
const projectModel = require("../helpers/projectModel");


// GET all projects
router.get("/", (req, res) => {
    projectModel
      .get()
      .then(projects => {
        res.status(200).json(projects);
      })
      .catch(err => {
        res.status(500).json({ error: "The projects could not be retrieved." });
      });
  });


//Get projects by id
router.get("/:id", (req, res) => {
    projectModel
      .get(req.params.id)
      .then(project => {
        res.status(200).json(project);
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: "The project information could not be retrieved." });
      });
  });

// Insert project
router.post('/', (req, res) => {
    const { name, description } = req.body;
    if (!name || !description || name.length > 128) { //able to hit this
        res.status(400).json({errorMessage: "Please provide name (less than 128 characters) and description for the project."})
        return;
    }
    projectModel
        .insert({
            name, description,
        })
        .then(response => {
            res.status(201).json({name, description, });
        })
        .catch(error => {
            res.status(500).json({error: "There was an error while saving the project to the database" })
        })
});


//Update project
router.put('/:id', (req, res) => {
    const {id} = req.params;
    const {name, description  } = req.body;
    if (!name || !description) { //able to hit this
        res.status(400).json({errorMessage: "Please provide name and description for the project."})
        return;
    } 
    projectModel
    .update(id, {name, description })
    .then(response => {
        res.status(200).json({name, description })
    })
    .catch(error => { //able to hit this
        res.status(500).json({error: "The project information could not be modified."})
        return;
    });
});

//Delete project
router.delete('/:id', (req, res) => {
    const {id} = req.params;
    projectModel
    .remove(id)
    .then(response => {
        if (!response) { //able to hit this
            res
            .status(404)
            .json({message: "The project with the specified ID does not exist."})
        }
        res
        .json({message:'Project removed from system!'})
    })
        .catch(error => {
            res
            .status(500)
            .json({error: "The project could not be removed"})
        })
});


// get all actions for project

router.get('/:id/actions', (req, res) => {
    projectModel
    .getProjectActions(req.params.id)
    .then(actions => {
        if (actions.length === 0) { //able to hit this
            res
            .status(404)
            .json({message: "There are no actions for this project"})
        }
        res
        .status(200)
        .json(actions);
    })
    .catch(err => {
        res
        .status(500)
        .json({error: "The project's actions coult not be retrieved. Sorry!"})
    })
})


module.exports = router;