/**
 * @name mServiceInvoker-v1-api
 * @description This module packages the MServiceInvoker API.
 */
'use strict';

const hydraExpress = require('hydra-express');
const hydra = hydraExpress.getHydra();
const express = hydraExpress.getExpress();
const jwtAuth = require('fwsp-jwt-auth');const ServerResponse = require('fwsp-server-response');
const requestPromise = require('request-promise');

let serverResponse = new ServerResponse();
serverResponse.enableCORS(true);express.response.sendError = function(err) {
  serverResponse.sendServerError(this, {result: {error: err}});
};
express.response.sendOk = function(result) {
  serverResponse.sendOk(this, {result});
};

express.response.sendError = function(result) {
  serverResponse.sendServerError(this, {result});
};

let api = express.Router();
//hydraExpress.validateJwtToken()

api.get('/',
(req, res) => {
  res.sendOk({msg: `hello from ${hydra.getServiceName()} - ${hydra.getInstanceID()}`});
});


var sampleJSON = {
  "_id": {
    "$oid": "597cb62f734d1d58c9aba34f"
  },
  "index": 0,
  "guid": "df6cf183-e4d4-46cd-ad4a-2cd50d5f6571",
  "isActive": true,
  "balance": "$2,853.62",
  "picture": "http://placehold.it/32x32",
  "age": 23,
  "eyeColor": "brown",
  "name": "Jenna Chan",
  "gender": "female",
  "company": "SYBIXTEX",
  "email": "jennachan@sybixtex.com",
  "phone": "+1 (807) 430-3952",
  "address": "549 Montana Place, Ruckersville, Rhode Island, 7809",
  "about": "Ullamco ex et Lorem et ex. Aliqua irure incididunt veniam occaecat aliquip qui ullamco labore aliquip labore incididunt labore. Laboris eiusmod sit id Lorem cillum eiusmod est.\r\n",
  "registered": "2016-01-29T08:18:12 -06:-30",
  "latitude": 10.667078,
  "longitude": 123.374421,
  "tags": [
    "exercitation",
    "Lorem",
    "eu",
    "magna",
    "dolore",
    "officia",
    "minim"
  ],
  "friends": [
    {
      "id": 0,
      "name": "Tabatha Diaz"
    },
    {
      "id": 1,
      "name": "Cassie Macdonald"
    },
    {
      "id": 2,
      "name": "Hannah Vaughn"
    }
  ],
  "greeting": "Hello, Jenna Chan! You have 10 unread messages.",
  "favoriteFruit": "apple"
};


api.get('/return-json',
  (req, res) => {
  console.log(req.query, "mServiecs triggerdd !!");
  var instanceId = req.query.id || Math.floor(Math.random()*100)+0 ;
  var options = {
    method: 'GET',
    uri: 'https://jsonplaceholder.typicode.com/posts/'+instanceId,
    body: {},
    json: true // Automatically stringifies the body to JSON
 };

requestPromise(options)
  .then(function (parsedBody) {
    // GET succeeded...
    res.sendOk({msg:parsedBody});
  })
  .catch(function (err) {
    res.sendError(err);
  });

});



module.exports = api;
