import { CellType } from "../enums/type";

export interface CellProps {
  cellSize?: number;
  shadow?: boolean;
  type: CellType;
  hasBall?: boolean;
  ballSize?: string;
}
