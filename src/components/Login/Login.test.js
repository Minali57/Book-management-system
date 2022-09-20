import React from "react";
import { fireEvent, render, screen, userEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Login from "./Login";
import App from "../../App";
import Context, { CartState, Cart } from "../../context/Context";
import { BrowserRouter } from "react-router-dom";
import * as router from "react-router";
const navigate = jest.fn();

beforeEach(() => {
  jest.spyOn(router, "useNavigate").mockImplementation(() => navigate);
});

it("Invalid Login Test", () => {
  render(
    <BrowserRouter>
      <Context>
        <App />
      </Context>
    </BrowserRouter>
  );

  const msg = screen.getByTestId("invalid");
  const submitBtn = screen.getByTestId("check");

  fireEvent.click(submitBtn);
  expect(msg).toHaveTextContent("Invalid");
});

it("Admin Login Test", () => {
  render(
    <BrowserRouter>
      <Context>
        <App />
      </Context>
    </BrowserRouter>
  );

  const password = screen.getByTestId("password");
  const username = screen.getByTestId("username");
  const submitBtn = screen.getByTestId("check");
  fireEvent.change(username, { target: { value: "admin" } });
  fireEvent.change(password, { target: { value: "admin" } });
  //interact with those elements
  fireEvent.click(submitBtn);
  expect(navigate).toHaveBeenCalledWith("/admin");
});

it("Seller Login Test", () => {
  render(
    <BrowserRouter>
      <Context>
        <App />
      </Context>
    </BrowserRouter>
  );

  const password = screen.getByTestId("password");
  const username = screen.getByTestId("username");
  const submitBtn = screen.getByTestId("check");
  fireEvent.change(username, { target: { value: "seller" } });
  fireEvent.change(password, { target: { value: "seller" } });
  fireEvent.click(submitBtn);
  expect(navigate).toHaveBeenCalledWith("/admin");
});

it("Buyer Login Test", () => {
  render(
    <BrowserRouter>
      <Context>
        <App />
      </Context>
    </BrowserRouter>
  );

  const password = screen.getByTestId("password");
  const username = screen.getByTestId("username");
  const submitBtn = screen.getByTestId("check");
  fireEvent.change(username, { target: { value: "user" } });
  fireEvent.change(password, { target: { value: "user" } });
  fireEvent.click(submitBtn);
  expect(navigate).toHaveBeenCalledWith("/header");
});
