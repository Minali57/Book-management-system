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
import { useNavigate } from "react-router-dom";
import { CartState } from "../../context/Context";
import { UploadImage } from "../../Api/Api";
import { UpdateBookApi, getBookDetails } from "../../Api/Api";
const EditBook = (props) => {
  const [bookname, setBname] = useState("");
  const [authorname, setAuthorname] = useState("");
  const [price, setPrice] = useState(0);
  const [inStock, setInStock] = useState(0);
  const [rating, setrating] = useState("");
  const [file, setfile] = useState();
  const [filebase64, setfiledata] = useState();
  const [category, setCategory] = useState();

  // const { id } = state;
  const navigate = useNavigate();
  const {
    state: { genres, product },
    authState: { adminLogin, sellerLogin },
    dispatch,
  } = CartState();

  const uploadFile = async () => {
    var FormData = require("form-data");
    var data = new FormData();
    data.append("key", "6d207e02198a847aa98d0a2a901485a5");
    data.append("action", "upload");
    data.append("source", filebase64);
    data.append("format", "json");

    UploadImage(data, uploadBook);
  };

  const callbackafterFetch = async (data) => {
    setPrice(data.price);
    setBname(data.name);
    setAuthorname(data.author);
    setrating(data.rating);
    setCategory(data.category);
    setfile(data.image);
    setInStock(data.inStock);
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
          _uuid: props.id,
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
          _uuid: props.id,
          inStock: inStock,
          category: category,
        },
      ]);
    }

    UpdateBookApi(data, callbackafterupload);
  };

  const callbackafterupload = () => {
    navigate("/admin");
  };

  const submitData = async () => {
    // //console.log(bookname, authorname, price, rating, file);
    if (filebase64) {
      await uploadFile();
    } else {
      await uploadBook("");
    }
  };

  useEffect(() => {
    // //console.log("uu", id);
    // if (!adminLogin && !sellerLogin) {
    //   navigate("/");
    // }
    //console.log("idd", props.id);

    async function load() {
      await getBookDetails(props.id, callbackafterFetch);
    }
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fileOnChange = async (e) => {
    let files = e.target.files;
    const fileReader = new FileReader();
    fileReader.readAsDataURL(files[0]);
    fileReader.onload = () => {
      var base64 = fileReader.result.replace("data:image/png;base64,", "");
      base64 = base64.replace("data:image/jpg;base64,", "");
      base64 = base64.replace("data:image/jpeg;base64,", "");
      //console.log(base64);
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
                    inputProps={{ "data-testid": "bname" }}
                  />
                </Grid>
                <Grid xs={12} sm={6} item>
                  <TextField
                    placeholder="Enter author name"
                    label="author_name"
                    value={authorname}
                    onChange={(e) => setAuthorname(e.target.value)}
                    variant="outlined"
                    fullWidth
                    required
                    inputProps={{ "data-testid": "aname" }}
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
                    inputProps={{ "data-testid": "price" }}
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
                    inputProps={{ "data-testid": "stock" }}
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
                    inputProps={{ "data-testid": "rating" }}
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
                    inputProps={{ "data-testid": "poster" }}
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
                    inputProps={{
                      id: "select-id",
                      "data-testid": "genre",
                    }}
                  >
                    {Object.entries(genres).map(([k, v]) => (
                      <MenuItem value={k} key={k}>
                        {v}
                      </MenuItem>
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
                    data-testid="editBook"
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
                    data-testid="cancelBook"
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
