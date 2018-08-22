var express=require("express");
var app=express();
var bodyParser=require("body-parser");
var Comment=require("./models/comment");
var mongoose=require("mongoose");
mongoose.connect("mongodb://localhost:27017/yelpdb");
var Campground=require("./models/campground");
var flash=require("connect-flash");
app.use(flash());
var passport=require("passport");
var LocalStrategy=require("passport-local");
var User=require("./models/user");
var commentRoutes=require("./routes/comments");
var campgroundRoutes=require("./routes/campgrounds");
var indexRoutes=require("./routes/index");

var seedDB=require("./seeds.js");
//seedDB();
var methodOverride=require("method-override");
app.use(methodOverride("_method")) ;
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname+"/public"));
app.use(require("express-session")({
    secret:"hi hello",
    resave:false,
    saveUninitialized:false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use(function(req,res,next){
    res.locals.currentUser=req.user;
    res.locals.error=req.flash("error");
   res.locals.success=req.flash("success");
    next();
});
app.use(campgroundRoutes);
app.use(commentRoutes);
app.use(indexRoutes);

app.listen(process.env.PORT,process.env.IP);