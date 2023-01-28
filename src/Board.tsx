import "./Board.css";
import Cell from "./Cell";
import React, { useEffect, useState } from "react";

export function Board({ size, chance }: { size: number; chance: number }) {
  const [hasWon, setHasWon] = useState(false);

  const random = () => Math.random() < chance;

  const [grid, setGrid] = useState(
    Array.from({ length: size }, () =>
      Array.from({ length: size }, () => random())
    )
  );

  const resetGrid = () => {
    setGrid(
      Array.from({ length: size }, () =>
        Array.from({ length: size }, () => random())
      )
    );
  };

  useEffect(() => {
    setHasWon(grid.slice(4, 5).every((row) => row.every((cell) => !cell)));
  }, [grid]);

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

  const toggleLights = (updatedRow: number, updatedColumn: number) => {
    toggleOne(updatedRow, updatedColumn); // self
    toggleOne(updatedRow - 1, updatedColumn); // up
    toggleOne(updatedRow + 1, updatedColumn); // down
    toggleOne(updatedRow, updatedColumn + 1); // right
    toggleOne(updatedRow, updatedColumn - 1); // left
  };

  return (
    <div className="container">
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
      {hasWon ? (
        <div className="congratulationsContainer">
          <p className="congratulationsText"> CONGARTULATIONS!!!</p>
          <button onClick={resetGrid} className="restartButton">
            RESTART
          </button>
        </div>
      ) : undefined}
    </div>
  );
}
