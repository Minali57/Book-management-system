import { React, useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import { Button } from "@material-ui/core";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { CartState } from "../../context/Context";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import AddIcon from "@material-ui/icons/Add";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});
export default function Admin() {
  const classes = useStyles();
  const navigate = useNavigate();
  const [dataFetch, setDataFetch] = useState(false);

  const {
    state: { products, genres },
    authState: { adminLogin, sellerLogin },
    dispatch,
    authDispatch,
  } = CartState();

  useEffect(() => {
    if (!adminLogin && !sellerLogin) {
      navigate("/");
    }
    dispatch({
      type: "GET_BOOKS",
      payload: [],
    });
    var config = {
      method: "get",
      url: "https://crudapi.co.uk/api/v1/book",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Bearer -x4lh2uQVDw6APz677MEC_c8gFZd3BnjxX5MHFUXi1_qGCA7NQ",
      },
    };

    axios(config)
      .then(function (response) {
        var items = response.data.items;
        if (sellerLogin) {
          items = items.filter((prod) => !prod.isAdmin);
        }
        dispatch({
          type: "GET_BOOKS",
          payload: items,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [dataFetch]);

  const editData = (_uuid) => {
    navigate("/edit", { state: { id: _uuid } });
    console.log("f");
  };

  const addData = () => {
    navigate("/add");
    console.log("clicked");
  };

  const deleteData = (id) => {
    var data = JSON.stringify([
      {
        _uuid: id,
      },
    ]);
    var config = {
      method: "delete",
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
        // window.location.reload();
        setDataFetch(!dataFetch);
      })
      .catch(function (error) {
        console.log("book", error);
      });
  };
  const Logout = () => {
    authDispatch({
      type: "LOGOUT",
    });
    navigate("/");
  };
  return (
    <>
      <Button data-testid="addBtn" style={{ float: "right" }} onClick={addData}>
        Add Book
        <AddIcon style={{ float: "right" }} />
      </Button>
      <Button
        type="submit"
        color="primary"
        variant="contained"
        style={{
          position: "fixed",
          bottom: "2px",
          right: "10px",
        }}
        onClick={Logout}
      >
        Log Out
      </Button>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Book name</TableCell>
              <TableCell align="right">Category</TableCell>
              <TableCell align="right">Author</TableCell>
              <TableCell align="right">Price</TableCell>
              <TableCell align="right">inStock</TableCell>
              <TableCell align="right">ratings</TableCell>
              <TableCell align="right">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product._uuid}>
                <TableCell component="th" scope="row">
                  {product.name}
                </TableCell>
                <TableCell align="right">{genres[product.category]}</TableCell>
                <TableCell align="right">{product.author}</TableCell>
                <TableCell align="right">{product.price}</TableCell>
                <TableCell align="right">{product.inStock}</TableCell>
                <TableCell align="right">{product.rating}</TableCell>
                <TableCell align="right">
                  <DeleteIcon onClick={() => deleteData(product._uuid)} />
                  <EditIcon onClick={() => editData(product._uuid)} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
