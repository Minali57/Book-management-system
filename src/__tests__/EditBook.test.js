import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { act } from "react-dom/test-utils";
import Admin from "../components/admin/Admin";
import { BrowserRouter } from "react-router-dom";
import * as router from "react-router";
import Context from "../context/Context";
import EditBook from "../components/admin/EditBook";
const navigate = jest.fn();

beforeEach(() => {
  jest.spyOn(router, "useNavigate").mockImplementation(() => navigate);
});
var editId = "";

jest.setTimeout(30000);

it("edit book page redirection", async () => {
  render(
    <BrowserRouter>
      <Context>
        <Admin />
      </Context>
    </BrowserRouter>
  );

  await new Promise((r) => setTimeout(r, 10000));
  const editBtn = screen.getByTestId("edit_0");
  await fireEvent.click(editBtn);
  editId = editBtn.getAttribute("uuid");
  expect(navigate).toHaveBeenCalledWith("/edit/" + editId);
});
it("Edit book", async () => {
  render(
    <BrowserRouter>
      <Context>
        <EditBook id={editId} />
      </Context>
    </BrowserRouter>
  );
  const bname = screen.getByTestId("bname");
  fireEvent.change(bname, { target: { value: "Edited Book" } });
  const aname = screen.getByTestId("aname");
  fireEvent.change(aname, { target: { value: "Shivali" } });
  const price = screen.getByTestId("price");
  fireEvent.change(price, { target: { value: 1000 } });
  const stock = screen.getByTestId("stock");
  fireEvent.change(stock, { target: { value: 70 } });

  const rating = screen.getByTestId("rating");
  fireEvent.change(rating, { target: { value: 1 } });

  // eslint-disable-next-line testing-library/no-unnecessary-act
  await act(async () => {
    // eslint-disable-next-line testing-library/no-wait-for-side-effects

    const genre = screen.getByTestId("genre");
    fireEvent.change(genre, { target: { value: 1 } });

    const editBook = screen.getByTestId("editBook");

    fireEvent.click(editBook);

    await new Promise((r) => setTimeout(r, 10000));
    expect(navigate).toHaveBeenCalledTimes(1);
  });
});
