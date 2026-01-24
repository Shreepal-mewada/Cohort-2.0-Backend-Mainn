const shree=require('express');
const malla=shree();
console.log("server is running at port 3000");
malla.get('/',function(req,res){
    res.send("hello world");
});
malla.get('/about',function(req,res){
    res.send("this is about page");
});
malla.get('/contact',function(req,res){
    res.send("this is contact page");
});
malla.listen(3000);