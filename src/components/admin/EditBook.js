import React, { useState, useEffect } from "react";
import {
  Grid,
  TextField,
  Button,
  Card,
  CardContent,
  Typography,
  Box,
  Select,
  MenuItem,
} from "@material-ui/core";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { CartState } from "../../context/Context";
const EditBook = () => {
  const [bookname, setBname] = useState("");
  const [authorname, setAuthorname] = useState("");
  const [price, setPrice] = useState(0);
  const [inStock, setInStock] = useState(0);
  const [rating, setrating] = useState("");
  const [file, setfile] = useState();
  const [filebase64, setfiledata] = useState();
  const { state } = useLocation();
  const [category, setCategory] = useState();

  const { id } = state;
  const navigate = useNavigate();
  const {
    state: { genres, product },
    authState: { adminLogin, sellerLogin },
    dispatch,
  } = CartState();
  const getBookData = async () => {
    var config = {
      method: "get",
      url: `https://crudapi.co.uk/api/v1/book/${id}`,
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Bearer -x4lh2uQVDw6APz677MEC_c8gFZd3BnjxX5MHFUXi1_qGCA7NQ",
      },
    };

    axios(config)
      .then(function (response) {
        setPrice(response.data.price);
        setBname(response.data.name);
        setAuthorname(response.data.author);
        setrating(response.data.rating);
        setCategory(response.data.category);
        setfile(response.data.image);
        setInStock(response.data.inStock);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const uploadFile = async () => {
    var FormData = require("form-data");
    var data = new FormData();
    data.append("key", "6d207e02198a847aa98d0a2a901485a5");
    data.append("action", "upload");
    data.append("source", filebase64);
    data.append("format", "json");

    var config = {
      method: "post",
      url: "https://freeimage.host/api/1/upload",
      headers: {
        "Content-Type": "application/octet-stream",
        Authorization:
          "Bearer CFPAT-AYCr-D5jDdrDxeS57u8YdRm57--CTmeE_tFAwoxv7do",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        uploadBook(response.data.image.url);
      })
      .catch(function (error) {
        console.log("img", error);
      });
  };

  const uploadBook = async (filePath) => {
    if (filePath != "") {
      var data = JSON.stringify([
        {
          name: bookname,
          author: authorname,
          price: price,
          rating: rating,
          image: filePath,
          _uuid: id,
          inStock: inStock,
          category: category,
        },
      ]);
    } else {
      var data = JSON.stringify([
        {
          name: bookname,
          author: authorname,
          price: price,
          rating: rating,
          _uuid: id,
          inStock: inStock,
          category: category,
        },
      ]);
    }

    var config = {
      method: "put",
      url: `https://crudapi.co.uk/api/v1/book`,
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Bearer -x4lh2uQVDw6APz677MEC_c8gFZd3BnjxX5MHFUXi1_qGCA7NQ",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        console.log("book", JSON.stringify(response.data));

        navigate("/admin");
      })
      .catch(function (error) {
        console.log("book", error);
      });
  };
  const submitData = async () => {
    // console.log(bookname, authorname, price, rating, file);
    if (filebase64) {
      await uploadFile();
    } else {
      await uploadBook("");
    }
  };

  useEffect(() => {
    // console.log("uu", id);
    // if (!adminLogin && !sellerLogin) {
    //   navigate("/");
    // }
    getBookData();
  }, []);

  const fileOnChange = async (e) => {
    let files = e.target.files;
    const fileReader = new FileReader();
    fileReader.readAsDataURL(files[0]);
    fileReader.onload = () => {
      var base64 = fileReader.result.replace("data:image/png;base64,", "");
      base64 = base64.replace("data:image/jpg;base64,", "");
      base64 = base64.replace("data:image/jpeg;base64,", "");
      console.log(base64);
      setfiledata(base64);
    };
  };

  return (
    <>
      <Typography gutterBottom variant="h4" align="center">
        Book-store
      </Typography>
      <Grid>
        <Card style={{ maxWidth: 450, padding: "20px 5px", margin: "0 auto" }}>
          <CardContent>
            <form>
              <Grid container spacing={1}>
                <Grid xs={12} sm={6} item>
                  <TextField
                    placeholder="Enter book name"
                    label="book_name"
                    value={bookname}
                    onChange={(e) => setBname(e.target.value)}
                    variant="outlined"
                    fullWidth
                    required
                  />
                </Grid>
                <Grid xs={12} sm={6} item>
                  <TextField
                    placeholder="Enter last name"
                    label="author_name"
                    value={authorname}
                    onChange={(e) => setAuthorname(e.target.value)}
                    variant="outlined"
                    fullWidth
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    type="number"
                    placeholder="Enter price"
                    label="price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    variant="outlined"
                    fullWidth
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    type="number"
                    placeholder="Enter stock"
                    label="stock"
                    value={inStock}
                    onChange={(e) => setInStock(e.target.value)}
                    variant="outlined"
                    fullWidth
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    type="number"
                    placeholder="Enter rating"
                    label="rating"
                    value={rating}
                    onChange={(e) => setrating(e.target.value)}
                    variant="outlined"
                    fullWidth
                    required
                  />
                </Grid>
                {filebase64 == null && (
                  <Grid item xs={12}>
                    <Box
                      component="img"
                      sx={{
                        height: 233,
                        width: 350,
                        maxHeight: { xs: 233, md: 167 },
                        maxWidth: { xs: 350, md: 250 },
                      }}
                      alt="The house from the offer."
                      src={file}
                    />
                  </Grid>
                )}

                <Grid item xs={12}>
                  <TextField
                    type="file"
                    onChange={fileOnChange}
                    placeholder="Enter rating"
                    variant="outlined"
                    fullWidth
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <Select
                    style={{ padding: "12px" }}
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={category || null}
                    label="Age"
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    {Object.entries(genres).map(([k, v]) => (
                      <MenuItem value={k}>{v}</MenuItem>
                    ))}
                  </Select>
                </Grid>
                <br />
                <Grid item xs={12}>
                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    onClick={submitData}
                  >
                    Submit
                  </Button>
                  <br />
                  <br />
                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    onClick={() => navigate("/admin")}
                  >
                    Cancel
                  </Button>
                </Grid>
              </Grid>
            </form>
          </CardContent>
        </Card>
      </Grid>
    </>
  );
};

export default EditBook;
