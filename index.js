'use strict'
var express = require("express");
var app = express();
var path = require("path");
app.use("/", express.static(__dirname + "/"));
app.get('/',function(req, res){

    res.sendFile(path.join(__dirname+'/index.html'));



});
app.listen(3300);
console.log("Server running at Port 3300");
