const express = require('express')
const http = require('http')
const fs = require('fs')
const path = require('path')
const app = express()


const MongoClient = require("mongodb").MongoClient;
var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static('public'));

const mongo_db_url = "mongodb+srv://root:7046406@cluster0.daoqxda.mongodb.net/test";
const client = new MongoClient(mongo_db_url);
client.connect();

const homeUrl = path.join(__dirname, '/public/home.html')
app.get('/', function(req, res){
  res.sendFile(homeUrl)
})

const registerUrl = path.join(__dirname, '/public/register.html')
const loginUrl = path.join(__dirname, '/public/login.html')

app.post('/register', function(req, res){
    var username = req.body.reg_username
    var pwd = req.body.reg_password
    var register_obj = [
      {
        username: username,
        password: pwd
      }
    ];
    const db = client.db("Ani");
    db.collection("user").insertMany(register_obj, function(err, res){
    	if (err) throw err;
    	console.log(res);
    });
    console.log("registration complete")
    res.sendFile(registerUrl)
})

app.post('/login', function(req, res){
  var username = req.body.login_username
  var pwd = req.body.login_password

	const db = client.db("Ani");
	const coll = db.collection("user");
	
	coll.find({username: username}).toArray(function(err, result){
		if (err){
			console.log(err);
			return;
		}
		console.log("result: ", result);
		console.log("account password: ", result[0]["password"]);
		console.log("entered password: ", pwd);
		if (pwd === result[0]["password"]){
			console.log("password equal");
			res.sendFile(loginUrl);
		} else {
			console.log("password not equal");
			res.redirect(req.get('host'));
		}
	});

	
	
	/*
  var query = "SELECT pwd FROM user WHERE userName = '" + username.toString() + "';"
  console.log("start login")
  conn.query(query, function(err, result){
    if(err) throw err
    console.log("result: " + JSON.stringify(result))
    var retPwd = JSON.parse(JSON.stringify(result))
    if (retPwd[0].pwd == pwd){
      console.log("user " + username + " login successfully")
    } else {
      console.log("wrong password: " + retPwd[0].pwd)
    }
  })
	*/
})

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})