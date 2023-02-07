import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Admin from "../components/admin/Admin";
import { BrowserRouter } from "react-router-dom";
import * as router from "react-router";
import Context from "../context/Context";
const navigate = jest.fn();

beforeEach(() => {
  jest.spyOn(router, "useNavigate").mockImplementation(() => navigate);
});

jest.setTimeout(30000);
it("delete book", async () => {
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
