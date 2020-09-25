import style from "styled-components";
import { CellProps } from "./interfaces/cell";
import { CellType } from "./enums/type";
import { Ballprops } from "./interfaces/ball";

const CellColors = {
  [CellType.EMPTY]: "white",
  [CellType.BEGIN]: "yellow",
  [CellType.END]: "#47d247",
  [CellType.WALL]: "#c3c3c3",
};

export const GameCell = style.span<CellProps>`
  width: ${({ cellSize }) => cellSize ? `${cellSize}px` : "50px"};
  height: ${({ cellSize }) => cellSize ? `${cellSize}px` : "50px"};
  line-height: ${({ cellSize }) => cellSize ? `${cellSize}px` : "50px"};
  background-color: ${({ shadow, type }) =>
  shadow ? "black" : CellColors[type]};
  border: 1px solid #7d7d7d;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Ball = style.div<Ballprops>`
  width: ${({ size }) => `${size}`};
  height: ${({ size }) => `${size}`};
  border: 3px solid black;
  border-radius: 50%;
`;
