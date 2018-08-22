var express=require("express");
var passport=require("passport");
var bodyParser=require("body-parser");
var LocalStrategy=require("passport-local");
var passportLocalMongoose=require("passport-local-mongoose");
var User=require("./models/user");
var mongoose=require("mongoose");
mongoose.connect("mongodb://localhost:27017/authapp", { useNewUrlParser: true } );
var app=express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(require("express-session")({
    secret:"hi",
    resave:false,
    saveUninitialized:false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.get("/",function(req,res){
   res.render("home.ejs"); 
});
app.get("/secret",isLoggedIn,function(req,res){
   res.render("secret.ejs"); 
});
app.get("/register",function(req, res) {
   res.render("register.ejs"); 
});
app.post("/register", function(req, res){
    User.register(new User({username: req.body.username}), req.body.password, function(err, user){
        if(err){
            console.log(err);
            return res.render('register.ejs');
        }
        passport.authenticate("local")(req, res, function(){
           res.redirect("/secret");
        });
    });
});
app.get("/login",function(req, res) {
   res.render("login.ejs"); 
});
app.post("/login", passport.authenticate("local", {
    successRedirect: "/secret",
    failureRedirect: "/login"
}) ,function(req, res){
});
app.get("/logout",function(req, res) {
   req.logout();
   res.redirect("/");
});
function isLoggedIn (req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

app.listen(process.env.PORT,process.env.IP);