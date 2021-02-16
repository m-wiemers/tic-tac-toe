import { useState } from "react";
import styles from "../styles/Game.module.css";
import Board from "./Board";
import { calculateWinner } from "../components/Board";

export default function Game() {
  const [history, setHistory] = useState([{ squares: Array(9).fill(null) }]);
  const [xIsNext, setXIsNext] = useState(true);

  function handleClick(i) {
    const current = history[history.length - 1];
    const squares = [...current.squares];
    if (winner || squares[i]) {
      return;
    }

    squares[i] = xIsNext ? "☠" : "💡";
    setHistory(history.concat([{ squares: squares }]));
    setXIsNext(!xIsNext);
  }

  const current = history[history.length - 1];
  const winner = calculateWinner(current.squares);

  let status;
  if (winner) {
    status = "Winner: " + winner;
  } else {
    status = "Next Player: " + (xIsNext ? "☠" : "💡");
  }

  return (
    <div className={styles.game}>
      <div className={styles.gameBoard}>
        <Board squares={current.squares} onClick={(i) => handleClick(i)} />
      </div>
      <div className={styles.gameInfo}>
        <div>{status}</div>
        <ol>{}</ol>
      </div>
    </div>
  );
}
