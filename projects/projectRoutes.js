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

router.get('/projectAction/:id', (req, res) => {
  const { id } = req.params;
  db.getProjectActions(id)

    .then(project => {
      console.log(project.length);
      if (project.length > 1) {
        res.status(200).json(project);
      } else {
        res.status(404).json({ error: 'prohect not found' });
      }
    })

    .catch(err => {
      res
        .status(404)
        .json({ error: 'The project with the specified ID does not exist.' });
    });
});

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { name, description, completed } = req.body;
  const updatedInfo = { name, description, completed };
  if (!name || !description) {
    res.status(400).json({
      errorMessage: 'Please provide name and description for the project.'
    });
  }
  db.get(id)
    .then(project => {
      db.update(id, updatedInfo).then(updateProject => {
        db.get(id).then(newProject => {
          res.status(201).json(newProject);
        });
      });
    })
    .catch(err => {
      res.status(500).json({ error: 'Error finding and updating project' });
    });
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  db.get(id)
    .then(project => {
      db.remove(id).then(delId => {
        res.status(200).json(project);
      });
    })
    .catch(err => {
      res.status(500).json({ error: 'Error finding and deleting project' });
    });
});

module.exports = router;
