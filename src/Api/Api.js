import React from "react";
import axios from "axios";

var baseUrl = "https://crudapi.co.uk/api/v1/book";
var header = {
  "Content-Type": "application/json",
  Authorization: "Bearer -x4lh2uQVDw6APz677MEC_c8gFZd3BnjxX5MHFUXi1_qGCA7NQ",
};

const GetBooks = async (_callback) => {
  var config = {
    method: "get",
    url: baseUrl,
    headers: header,
  };

  axios(config)
    .then(function (response) {
      _callback(response.data.items);
    })
    .catch(function (error) {
      console.log(error);
    });
};

export default GetBooks;
