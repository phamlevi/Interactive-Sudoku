
const Control = ({handleCheck, handleShowSolution, handleReset, handleNewPuzzle}) => {


  return (
    <div className="controls">
        <button onClick={handleCheck}>Check</button>
        <button onClick={handleShowSolution}>Show Solution</button>
        <button onClick={handleReset}>Reset</button>
        <button onClick={handleNewPuzzle}>New Puzzle</button>
    </div>
  );
};

export default Control;