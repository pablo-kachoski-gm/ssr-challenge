import React from "react";
import {
  isOutsideRadius,
  getCellType,
  isInvalidPosition,
  getNewPosition,
} from "./utils";
import { UNLIMITED_MOVEMENTS } from "./constants/constants";
import Cell from "../cells/Cell";
import { Props } from "./interfaces/labyrinth";
import { Position } from "./types/position";
import {
  GameEndMessage,
  GameInfoPanel,
  GameLabyrinth,
  GameActions,
  RefreshButton,
} from "./components";

const Labyrinth = (props: Props) => {
  const {
    targetPosition,
    availableCells,
    startingPosition,
    moveLimit = UNLIMITED_MOVEMENTS,
    cellSize,
    shadow,
    visibleCells,
  } = props;
  const [availableMovements, setAvailableMovements] = React.useState<number>(
    moveLimit,
  );
  const [currentPosition, setCurrentPosition] = React.useState<Position>(
    startingPosition,
  );
  const currentPositionRef = React.useRef(startingPosition);

  const currentX = currentPosition[0];
  const currentY = currentPosition[1];
  const hasReachedTarget = (currentX === targetPosition[0] &&
    currentY === targetPosition[1]);
  const won =
    (UNLIMITED_MOVEMENTS === availableMovements || availableMovements >= 0) &&
    hasReachedTarget;
  const lost = (0 === availableMovements) &&
    !hasReachedTarget;

  const onRefresh = () => {
    setAvailableMovements(moveLimit);
    setCurrentPosition(startingPosition);
    currentPositionRef.current = startingPosition;
  };

  React.useEffect(() => {
    const keyPressHandler = (e: any) => {
      if (lost || won) return;
      let newPosition: Position = getNewPosition(
        currentPositionRef,
        e.keyCode,
        availableCells,
      );
      if (isInvalidPosition(availableCells, newPosition)) return;
      currentPositionRef.current = newPosition;
      setCurrentPosition(newPosition);
      const updatedMovements = availableMovements - 1;
      setAvailableMovements(updatedMovements);
    };
    document.addEventListener("keydown", keyPressHandler);
    return () => {
      document.removeEventListener("keydown", keyPressHandler);
    };
  }, [lost, won, availableMovements, availableCells]);

  return (
    <>
      <GameInfoPanel>
        <div
          data-testid="moves-message"
          style={{
            fontSize: "20px",
            textTransform: "uppercase",
            color: availableMovements !== UNLIMITED_MOVEMENTS &&
                availableMovements <= 5
              ? "#c11a1a"
              : "black",
          }}
        >
          {`moves left ${
            availableMovements === UNLIMITED_MOVEMENTS
              ? "unlimited"
              : availableMovements
          }`}
        </div>
        {lost &&
          <GameEndMessage
            color="#7b0000"
            data-testid="lose-message"
            text={"you lost"}
          />}
        {won &&
          <GameEndMessage
            color="#603ad2"
            data-testid="win-message"
            text={" you win!!!"}
          />}
      </GameInfoPanel>
      <GameLabyrinth>
        {availableCells &&
          availableCells.map((columns, rowIndex: number) =>
            <div key={`row-${rowIndex}`} style={{ display: "flex" }}>
              {columns.map((column, columnIndex: number) => (
                <Cell
                  key={`cell-${rowIndex}${columnIndex}`}
                  cellSize={cellSize}
                  type={getCellType({
                    columnValue: column,
                    rowPos: rowIndex,
                    colPos: columnIndex,
                    startingPosition,
                    targetPosition,
                  })}
                  hasBall={currentX === rowIndex &&
                    currentY === columnIndex}
                  ballSize={`${cellSize - 15}px`}
                  shadow={shadow &&
                    isOutsideRadius(
                      currentX,
                      rowIndex,
                      currentY,
                      columnIndex,
                      visibleCells,
                    )}
                />
              ))}
            </div>
          )}
      </GameLabyrinth>
      <GameActions>
        <RefreshButton type="button" onClick={onRefresh} value="restart" />
      </GameActions>
    </>
  );
};
export default Labyrinth;
