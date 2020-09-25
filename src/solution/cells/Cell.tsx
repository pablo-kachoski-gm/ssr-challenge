import React from "react";
import { CellProps } from "./interfaces/cell";
import { GameCell, Ball } from "./components";
const Cell = (props: CellProps) => {
  const {
    hasBall,
    ballSize,
  } = props;

  return (
    <GameCell {...props}>
      {hasBall && <Ball size={ballSize} />}
    </GameCell>
  );
};

export default Cell;
