var express=require("express");
var bodyParser=require("body-parser");
  
const mongoose = require('mongoose');
const { RSA_NO_PADDING } = require("constants");
mongoose.connect('mongodb+srv://vinay:rana@shop-cluster.jhye8.mongodb.net/shopdb?retryWrites=true&w=majority');
var db=mongoose.connection;
db.on('error', console.log.bind(console, "connection error"));
db.once('open', function(callback){
    console.log("connection succeeded");
})

var app=express()
  
  
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({
    extended: true
}));
  
app.post('/sign_up', function(req,res){
    var name = req.body.name;
    var email =req.body.email;
    var pass = req.body.password;
    var phone =req.body.phone;
  
    var data = {
        "name": name,
        "email":email,
        "password":pass,
        "phone":phone
    }
db.collection('details').insertOne(data,function(err, collection){
        if (err) throw err;
        console.log("Record inserted Successfully");
              
    });
          
    return res.redirect('signed_up.html');
});

app.post('/check_login',function(req,res){ 
    var email =req.body.email;
    var pass = req.body.password;

    

    db.collection('details').findOne({"email":email}, function(err, result) {
        if (err) {throw err;}
        else if(result==null){ 
          return  res.redirect('login.html');
        }
        else if(result.email==email && result.password==pass ){
            res.redirect('logged_in.html');
        }

        else{ 
            return  res.redirect('login.html');
        }
    });

});


 app.get('/find_prod',function(req,res){ 

   
res.redirect("found.html");

 
 });
   



app.get('/home',function(req,res){ 
    return res.redirect('home.html');

});


  
  app.get('/login',function(req,res){ 
      return res.redirect('login.html');

  });


app.get('/',function(req,res){
res.set({
    'Access-control-Allow-Origin': '*'
    });
return res.redirect('index.html');
}).listen(3000)
  
  
console.log("server listening at port 3000");