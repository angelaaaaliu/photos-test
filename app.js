'use strict';
const multer = require('multer');
const express = require('express');
const app = express();
const fs = require('fs').promises;

app.use(multer().none());
app.use(express.static("public"));

app.get('/allimages', async function(req, res) {
  try {
    let photos = await fs.readFile('photos.json', 'utf-8');
    res.type('json').send(photos);
  } catch (err) {
    res.status(500).send('Image retrieval failed. Please try again.');
  }
});

app.get('/shoot/:shoot', async function(req, res) {
  try {
    let photosString = await fs.readFile('photos.json', 'utf-8');
    let photos = JSON.parse(photosString);
    let finalPhotos = [];
    for (let i = 0; i < photos.length; i++) {
      if (photos[i]["shoot"] === req.params.shoot) {
        finalPhotos.push(photos[i]);
      }
    }
    res.type('json').send(finalPhotos);
  } catch (err) {
    if (!(req.params.shoot)) {
      res.status(400).send("Missing POST parameter: shoot");
    } else {
      res.status(500).send('Image retrieval failed. Please try again.');
    }
  }
});

const PORT = process.env.PORT || 8000;
app.listen(PORT);