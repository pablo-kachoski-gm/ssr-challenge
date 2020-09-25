import React from "react";
import { render, fireEvent, act } from "@testing-library/react";

import Labyrinth from "./solution/Labyrinth/Labyrinth";
import { Props } from "./solution/Labyrinth/interfaces/labyrinth";

const ARROW_RIGHT = { "keyCode": 39 } as KeyboardEventInit;
const ARROW_DOWN = { "keyCode": 40 } as KeyboardEventInit;

const dispatchDown = () => {
  document.dispatchEvent(
    new KeyboardEvent("keydown", ARROW_DOWN),
  );
};
const dispatchRight = () => {
  document.dispatchEvent(
    new KeyboardEvent("keydown", ARROW_RIGHT),
  );
};

describe("Labyrinth", () => {
  let props: Props;
  beforeEach(() => {
    props = {
      targetPosition: [4, 4],
      availableCells: [
        [1, 1, 1, 1, 1],
        [0, 0, 1, 0, 0],
        [0, 0, 1, 0, 0],
        [1, 1, 1, 0, 0],
        [0, 0, 1, 1, 1],
      ],
      startingPosition: [0, 0],
      moveLimit: 10,
      cellSize: 30,
    };
  });

  it("should win", () => {
    const { getByTestId, queryByTestId } = render(
      <Labyrinth {...props} />,
    );
    act(dispatchRight);
    act(dispatchRight);
    act(dispatchDown);
    act(dispatchDown);
    act(dispatchDown);
    act(dispatchDown);
    act(dispatchRight);
    act(dispatchRight);

    expect(getByTestId("moves-message").textContent).toEqual("moves left 2");
    expect(queryByTestId("win-message")).toBeTruthy();
    expect(queryByTestId("lose-message")).not.toBeTruthy();
  });

  it("should lose", () => {
    const { container, getByTestId, queryByTestId } = render(
      <Labyrinth {...props} moveLimit={2} />,
    );
    act(dispatchRight);
    act(dispatchRight);
    expect(getByTestId("moves-message").textContent).toEqual("moves left 0");
    expect(queryByTestId("win-message")).not.toBeTruthy();
    expect(queryByTestId("lose-message")).toBeTruthy();
  });
});
