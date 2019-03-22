const express = require('express');
const db = require('../data/helpers/projectModel.js');

const router = express.Router();

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
