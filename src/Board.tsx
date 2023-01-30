import "./Board.css";
import Cell from "./Cell";
import { useEffect, useState } from "react";

export function Board({ size, chance }: { size: number; chance: number }) {
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
    // check if every cell in every row is disabled
    setHasWon(grid.every((row) => row.every((cell) => !cell)));
  }, [grid]);

  // toggle a single specified cell
  const toggleOne = (updatedRow: number, updatedColumn: number) => {
    setGrid((latestGrid) =>
      latestGrid.map((row, rowIndex) =>
        updatedRow === rowIndex
          ? row.map((cell, columnIndex) =>
              updatedColumn === columnIndex ? !cell : cell
            )
          : row
      )
    );
  };

  // toggle a specified cell along with its neighbors
  const toggleLights = (updatedRow: number, updatedColumn: number) => {
    toggleOne(updatedRow, updatedColumn); // self
    toggleOne(updatedRow - 1, updatedColumn); // up
    toggleOne(updatedRow + 1, updatedColumn); // down
    toggleOne(updatedRow, updatedColumn + 1); // right
    toggleOne(updatedRow, updatedColumn - 1); // left
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
              <Cell
                cellOn={cell}
                toggleLight={() => toggleLights(rowIndex, columnIndex)}
                key={columnIndex}
              ></Cell>
            ))}
          </div>
        ))}
      </div>

      {/* if the player has won, show the reset button and congratulations text*/}
      {hasWon ? (
        <div className="winContainer">
          <p className="winText"> CONGARTULATIONS!!!</p>
          <button onClick={() => setGrid(makeGrid())} className="restartButton">
            RESTART
          </button>
        </div>
      ) : undefined}
    </div>
  );
}
