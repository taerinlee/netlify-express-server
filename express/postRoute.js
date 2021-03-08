const express = require('express');
const router = express.Router();

// Require Post model in our routes module
let postModel = require('./postModel');

// Defined store route
router.post('/add', (req, res) => {
  let body = new postModel(req.body);
  body.save()
    .then(() => {
      res.status(200).json({'business': 'business in added successfully'});
    })
    .catch(() => {
      res.status(400).send("unable to save to database");
    });
});

// Defined get data(index or listing) route
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

// Defined edit route
router.get('/edit/:id', (req, res) => {
  let id = req.params.id;
  postModel.findById(id, (err, post) => {
      if(err) {
        res.json(err);
      }
      res.json(post);
  });
});

//  Defined update route
router.post('/update/:id', (req, res) => {
  postModel.findById(req.params.id, (err, post) => {
    if (!post)
      res.status(404).send("data is not found");
    else {
        post.title = req.body.title;
        post.body = req.body.body;
        post.save().then(() => {
          res.json('Update complete');
      })
      .catch(() => {
            res.status(400).send("unable to update the database");
      });
    }
  });
});

// Defined delete | remove | destroy route
router.delete('/delete/:id', (req, res) => {
  postModel.findByIdAndRemove({_id: req.params.id}, (err) => {
    if(err) res.json(err);
    else res.json('Successfully removed');
  });
});

module.exports = router;