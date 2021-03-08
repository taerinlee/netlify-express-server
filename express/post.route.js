const express = require('express');
const router = express.Router();

// Require Post model in our routes module
let postmodel = require('./post.model');

// Defined store route
router.route('/add').post(function (req, res) {
  let post = new Post(req.body);
  post.save()
    .then(() => {
      res.status(200).json({'business': 'business in added successfully'});
    })
    .catch(() => {
      res.status(400).send("unable to save to database");
    });
});

// Defined get data(index or listing) route
router.route('/').get(function (req, res) {
  postmodel.find(function(err, posts){
    if(err){
      res.json(err);
    }
    else {
      res.json(posts);
    }
  });
});

// Defined edit route
router.route('/edit/:id').get(function (req, res) {
  let id = req.params.id;
  postmodel.findById(id, function (err, post){
      if(err) {
        res.json(err);
      }
      res.json(post);
  });
});

//  Defined update route
router.route('/update/:id').post(function (req, res) {
  postmodel.findById(req.params.id, function(err, post) {
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
router.route('/delete/:id').delete(function (req, res) {
  postmodel.findByIdAndRemove({_id: req.params.id}, function(err){
    if(err) res.json(err);
    else res.json('Successfully removed');
  });
});

module.exports = router;