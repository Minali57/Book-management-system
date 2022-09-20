import React from "react";
import {
  fireEvent,
  render,
  screen,
  userEvent,
  waitFor,
} from "@testing-library/react";
import "@testing-library/jest-dom";
import Admin from "./Admin";
import App from "../../App";
import { BrowserRouter } from "react-router-dom";
import * as router from "react-router";
import Context, { CartState, Cart } from "../../context/Context";
import AddBook from "./AddBook";

const navigate = jest.fn();

beforeEach(() => {
  jest.spyOn(router, "useNavigate").mockImplementation(() => navigate);
});

let file;

beforeEach(() => {
  file = new File(["(⌐□_□)"], "test.png", { type: "image/jpg" });
});

it("add book page redirection", async () => {
  render(
    <BrowserRouter>
      <Context>
        <Admin />
      </Context>
    </BrowserRouter>
  );

  const addBtn = screen.getByTestId("addBtn");
  fireEvent.click(addBtn);
  expect(navigate).toHaveBeenCalledWith("/add");
});

it("add book", async () => {
  render(
    <BrowserRouter>
      <Context>
        <AddBook />
      </Context>
    </BrowserRouter>
  );

  const bname = screen.getByTestId("bname");
  fireEvent.change(bname, { target: { value: "Test Book 1" } });

  const aname = screen.getByTestId("aname");
  fireEvent.change(aname, { target: { value: "Minali" } });

  const price = screen.getByTestId("price");
  fireEvent.change(price, { target: { value: 100 } });

  const stock = screen.getByTestId("stock");
  fireEvent.change(stock, { target: { value: 7 } });

  const rating = screen.getByTestId("rating");
  fireEvent.change(rating, { target: { value: 4 } });

  const poster = screen.getByTestId("poster");
  await waitFor(() =>
    // eslint-disable-next-line testing-library/no-wait-for-side-effects
    fireEvent.change(poster, {
      target: { files: [file] },
    })
  );

  const genre = screen.getByTestId("genre");
  fireEvent.change(genre, { target: { value: 8 } });

  const addBook = screen.getByTestId("addBook");
  fireEvent.click(addBook);
  await waitFor(() => expect(navigate).toHaveBeenCalledWith("/admin"));
});
