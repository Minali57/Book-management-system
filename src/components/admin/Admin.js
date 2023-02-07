// import { GetBooks, DeleteBook } from "../../Api/Api";
import { DeleteBook } from "../../Api/Api";
import GetBooks from "../../Api/Api";
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

  const setBooks = async (data) => {
    if (sellerLogin && data) {
      data = data.filter((x) => x.isAdmin === false);
    }
    await dispatch({
      type: "GET_BOOKS",
      payload: data,
    });
  };

  useEffect(() => {
    // if (!adminLogin && !sellerLogin) {
    //   navigate("/");
    // }
    setBooks([]);

    async function load() {
      await GetBooks(setBooks);
    }
    load();
  }, [dataFetch]);

  const editData = (_uuid) => {
    navigate(`/edit/${_uuid}`);
  };

  const addData = () => {
    navigate("/add");
  };

  const callbackAfterDelete = () => {
    setDataFetch(!dataFetch);
  };
  const deleteData = (id) => {
    DeleteBook(id, callbackAfterDelete);
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
            {products.map((product, i) => (
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
                  <button
                    uuid={product._uuid}
                    data-testid={`delete_${i}`}
                    onClick={() => deleteData(product._uuid)}
                  >
                    <DeleteIcon />
                  </button>
                  <button
                    uuid={product._uuid}
                    data-testid={`edit_${i}`}
                    onClick={() => editData(product._uuid)}
                  >
                    <EditIcon />
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
