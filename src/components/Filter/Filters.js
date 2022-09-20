import { Button, Form } from "react-bootstrap";
import { CartState } from "../../context/Context";
import Rating from "../Rating/Rating";

const Filters = () => {
  const {
    state: { genres },
    productDispatch,
    productState: { byStock, sort, byRating, category },
  } = CartState();

  // make state for rating

  return (
    <div className="filters">
      <span className="title">Category</span>
      <Form.Check
        inline
        label="All"
        name="genre"
        type="radio"
        id={0}
        onChange={() =>
          productDispatch({
            type: "FILTER_BY_CATEGORY",
            payload: 0,
          })
        }
        checked={category === 0 ? true : false}
      />
      {Object.entries(genres).map(([k, v]) => (
        <Form.Check
          inline
          label={v}
          name="genre"
          type="radio"
          id={k}
          onChange={() =>
            productDispatch({
              type: "FILTER_BY_CATEGORY",
              payload: k,
            })
          }
          checked={category === k ? true : false}
        />
      ))}
      <br />
      <span>
        <Form.Check
          inline
          label="Ascending"
          name="group1"
          type="radio"
          id={`inline-1`}
          onChange={() =>
            productDispatch({
              type: "SORT_BY_PRICE",
              payload: "lowToHigh",
            })
          }
          checked={sort === "lowToHigh" ? true : false}
        />
      </span>
      <span>
        <Form.Check
          inline
          label="Descending"
          name="group1"
          type="radio"
          id={`inline-2`}
          onChange={() =>
            productDispatch({
              type: "SORT_BY_PRICE",
              payload: "highToLow",
            })
          }
          checked={sort === "highToLow" ? true : false}
        />
      </span>
      <span>
        <Form.Check
          inline
          label="Include Out of Stock"
          name="group1"
          type="checkbox"
          id={`inline-3`}
          onChange={() =>
            productDispatch({
              type: "FILTER_BY_STOCK",
            })
          }
          checked={byStock}
        />
      </span>
      <span>
        <label style={{ paddingRight: 10 }}>Rating: </label>
        <Rating
          rating={byRating}
          onClick={(i) =>
            productDispatch({
              type: "FILTER_BY_RATING",
              payload: i + 1,
            })
          }
          style={{ cursor: "pointer" }}
        />
      </span>
      <Button
        variant="light"
        onClick={() =>
          productDispatch({
            type: "CLEAR_FILTERS",
          })
        }
      >
        Clear Filters
      </Button>
    </div>
  );
};

export default Filters;
