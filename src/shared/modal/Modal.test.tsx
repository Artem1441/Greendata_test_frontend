import React from "react";
import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import Modal from "./Modal";

describe("Modal", () => {
  it("Отображает переданные children", () => {
    render(
      <Modal closeAction={() => {}}>
        <p>Модальное окно</p>
      </Modal>
    );
  });
});
