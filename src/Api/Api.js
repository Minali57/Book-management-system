import React from "react";
import axios from "axios";

var baseUrl =
  "https://frozen-journey-49199.herokuapp.com/https://crudapi.co.uk/api/v1/book";
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
    .then(async function (response) {
      await _callback(response.data.items);
    })
    .catch(function (error) {
      console.log(error);
    });
};

const DeleteBook = async (id, _callback) => {
  var data = JSON.stringify([
    {
      _uuid: id,
    },
  ]);
  var config = {
    method: "delete",
    url: baseUrl,
    headers: header,
    data: data,
  };

  axios(config)
    .then(function (response) {
      // window.location.reload();
      _callback();
    })
    .catch(function (error) {
      console.log("book", error);
    });
};

const AddBookApi = async (data, _callback) => {
  var config = {
    method: "post",
    url: baseUrl,
    headers: header,
    data: data,
  };

  axios(config)
    .then(function (response) {
      _callback();
    })
    .catch(function (error) {
      console.log("book", error);
    });
};

const UpdateBookApi = async (data, _callback) => {
  var config = {
    method: "put",
    url: baseUrl,
    headers: header,
    data: data,
  };

  axios(config)
    .then(function (response) {
      _callback();
    })
    .catch(function (error) {
      console.log("book", error);
    });
};

const UploadImage = async (data, _callback) => {
  var config = {
    method: "post",
    url: "https://frozen-journey-49199.herokuapp.com/https://freeimage.host/api/1/upload",
    headers: {
      "Content-Type": "application/octet-stream",
      Authorization: "Bearer CFPAT-AYCr-D5jDdrDxeS57u8YdRm57--CTmeE_tFAwoxv7do",
    },
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
    url: `${baseUrl}/${id}`,
    headers: header,
  };

  axios(config)
    .then(async function (response) {
      await _callback(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });
};
export default GetBooks;
export { DeleteBook, AddBookApi, UpdateBookApi, UploadImage, getBookDetails };
