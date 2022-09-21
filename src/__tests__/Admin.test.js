import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import { act } from "react-dom/test-utils";
import Admin from "../components/admin/Admin";
import { BrowserRouter } from "react-router-dom";
import * as router from "react-router";
import Context, { CartState, Cart } from "../context/Context";
import AddBook from "../components/admin/AddBook";

import EditBook from "../components/admin/EditBook";
const navigate = jest.fn();

beforeEach(() => {
  jest.spyOn(router, "useNavigate").mockImplementation(() => navigate);
});

let file;
var editId = "";
beforeEach(() => {
  function dataURLtoFile(dataurl, filename) {
    var arr = dataurl.split(","),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }

    return new File([u8arr], filename, { type: mime });
  }
  file = dataURLtoFile(
    `data:image/jpeg;base64,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`,
    "poster.jpeg"
  );
});

jest.setTimeout(30000);

it("add book page redirection", async () => {
  render(
    <BrowserRouter>
      <Context>
        <Admin />
      </Context>
    </BrowserRouter>
  );

  const addBtn = screen.getByTestId("addBtn");
  await fireEvent.click(addBtn);
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

  // eslint-disable-next-line testing-library/no-unnecessary-act
  await act(async () => {
    await userEvent.upload(poster, file);

    // eslint-disable-next-line testing-library/no-wait-for-side-effects

    await new Promise((r) => setTimeout(r, 10000));

    const genre = screen.getByTestId("genre");
    fireEvent.change(genre, { target: { value: 8 } });

    const addBook = screen.getByTestId("addBook");

    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(async () => {
      // eslint-disable-next-line testing-library/no-wait-for-side-effects
      fireEvent.click(addBook);
    });

    await new Promise((r) => setTimeout(r, 10000));
    expect(navigate).toHaveBeenCalledTimes(1);
  });
});

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
    fireEvent.change(genre, { target: { value: 4 } });

    const editBook = screen.getByTestId("editBook");

    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(async () => {
      // eslint-disable-next-line testing-library/no-wait-for-side-effects
      fireEvent.click(editBook);
    });

    await new Promise((r) => setTimeout(r, 10000));
    expect(navigate).toHaveBeenCalledTimes(1);
  });
});
it("delete book ", async () => {
  render(
    <BrowserRouter>
      <Context>
        <Admin />
      </Context>
    </BrowserRouter>
  );

  await new Promise((r) => setTimeout(r, 10000));
  const editBtn = screen.getByTestId("edit_0");
  const deleteBtn = screen.getByTestId("delete_0");
  await fireEvent.click(deleteBtn);
  await new Promise((r) => setTimeout(r, 10000));
  expect(editBtn).not.toBeInTheDocument();
});
