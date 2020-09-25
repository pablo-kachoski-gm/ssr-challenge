import React from "react";

import Labyrinth from "./solution/Labyrinth/Labyrinth";
import { Props } from "./solution/Labyrinth/interfaces/labyrinth";

function App() {
  const labyrinths: Props[] = [{
    targetPosition: [6, 9],
    availableCells: [
      [1, 1, 1, 1, 1, 0, 0, 1, 1, 1],
      [0, 0, 1, 0, 1, 1, 1, 1, 0, 0],
      [0, 0, 1, 0, 1, 0, 0, 1, 0, 0],
      [1, 1, 1, 0, 0, 0, 1, 1, 0, 0],
      [1, 0, 1, 0, 1, 0, 0, 1, 1, 1],
      [1, 0, 1, 1, 1, 0, 0, 1, 0, 1],
      [0, 0, 1, 0, 1, 0, 0, 1, 0, 1],
      [0, 0, 1, 0, 1, 1, 0, 1, 0, 0],
      [0, 0, 1, 0, 1, 0, 0, 1, 1, 1],
    ],
    startingPosition: [4, 4],
    moveLimit: 25,
  }, {
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
  }, {
    targetPosition: [5, 4],
    availableCells: [
      [1, 1, 1, 1, 1, 1, 1, 1],
      [0, 0, 0, 1, 0, 1, 0, 0],
      [0, 0, 1, 1, 1, 1, 0, 0],
      [0, 0, 1, 0, 0, 1, 0, 0],
      [1, 1, 1, 0, 0, 1, 1, 1],
      [0, 0, 1, 1, 1, 0, 0, 0],
    ],
    startingPosition: [0, 7],
    moveLimit: 18,
  }];

  const [currentLabyrinth, setCurrentLabyrinth] = React.useState<number>(
    0,
  );

  return (
    <Labyrinth
      key={currentLabyrinth}
      {...labyrinths[currentLabyrinth]}
      cellSize={30}
      shadow={true}
      visibleCells={2}
      onPlayNext={() => {
        const next = currentLabyrinth + 1;
        setCurrentLabyrinth(
          next >= labyrinths.length ? 0 : next,
        );
      }}
    />
  );
}

export default App;
