import { useEffect, useState } from "react";
import Board from "./Board"
import Control from "./Control";
import { createPuzzle } from "./createPuzzle";
import classNames from "classnames";



export const App = () => {
  document.title = "Sudoku";

  const [board, setBoard] = useState(Array(9).fill(null).map(() => Array(9).fill(null)));
  const [puzzle, setPuzzle] = useState(Array(9).fill(null).map(() => Array(9).fill(null)));
  const [solution, setSolution] = useState(Array(9).fill(null).map(() => Array(9).fill(null)));
  const [selected, setSelected] = useState(null);
  const [status, setStatus] = useState("");
  const [statusState, setStatusState] = useState("");
  const [isRepeated, setisRepeated] = useState(false);


  useEffect(() => {
    createPuzzle({
      setBoard,
      setPuzzle,
      setSolution,
      setSelected,
    });
   
  }, []) //upon mount only
  

const handleInput = (rowIndex, colIndex, value) => {
  setBoard((prev) =>
    prev.map((row, r) =>
      row.map((cell, c) => {
        if (r === rowIndex && c === colIndex){
          return value ? parseInt(value) : null;
        }
        return cell;
      })
    )
  )
    
  }

  const handleCheck = () => {
    const flatBoard = board.flat();
    const flatSolution = solution.flat();

    if(flatBoard.every((cell, n) => cell === flatSolution[n])){
      setStatus("Correct!");
      setStatusState("correct");
    }
    else{
      setStatus("Incorrect, try again.");
      setStatusState("incorrect");
    }

    setTimeout(() => setStatus(null), 3000);
  }

  const handleShowSolution = () => {
    setBoard(solution.map((row) => [...row]));
  }

  const handleReset = () => {
    setBoard(puzzle.map((row) => [...row]));
    setStatus("");
    setSelected(null);
  }

  const handleNewPuzzle = () => {
    createPuzzle({
      setBoard,
      setPuzzle,
      setSolution,
      setSelected,
    })
  }

  return (
    <div style={{textAlign: "center"}}>
      <Board
        board={board}
        puzzle={puzzle}
        handleInput={handleInput}
        selected={selected}
        setSelected={setSelected}
        
       
      />
      <Control 
        handleCheck={handleCheck}
        handleShowSolution={handleShowSolution}
        handleReset={handleReset}
        handleNewPuzzle={handleNewPuzzle}

      />
      
      {status && <div className={classNames("status", statusState)}>{status}</div>}
      
    </div>
  )
}

export default App