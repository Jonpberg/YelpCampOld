var express = require('express');
var router = express.Router();
var Campground = require('../models/campground');
var middleware = require('../middleware');

// =============================
// CAMPGROUND ROUTES
// =============================
// INDEX ROUTE
router.get('/', function(req, res) {
    // Get all campgrounds from DB
    Campground.find({}, function(err, campgrounds) {
        if (err) {
            console.log(err);
        }
        else {
            res.render("campgrounds/index", {campgrounds: campgrounds});
        }
    });
});

// NEW ROUTE
router.get('/new', middleware.isLoggedIn, function(req, res) {
   res.render('campgrounds/new');
});

// CREATE ROUTE
router.post('/', middleware.isLoggedIn, function(req, res) {
    var name = req.body.name;
    var image = req.body.image;
    var price = req.body.price;
    var dsc = req.body.description;
    var author = {
        id: req.user._id,
        username: req.user.username
    };
    var newCampground = {name: name, image:image, description: dsc, author:author, price:price};
    // Create a new campground and save to DB
    Campground.create(newCampground, function(err, newlyCreated) {
       if (err) {
           console.log(err);
       } 
       else {
           res.redirect('/campgrounds');
       }
    });
});

// SHOW ROUTE
router.get('/:id', function(req, res) {
    // find the campground with provided ID
    Campground.findById(req.params.id).populate('comments').exec(function(err, foundCampground) {
        if (err || !foundCampground) {
            req.flash('error', 'Campground not found.');
            res.redirect('back');
        }
        else {
            res.render('campgrounds/show', {campground: foundCampground});
        }
    });
});

// EDIT CAMPGROUND ROUTE
router.get('/:id/edit', middleware.checkCampgroundOwnership, function(req, res) {
    Campground.findById(req.params.id, function(err, foundCampground) {
        if (err) {
            res.redirect('back');
        }
        res.render('campgrounds/edit', {campground: foundCampground}); 
    });
});

// UPDATE CAMPGROUND ROUTE
router.put('/:id', middleware.checkCampgroundOwnership, function(req, res) {
   // Find and update the correct campground, then redirect
   Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground) {
       if (err) {
           res.redirect('/campgrounds');
       }
       else {
           req.flash('success', 'Your campground has been updated.');
           res.redirect('/campgrounds/' + req.params.id);
       }
   });
});

// DESTROY CAMPGROUND ROUTE
router.delete('/:id', middleware.checkCampgroundOwnership, function(req, res) {
    Campground.findByIdAndRemove(req.params.id, function(err, deletedCampground) {
        if (err) {
            res.redirect('/campgrounds');
        }
        else {
            res.redirect('/campgrounds');
        }
    });
});


module.exports = router;
