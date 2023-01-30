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
      className={"cell " + (cellOn ? "cellOn" : "cellOff")}
      onClick={toggleLight}
    ></button>
  );
}

export default Cell;
