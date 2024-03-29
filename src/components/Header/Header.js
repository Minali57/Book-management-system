import { FaShoppingCart } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";
import {
  Badge,
  Button,
  Container,
  Dropdown,
  FormControl,
  Nav,
  Navbar,
} from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { CartState } from "../../context/Context";
import "../styles.css";
import Home from "../Home/Home";
const Header = () => {
  const navigate = useNavigate();
  const {
    state: { cart },
    authState: { userLogin, guest },
    dispatch,
    authDispatch,
    productDispatch,
  } = CartState();

  return (
    <>
      <Navbar bg="dark" variant="dark" style={{ height: 80 }}>
        <Container>
          <Navbar.Brand>
            <Link to="/">Book Store</Link>
          </Navbar.Brand>
          {useLocation().pathname.split("/")[1] !== "cart" && (
            <Navbar.Text className="search">
              <FormControl
                style={{ width: 500 }}
                type="search"
                placeholder="Search a book..."
                className="m-auto"
                aria-label="Search"
                onChange={(e) => {
                  productDispatch({
                    type: "FILTER_BY_SEARCH",
                    payload: e.target.value,
                  });
                }}
              />
            </Navbar.Text>
          )}
          <Nav>
            <Dropdown alignRight>
              <Dropdown.Toggle variant="success">
                <FaShoppingCart color="white" fontSize="25px" />
                <Badge>{cart.length}</Badge>
                <input
                  type="hidden"
                  value={cart.length}
                  data-testid="CartCount"
                />
              </Dropdown.Toggle>

              <Dropdown.Menu style={{ minWidth: 370 }}>
                {cart.length > 0 ? (
                  <>
                    {cart.map((prod) => (
                      <span className="cartitem" key={prod._uuid}>
                        <img
                          src={prod.image}
                          className="cartItemImg"
                          alt={prod.name}
                        />
                        <div className="cartItemDetail">
                          <span>{prod.name}</span>
                          <span>₹ {prod.price.split(".")[0]}</span>
                        </div>
                        <AiFillDelete
                          fontSize="20px"
                          style={{ cursor: "pointer" }}
                          onClick={() =>
                            dispatch({
                              type: "REMOVE_FROM_CART",
                              payload: prod,
                            })
                          }
                        />
                      </span>
                    ))}
                    <Link to="/cart">
                      <Button style={{ width: "95%", margin: "0 10px" }}>
                        Go To Cart
                      </Button>
                    </Link>
                  </>
                ) : (
                  <span style={{ padding: 10 }}>Cart is Empty!</span>
                )}
              </Dropdown.Menu>
            </Dropdown>
          </Nav>
        </Container>
        {guest ? (
          <Button
            variant="success"
            style={{ float: "right", marginLeft: "-10px" }}
            onClick={() => {
              navigate("/");
            }}
          >
            Login
          </Button>
        ) : (
          <Button
            variant="success"
            style={{ float: "right", marginLeft: "-10px" }}
            onClick={() => {
              authDispatch({
                type: "LOGOUT",
              });
              navigate("/");
            }}
          >
            Logout
          </Button>
        )}
      </Navbar>
      <Home />
    </>
  );
};

export default Header;
