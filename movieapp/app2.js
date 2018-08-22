var express=require("express");
var app=express();
var request=require("request");
app.get("/",function(req, res) {
    res.render("search.ejs");
});
app.get("/results",function(req,res){
    var query=req.query.movie;
    request("http://www.omdbapi.com/?s="+query+"&apikey=thewdb",function(error,response,body){
       if(!error&&response.statusCode==200) {
          var data=JSON.parse(body);
          res.render("results.ejs",{data:data});       }
    });

});
app.listen(process.env.PORT,process.env.IP);
