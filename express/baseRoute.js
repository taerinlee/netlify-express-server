const express = require('express');
const router = express.Router();

// Require Post model in our routes module
let postModel = require('./postModel');

router.get('/', (req, res) => {
  postModel.find((err, posts) => {
    if(err){
      res.json(err);
    }
    else {
      res.json(posts);
    }
  });
});

router.get('/another', (req, res) => res.json({ route: req.originalUrl }));

router.post('/', (req, res) => res.json({ postBody: req.body }));

module.exports = router;