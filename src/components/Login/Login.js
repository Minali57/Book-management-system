import { React, useState } from "react";
import {
  Grid,
  Paper,
  Avatar,
  TextField,
  Button,
  Typography,
} from "@material-ui/core";
import { CartState } from "../../context/Context";
import { useNavigate } from "react-router-dom";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { Link } from "react-router-dom";
const Login = () => {
  const [name, setName] = useState("");
  const [pwd, setPwd] = useState("");
  const [invalid, setIn] = useState("");
  const paperStyle = {
    padding: 20,
    height: "70vh",
    width: 280,
    margin: "20px auto",
  };
  const { authDispatch } = CartState();
  const navigate = useNavigate();
  const avatarStyle = { backgroundColor: "#1bbd7e" };
  const btnstyle = { margin: "8px 0" };
  const handleClick = () => {
    if (name === "admin" && pwd === "admin") {
      authDispatch({
        type: "ADMIN_LOGIN",
      });
      navigate("/admin");
    } else if (name === "seller" && pwd === "seller") {
      authDispatch({
        type: "SELLER_LOGIN",
      });
      navigate("/admin");
    } else if (name === "user" && pwd === "user") {
      authDispatch({
        type: "BUYER_LOGIN",
      });
      navigate("/header");
    } else {
      setIn("Invalid Credentials");
    }
  };
  return (
    <Grid>
      <Paper elevation={10} style={paperStyle}>
        <Grid align="center">
          <Avatar style={avatarStyle}>
            <LockOutlinedIcon />
          </Avatar>
          <h2>Sign In</h2>
        </Grid>
        <TextField
          label="Username"
          value={name}
          onChange={(e) => {
            setIn("");
            setName(e.target.value);
          }}
          placeholder="Enter username"
          autoComplete="off"
          fullWidth
          required
          inputProps={{ "data-testid": "username" }}
        />
        <br />
        <TextField
          label="Password"
          value={pwd}
          onChange={(e) => {
            setIn("");
            setPwd(e.target.value);
          }}
          placeholder="Enter password"
          type="password"
          fullWidth
          required
          inputProps={{ "data-testid": "password" }}
        />
        <br />

        <br />
        <Button
          type="submit"
          color="primary"
          variant="contained"
          style={btnstyle}
          fullWidth
          onClick={handleClick}
          data-testid="check"
        >
          Sign in
        </Button>
        <br />
        <h6 style={{ color: "red" }} data-testid="invalid">
          {invalid}
        </h6>
        <br />
        <br />
        <Typography>
          <Link to="/header">Continue without login ?</Link>
        </Typography>
      </Paper>
    </Grid>
  );
};

export default Login;
