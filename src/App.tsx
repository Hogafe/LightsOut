import "./App.css";
import { Board } from "./Board";

function App() {
  return (
    <div className="container">
      <h1 className="Title">
        <span className="Title_1half">LIGHTS</span>
        <span className="Title_2half">OUT</span>
      </h1>
      <Board size={5} chance={0.25} />
    </div>
  );
}

export default App;
