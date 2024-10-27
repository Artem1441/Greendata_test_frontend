// Button.test.tsx

import React from "react";
import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import Button from "./Button";

describe("Button", () => {
  it("Отображение заголовка", () => {
    render(<Button onClick={() => {}}>Test</Button>);
    const button = screen.queryByText("Test");
    expect(button).toBeInTheDocument();
  });

  it("Вызывает метод onClick когда нажимают на кнопку", () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    fireEvent.click(screen.getByText("Click me"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("Правильно применяет св-во disable", () => {
    render(
      <Button onClick={() => {}} disabled>
        Click me
      </Button>
    );
    expect(screen.getByText("Click me")).toBeDisabled();
  });
});
