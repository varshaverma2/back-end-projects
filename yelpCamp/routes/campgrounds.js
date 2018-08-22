var express=require("express");
var router=express.Router();
var Campground=require("../models/campground");
var middleware=require("../middleware/index.js");

router.get("/campgrounds",function(req,res){
   Campground.find({},function(err,allCampgrounds){
      if (err)
      {console.log(err);}
      else {res.render("campgrounds/index.ejs",{campgrounds:allCampgrounds}); }
      
   });
   
});
router.post("/campgrounds",middleware.isLoggedIn,function(req,res){
    var name=req.body.name;
    var image=req.body.image ;
    var description=req.body.description;
    var price=req.body.price;
    var author={
        id:req.user._id,
        username:req.user.username
    };
    var newc={name:name,price:price,image:image,description:description,author:author};
    
   // campgrounds.push(newc);
    Campground.create(newc,function(err,newly){
        if (err)
      {console.log(err);}
      else { res.redirect("/campgrounds");}
    });
   
});
router.get("/campgrounds/new",middleware.isLoggedIn,function(req, res) {
    res.render("campgrounds/new.ejs");
});
router.get("/campgrounds/:id",function(req, res) {
Campground.findById(req.params.id).populate("comments").exec(function(err,foundCampground){
      if (err)
      {console.log(err);}
      else { res.render("campgrounds/Show.ejs",{campground:foundCampground}); }
});

  
});
router.get("/campgrounds/:id/edit",middleware.checkcamp,function(req, res) {
    
    Campground.findById(req.params.id,function(err,foundCampground){
    
         
    res.render("campgrounds/edit.ejs",{campground:foundCampground});
    
   
});
});
router.put("/campgrounds/:id",middleware.checkcamp,function(req,res){
   var data={name:req.body.name,price:req.body.price,image:req.body.image,description:req.body.description};
   Campground.findByIdAndUpdate(req.params.id,data,function(err,updatedCampground){
       if (err){
           console.log(err);
           res.redirect("/campgrounds");
       }
       else {res.redirect("/campgrounds/"+req.params.id);}
   }) ;
});
router.delete("/campgrounds/:id",middleware.checkcamp,function(req,res){
   Campground.findByIdAndRemove(req.params.id,function(err){
       if(err){
           res.redirect("/campgrounds");
       }
       else {res.redirect("/campgrounds");}
   }) 
});





module.exports=router;