import React from "react";
import internal from "stream";
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
