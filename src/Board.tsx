import "./Board.css";
import { useEffect, useState } from "react";

export const Board = ({ size, chance }: { size: number; chance: number }) => {
  const [hasWon, setHasWon] = useState(false);

  // helper to generate a randomly populated grid
  const makeGrid = () => {
    return Array.from({ length: size }, () =>
      Array.from({ length: size }, () => {
        // generate a randomly enabled/disabled cell

        return Math.random() < chance;
      })
    );
  };

  const [grid, setGrid] = useState(makeGrid());

  useEffect(() => {
    // check if every cell in every row is disabled (it is equal to false)
    setHasWon(grid.every((row) => row.every((cell) => !cell)));
  }, [grid]);

  // toggle a single specified cell
  const toggleOne = (currentRow: number, currentColumn: number) => {
    setGrid((latestGrid) =>
      latestGrid.map((row, rowIndex) =>
        currentRow === rowIndex
          ? row.map((cell, columnIndex) =>
              currentColumn === columnIndex ? !cell : cell
            )
          : row
      )
    );
  };

  // toggle a specified cell along with its neighbors
  const toggleLights = (currentRow: number, currentColumn: number) => {
    toggleOne(currentRow, currentColumn); // self
    toggleOne(currentRow - 1, currentColumn); // up
    toggleOne(currentRow + 1, currentColumn); // down
    toggleOne(currentRow, currentColumn + 1); // right
    toggleOne(currentRow, currentColumn - 1); // left
  };

  return (
    <div className="container">
      <h1 className="title">
        <span className="title1">LIGHTS</span>
        &nbsp;
        <span className="title2">OUT</span>
      </h1>

      <div className="board">
        {grid.map((row, rowIndex) => (
          <div className="row" key={rowIndex}>
            {row.map((cell, columnIndex) => (
              /*cell*/
              <button
                className={"cell " + (cell ? "cellOn" : "cellOff")}
                onClick={() => toggleLights(rowIndex, columnIndex)}
                key={columnIndex}
              ></button>
            ))}
          </div>
        ))}
      </div>

      {/* if the player has won, show the reset button and congratulations text*/}
      {hasWon ? (
        <div className="winContainer">
          <p className="winText"> CONGRATULATIONS!!!</p>
          <button onClick={() => setGrid(makeGrid())} className="restartButton">
            RESTART
          </button>
        </div>
      ) : undefined}
    </div>
  );
};
