// Title.test.tsx

import React from "react";
import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import Title from "./Title";

describe("Title", () => {
  it("Отображение заголовка", () => {
    render(<Title>Заголовок</Title>);
  });
});
