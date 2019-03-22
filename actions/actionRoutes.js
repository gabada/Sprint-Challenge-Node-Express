const express = require('express');
const db = require('../data/helpers/actionModel.js');

const router = express.Router();

router.post('/', (req, res) => {
  const { project_id, description, notes, completed } = req.body;
  const newAction = { project_id, description, notes, completed };
  if (!project_id || !description || !notes) {
    return res.status(400).json({
      errorMessage:
        'Please provide a project ID, description, and note for your action.'
    });
  }
  db.insert(newAction)
    .then(action => {
      res.status(201).json(action);
    })
    .catch(err => {
      res.status(500).json({
        error: 'There was an error while saving the action to the database'
      });
    });
});

router.get('/', (req, res) => {
  db.get()
    .then(actions => {
      res.status(200).json(actions);
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: 'The actions information could not be retrieved.' });
    });
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  db.get(id)
    .then(action => {
      res.status(200).json(action);
    })
    .catch(err => {
      res.status(500).json({ error: 'Issue getting action.' });
    });
});

module.exports = router;
