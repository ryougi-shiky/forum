const express = require('express');
const router = express.Router();
const path = require('path')
const fs = require('fs');
const alert = require('alert');
var jsdom = require("jsdom");
var JSDOM = jsdom.JSDOM;
const MongoClient = require("mongodb").MongoClient;

const hints = require('../public/js/home_wrong_input_hints.js');

const mongo_db_url = "mongodb+srv://root:7046406@cluster0.daoqxda.mongodb.net/test";
const client = new MongoClient(mongo_db_url);
client.connect();

const registerUrl = path.join(path.resolve(__dirname, '..'), '/public/register.html');
const loginUrl = path.join(path.resolve(__dirname, '..'), '/public/login.html');


/*
var hint = new Vue({
    el: '#register_err',
    data: {
        existsUsername: "",
        wrongPwd: ""
    }
});
*/
const homeUrl = path.join(path.resolve(__dirname, '..'), '/public/home.html');
var home_page = "";
fs.readFile(homeUrl, 'utf8', function(err, data){
  if(err) throw err;
  home_page = data;
  //console.log("home_page: ", home_page);
})
const dom = new JSDOM(home_page);
//console.log("dom: ", dom);

router.post('/register', function(req, res, next){
    var username = req.body.reg_username
    var pwd = req.body.reg_password
    var register_obj = [
      {
        username: username,
        password: pwd
      }
    ];
    const db = client.db("Ani");
    db.collection("user").find({username: username}).toArray(function(err, result){
		if (err) throw err;
		console.log("result: ", result);
        console.log("registering username: ", username);
        if (result.length > 0){
            console.log("account username: ", result[0]["username"]);
            console.log("account exist");
            console.log(dom.window.document.querySelector("#register_err"));
            //dom.window.document.getElementById('register_err').innerHTML = "Username already exists! Try another username";
			      //console.log("modified home_page: ", home_page);
            res.render(homeUrl, {existsUsername: "hello"});
        } else {
            console.log("account creating");
            db.collection("user").insertMany(register_obj, function(err, res){
                if (err) throw err;
                console.log(res);
            });
            console.log("registration complete")
            res.sendFile(registerUrl)
        }
	  });
})

router.post('/login', function(req, res, next){
  console.log("post login req: ", req);

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
			console.log("password correct");
			//res.sendFile(loginUrl);
      res.send(result);
		} else {
			console.log("password not equal");
            alert("Password incorrect! Try again");
			res.redirect(req.get('host'));
		}
	});
})

router.get('/login', function(req, res, next){
  //console.log("get login req: ", req);
  console.log("get login res: ", res);
})

module.exports = router;