const express = require("express");
const router = express.Router();
const actionModel = require("../helpers/actionModel");

// GET all actions
router.get("/", (req, res) => {
  actionModel
    .get()
    .then(actions => {
      res.status(200).json(actions);
    })
    .catch(err => {
      res.status(500).json({ error: "The actions could not be retrieved." });
    });
});

// Get action by id
router.get("/:id", (req, res) => {
  actionModel
    .get(req.params.id)
    .then(action => {
      res.status(200).json(action);
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: "The action information could not be retrieved." });
    });
});

// Post action
router.post("/", (req, res) => {
  const { project_id, description, notes } = req.body;
  if (
    !project_id ||
    !notes ||
    !description ||
    project_id != 1 ||
    description.length > 128
  ) {
    //able to hit this
    res
      .status(400)
      .json({
        errorMessage:
          "Please provide existing project ID and a description (less than 128 characters) for the action."
      });
    return;
  }
  actionModel
    .insert({
      project_id,
      description,
      notes
    })
    .then(response => {
      res.status(201).json({ project_id, description, notes });
    })
    .catch(error => {
      res
        .status(500)
        .json({
          error: "There was an error while saving the action to the database"
        });
    });
});

// Update action
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { project_id, description, notes } = req.body;
  if (!project_id || !description) {
    //able to hit this
    res
      .status(400)
      .json({
        errorMessage: "Please provide ID and description for the action."
      });
    return;
  }
  actionModel
    .update(id, { project_id, description, notes })
    .then(response => {
      res.status(200).json({ project_id, description, notes });
    })
    .catch(error => {
      //able to hit this
      res
        .status(500)
        .json({ error: "The action information could not be modified." });
      return;
    });
});

// Delete action
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  actionModel
    .remove(id)
    .then(response => {
      if (!response) {
        //able to hit this
        res
          .status(404)
          .json({
            message: "The action with the specified ID does not exist."
          });
      }
      res.json({ message: "Action removed from system!" });
    })
    .catch(error => {
      res.status(500).json({ error: "The action could not be removed" });
    });
});

module.exports = router;
