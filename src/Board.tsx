import "./Board.css";
import Cell from "./Cell";
import React, { useState } from "react";

function Board({ size, chance }: { size: number; chance: number }) {
  function random() {
    return Math.random() < chance;
  }
  const [grid, setGrid] = useState(
    Array.from({ length: size }, () =>
      Array.from({ length: size }, () => random())
    )
  );

  const toggleLight = (updatedRow: number, updatedColumn: number) => {
    setGrid(
      grid.map((row, rowIndex) =>
        updatedRow === rowIndex
          ? row.map((cell, columnIndex) =>
              updatedColumn === columnIndex ? !cell : cell
            )
          : row
      )
    );
  };

  const toggleNeighbours = (updatedRow: number, updatedColumn: number) => {
    toggleLight(updatedRow, updatedColumn); // self
    toggleLight(updatedRow - 1, updatedColumn); // up
    toggleLight(updatedRow + 1, updatedColumn); // down
    toggleLight(updatedRow, updatedColumn + 1); // right
    toggleLight(updatedRow, updatedColumn - 1); // left
  };

  return (
    <div className="board">
      {grid.map((row, rowIndex) => (
        <div className="row" key={rowIndex}>
          {row.map((cell, columnIndex) => (
            <Cell
              cellOn={cell}
              toggleLight={() => toggleNeighbours(rowIndex, columnIndex)}
              key={columnIndex}
            ></Cell>
          ))}
        </div>
      ))}
    </div>
  );
}

export default Board;
