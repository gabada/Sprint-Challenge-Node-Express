const express = require('express');
const db = require('../data/helpers/projectModel.js');

const router = express.Router();

router.post('/', (req, res) => {
  const { name, description } = req.body;
  const newProject = { name, description };
  if (!name || !description) {
    return res.status(400).json({
      errorMessage: 'Please provide a name and description for your project.'
    });
  }
  db.insert(newProject)
    .then(project => {
      res.status(201).json(project);
    })
    .catch(err => {
      res.status(500).json({
        error: 'There was an error while saving the project to the database'
      });
    });
});

router.get('/', (req, res) => {
  db.get()
    .then(projects => {
      res.status(200).json(projects);
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: 'The projects information could not be retrieved.' });
    });
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  db.get(id)
    .then(project => {
      res.status(200).json(project);
    })
    .catch(err => {
      res
        .status(404)
        .json({ error: 'The project with the specified ID does not exist.' });
    });
});

module.exports = router;
