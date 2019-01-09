var express = require("express");
var router = express.Router();
var Group = require("../models/group");
var middleware = require("../middleware");


router.post("/create", middleware.isLoggedIn, (req, res) => {

    var name = req.body.name;
    var email = req.body.email;
    var goal = req.body.goal;
    var type = req.body.type;
    var sets = req.body.sets;
    var author = {
        id: req.user._id,
        username: req.user.username
    }
    var newGroup = { name: name, email: email, goal: goal, type: type, sets: sets, author: author }
    Group.create(newGroup, function (err, newlyCreated) {
        if (err) {
            console.log(err);
        } else {
            req.flash("success", newGroup.name + " is successfully created");
            res.redirect("/");
        }
    });
});


//NEW - show form to create new campground
router.get("/create", middleware.isLoggedIn, function (req, res) {
    res.render("group/create");
});


// SHOW - shows more info about one campground
router.get("/:id", middleware.isLoggedIn, function (req, res) {
    //find the campground with provided ID
    Group.findById(req.params.id).exec(function (err, foundGroup) {
        if (err) {
            console.log(err);
        } else {
            res.render("group/index", { group: foundGroup });
        }
    });
});


// EDIT CAMPGROUND ROUTE
router.get("/:id/edit",  function(req, res){
    Group.findById(req.params.id, function(err, foundGroup){
        res.render("group/settings", {group: foundGroup});
    });
});

// // UPDATE CAMPGROUND ROUTE
// router.put("/:id",middleware.checkGroupOwnership, function(req, res){
//     // find and update the correct campground
//     Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground){
//        if(err){
//            res.redirect("/campgrounds");
//        } else {
//            //redirect somewhere(show page)
//            res.redirect("/campgrounds/" + req.params.id);
//        }
//     });
// });

// // DESTROY CAMPGROUND ROUTE
// router.delete("/:id",middleware.checkGroupOwnership, function(req, res){
//    Campground.findByIdAndRemove(req.params.id, function(err){
//       if(err){
//           res.redirect("/campgrounds");
//       } else {
//           res.redirect("/campgrounds");
//       }
//    });
// });


module.exports = router;