import { fireEvent, screen, render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Context from "../context/Context";
import Header from "../components/Header/Header";
import "@testing-library/jest-dom";
import { act } from "react-dom/test-utils";

jest.setTimeout(30000);
test("Cart Test", async () => {
  render(
    <BrowserRouter>
      <Context>
        <Header />
      </Context>
    </BrowserRouter>
  );
  const cart = screen.getByTestId("CartCount");
  await new Promise((r) => setTimeout(r, 10000));

  // eslint-disable-next-line testing-library/no-unnecessary-act
  await act(async () => {
    const addcart = screen.getByTestId("addCartBtn-0");
    fireEvent.click(addcart);
  });

  expect(cart).toHaveValue("1");
  await new Promise((r) => setTimeout(r, 1000));

  // eslint-disable-next-line testing-library/no-unnecessary-act
  await act(async () => {
    const removeCart = screen.getByTestId("remCartBtn-0");
    fireEvent.click(removeCart);
  });

  expect(cart).toHaveValue("0");
});
