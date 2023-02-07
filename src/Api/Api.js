import React from "react";
import axios from "axios";

var baseUrl = "http://localhost:3001/api/";
var header = {
  "Content-Type": "application/json",
  Authorization: "Bearer -x4lh2uQVDw6APz677MEC_c8gFZd3BnjxX5MHFUXi1_qGCA7NQ",
};

const GetBooks = async (_callback) => {
  var config = {
    method: "get",
    url: baseUrl + "book",
    headers: header,
  };

  axios(config)
    .then(async function (response) {
      await _callback(response.data.items);
    })
    .catch(function (error) {
      //console.log(error);
    });
};

const DeleteBook = async (id, _callback) => {
  var config = {
    method: "delete",
    url: baseUrl + "book/" + id,
    headers: header,
  };

  axios(config)
    .then(function (response) {
      // window.location.reload();
      _callback();
    })
    .catch(function (error) {
      //console.log("book", error);
    });
};

const AddBookApi = async (data, _callback) => {
  var config = {
    method: "post",
    url: baseUrl + "book",
    headers: header,
    data: data,
  };

  axios(config)
    .then(function (response) {
      _callback();
    })
    .catch(function (error) {
      //console.log("book", error);
    });
};

const UpdateBookApi = async (data, _callback) => {
  var config = {
    method: "put",
    url: baseUrl + "book",
    headers: header,
    data: data,
  };

  axios(config)
    .then(function (response) {
      _callback();
    })
    .catch(function (error) {
      //console.log("book", error);
    });
};

const UploadImage = async (data, _callback) => {
  var config = {
    method: "post",
    url: baseUrl + "imageUpload",
    data: data,
  };

  axios(config)
    .then(function (response) {
      _callback(response.data.image.url);
    })
    .catch(function (error) {
      _callback("https://iili.io/PytDYJ.jpg");
    });
};

const getBookDetails = (id, _callback) => {
  var config = {
    method: "get",
    url: `${baseUrl}book/${id}`,
    headers: header,
  };

  axios(config)
    .then(async function (response) {
      await _callback(response.data);
    })
    .catch(function (error) {
      //console.log(error);
    });
};
export default GetBooks;
export { DeleteBook, AddBookApi, UpdateBookApi, UploadImage, getBookDetails };
