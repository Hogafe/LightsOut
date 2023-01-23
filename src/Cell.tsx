import React from "react";
import "./Cell.css";

function Cell({
  cellOn,
  toggleLight,
}: {
  cellOn: boolean;
  toggleLight: () => void;
}) {
  return (
    <button
      className={"cell " + (cellOn ? "cellLightOn" : "cellLightOff")}
      onClick={toggleLight}
    ></button>
  );
}

export default Cell;
