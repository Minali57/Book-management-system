import { Card, Button } from "react-bootstrap";
import { CartState } from "../../context/Context";
import Rating from "../Rating/Rating";

const SingleProduct = ({ prod, indx }) => {
  const {
    state: { cart },
    dispatch,
  } = CartState();
  const styles = {
    cardImage: {
      objectFit: "cover",
      maxHeight: "250px",
    },
  };
  return (
    <div className="products">
      <Card>
        <Card.Img
          variant="top"
          src={prod.image}
          alt={prod.name}
          style={styles.cardImage}
        />
        <Card.Body>
          <Card.Title>{prod.name}</Card.Title>
          <Card.Subtitle style={{ paddingBottom: 10 }}>
            <span>₹ {prod.price}</span>
            <div> {prod.author}</div>

            <Rating rating={prod.rating} />
          </Card.Subtitle>
          {cart.some((p) => p._uuid === prod._uuid) ? (
            <Button
              variant="danger"
              onClick={() =>
                dispatch({
                  type: "REMOVE_FROM_CART",
                  payload: prod,
                })
              }
              data-testid={`remCartBtn-${indx}`}
            >
              Remove from Cart
            </Button>
          ) : (
            <Button
              onClick={() =>
                dispatch({
                  type: "ADD_TO_CART",
                  payload: prod,
                })
              }
              disabled={!prod.inStock}
              data-testid={`addCartBtn-${indx}`}
            >
              {!prod.inStock ? "Out of Stock" : "Add to Cart"}
            </Button>
          )}
        </Card.Body>
      </Card>
    </div>
  );
};

export default SingleProduct;
