import React from 'react'
import classNames from "classnames";

const Board = ({board, handleInput, puzzle, selected, setSelected}) => {
   
    return (
    <>
        <h1>Sudoku</h1>
        <div className="container">
            <table className="table">
                <tbody>
                    {board.map((row, rowIndex) => {
                        return (
                            <tr key={rowIndex}>
                               {row.map((cell, colIndex) =>{
                                    const isPrefilled = puzzle[rowIndex][colIndex] !== null;
                                    
                                    return (
                                        <td key={colIndex} 
                                            className={classNames("cell", 
                                            {
            
                                            "prefilled": isPrefilled,
                                            }
                                        )}>
                                            <input
                                            type="text"
                                            maxLength={1} 
                                            value={cell === null ? "" : cell}
                                            
                                            readOnly={isPrefilled}
                                            onFocus={(e) => {
                                                setSelected([rowIndex, colIndex]); 
                                                e.target.select();
                                            }}
                                            onClick={(e) => {
                                                setSelected([rowIndex, colIndex]); 
                                                e.target.select();
                                            }}
                                            onDoubleClick={(e) => {
                                                setSelected(); 
                                               
                                            }}
                                            onChange={(e) => {
                                                handleInput(rowIndex, colIndex, e.target.value);
                                            }}
                                            className={classNames({
                                                
                                                "same-row": selected && rowIndex == selected[0],
                                                "same-col": selected && colIndex == selected[1],
                                                "same-box":
                                                selected && 
                                                Math.floor(rowIndex / 3) === Math.floor(selected[0] / 3) &&
                                                Math.floor(colIndex / 3) === Math.floor(selected[1] / 3),
                                            })}/>
                                            
                                        </td>
                                    )
                               })} 
                            </tr>
                        )
                    }

                    )}
                </tbody>
            </table>
        </div>
            

    </>
    )
}

export default Board