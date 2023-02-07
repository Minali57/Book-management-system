const axios = require("axios");
const express = require("express");

const PORT = process.env.PORT || 3001;

const app = express();
var cors = require("cors");
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

var baseUrl =
  // "https://frozen-journey-49199.herokuapp.com/https://crudapi.co.uk/api/v1/";
  "https://crudapi.co.uk/api/v1/";
var header = {
  "Content-Type": "application/json",
  Authorization: "Bearer -x4lh2uQVDw6APz677MEC_c8gFZd3BnjxX5MHFUXi1_qGCA7NQ",
};
app.get("/api/:type", (req, res) => {
  var config = {
    method: "get",
    url: baseUrl + req.params.type,
    headers: header,
  };
  axios(config)
    .then(function (response) {
      res.json(response.data);
    })
    .catch(function (error) {
      res.json(error);
    });
});

app.post("/api/:type", (req, res) => {
  var config = {
    method: "post",
    url: baseUrl + req.params.type,
    headers: header,
    data: req.body,
  };
  axios(config)
    .then(function (response) {
      res.json(response.data);
    })
    .catch(function (error) {
      res.json(error);
    });
});

app.get("/api/:type/:id", (req, res) => {
  var config = {
    method: "get",
    url: baseUrl + req.params.type + "/" + req.params.id,
    headers: header,
  };
  axios(config)
    .then(function (response) {
      res.json(response.data);
    })
    .catch(function (error) {
      res.json(error);
    });
});

app.put("/api/:type", (req, res) => {
  var config = {
    method: "put",
    url: baseUrl + req.params.type,
    headers: header,
    data: req.body,
  };
  axios(config)
    .then(function (response) {
      res.json(response.data);
    })
    .catch(function (error) {
      res.json(error);
    });
});
app.delete("/api/:type/:id", (req, res) => {
  var config = {
    method: "delete",
    url: baseUrl + req.params.type,
    headers: header,
    data: JSON.stringify([
      {
        _uuid: req.params.id,
      },
    ]),
  };
  axios(config)
    .then(function (response) {
      res.json({ success: true });
    })
    .catch(function (error) {
      res.json({ success: false });
    });
});

app.post("/api/imageUpload", (req, res) => {
  var config = {
    method: "post",
    url: "https://freeimage.host/api/1/upload",
    headers: {
      "Content-Type": "application/octet-stream",
      Authorization: "Bearer CFPAT-AYCr-D5jDdrDxeS57u8YdRm57--CTmeE_tFAwoxv7do",
    },
    data: req.body,
  };
  axios(config)
    .then(function (response) {
      res.json(response.data);
    })
    .catch(function (error) {
      res.json(error);
    });
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
