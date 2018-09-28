const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const { getRelatedArtists, postNewArtist, editArtist, deleteArtist } = require('../database/index.js');
const cors = require('cors');
const server = express();

server.use(bodyParser.json());
server.use(cors());
server.use(express.urlencoded({ extended: true }));
server.use(express.static(path.join(__dirname, '../public')));

server.get(`/relatedArtists/artist/:id`, (req, res) => {
  getRelatedArtists (req.params.id, (error, data) => {
    if (error) {
      res.status(400).send(error);
    } else {
      res.send(data);
    }
  });
});

server.post(`/relatedArtists/artist/newArtist`, (req, res) => {
  postNewArtist (req.body.artist, (error, data) => {
    if (error) {
      res.status(400).send(error);
    } else {
      res.send("Posted!");
    }
  });
});

server.put(`/relatedArtists/artist/:id`, (req, res) => {
  editArtist (req.params.id, req.body.artist, (error, data) => {
    if (error) {
      res.status(400).send(error);
    } else {
      res.send("Edited!");
    }
  });
});

server.delete(`/relatedArtists/artist/delete/:id`, (req, res) => {
  deleteArtist (req.params.id, (error, data) => {
    if (error) {
      res.status(400).send(error);
    } else {
      res.send("Deleted!");
    }
  });
});

server.listen (3002, () => {
  console.log ('listening on port 3002!');
});
