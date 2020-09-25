import { CellType } from "../cells/enums/type";
import { Position } from "./types/position";

export const isOutsideRadius = (
  currentX: number,
  rowIndex: number,
  currentY: number,
  columnIndex: number,
  visibleCells: number,
): boolean => {
  return Math.sqrt(
    Math.pow(currentX - rowIndex, 2) +
      Math.pow(currentY - columnIndex, 2),
  ) > visibleCells;
};

export const getCellType = ({
  columnValue,
  colPos,
  rowPos,
  startingPosition,
  targetPosition,
}: {
  columnValue: number;
  colPos: number;
  rowPos: number;
  startingPosition: Position;
  targetPosition: Position;
}) => {
  return (startingPosition[0] === rowPos && startingPosition[1] === colPos)
    ? CellType.BEGIN
    : (targetPosition[0] === rowPos && targetPosition[1] === colPos)
    ? CellType.END
    : columnValue === 0
    ? CellType.WALL
    : CellType.EMPTY;
};

export const isInvalidPosition = (
  availableCells: (0 | 1)[][],
  newPosition: Position,
) => {
  return availableCells[newPosition[0]][newPosition[1]] === 0;
};

export const getNewPosition = (
  currentPositionRef: React.MutableRefObject<Position>,
  keyCode: number,
  availableCells: (0 | 1)[][],
) => {
  const max_column = availableCells && availableCells[0].length - 1;
  const max_row = availableCells && availableCells.length - 1;
  const x = currentPositionRef.current[0];
  const y = currentPositionRef.current[1];
  const min_column = 0;
  const min_row = 0;
  let newPosition: Position = currentPositionRef.current;
  switch (keyCode) {
    case 37: {
      const newY = y - 1 < min_column ? min_column : y - 1;
      newPosition = [x, newY];
      break;
    }
    case 38: {
      const newX = x - 1 < min_row ? min_row : x - 1;
      newPosition = [newX, y];
      break;
    }
    case 39: {
      const newY = y + 1 > max_column ? max_column : y + 1;
      newPosition = [x, newY];
      break;
    }
    case 40: {
      const newX = x + 1 > max_row ? max_row : x + 1;
      newPosition = [newX, y];
      break;
    }
  }
  return newPosition;
};
