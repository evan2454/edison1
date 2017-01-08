var request = require('request');
var Validator = require('jsonschema').Validator;
 var v = new Validator();
var express = require("express");
var app = express();
var mongoose = require('mongoose');
var fs=require('fs');
var bodyParser = require('body-parser');

mongoose.connect('mongodb://localhost/wicedsensor');
var schema=new mongoose.Schema({

  "sdata": String,
  "did": String,
  "dtime":{ "type": Date},

  received_at: { type: Date, default: Date.now },
});
var  wicedSensorDb= mongoose.model('wicedSensorDb', schema);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())

  app.post("/server", function(request, response) {

      var value=request.body;
      console.log(request.body.sdata);
      saveInDb(value);
      response.send("Message received.");
      response.end();
});

app.listen(8080);
console.log('Server listening on');
function saveInDb(value){

    var todo = new wicedSensorDb({sdata: value.sdata, did: value.did, dtime: value.dtime });
        todo.save(function(err){
        if(err)
            console.log(err);
        else
            console.log(todo);
        });


}
