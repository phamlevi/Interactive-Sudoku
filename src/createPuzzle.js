// Not graded. 
// A sudoku generally has about 
// 17 minimun given for unique solution

export const createPuzzle = ({setBoard, setPuzzle, setSolution, setSelected}) => {
    const size = 9;
    let board = Array(9).fill(null).map(() => Array(9).fill(null));
    
    function checkRepeat(starCoord, num){

         for (let x = 0; x < 3; x++)
        {
            for (let y = 0; y < 3; y++)
            {
                if (board[starCoord + x][starCoord + y] == num)
                {
                    return true;
                }
            }
        }
        return false;
    }

    function fillDiagonal(){
        
        let num;

        for(let diagonalCoord = 0; diagonalCoord < size; diagonalCoord+=3){
            for (let i = 0; i < 3; i++){
                for(let j = 0; j < 3; j++){
                    do{
                        num = Math.floor(Math.random() * 9 + 1);
                    }while(checkRepeat(diagonalCoord, num));

                    board[diagonalCoord + i][diagonalCoord + j] = num;
                }
            }

        }

    }

    function possible(row, col, num){

        // is the number existed in the given row
        for (let n = 0; n < 9; n++)
        {
            if (board[row][n] == num)
            {
                return false;
            }
        }

        // is the number existed in the given column
        for (let n = 0; n < 9; n++)
        {
            if (board[n][col] == num)
            {
                return false;
            }
        }
        // is the number existed in the given grid
        let boxRow = Math.floor((row / 3)) * 3; // starting row (0, 3, 6)
        let boxCol = Math.floor((col / 3)) * 3; // starting collumn (0, 3, 6)
        
        for (let x = 0; x < 3; x++)
        {
            for (let y = 0; y < 3; y++)
            {
                if (board[boxRow + x][boxCol + y] == num)
                {
                    return false;
                }
            }
        }
        // if not violate any sudoku rule then return true 
        return true;
    }

    function fillRest(row, col){
        // check if the program reach the end of the grid
        if (col >= 8 && row == 8)
        {
            return true;
        }

        // if reach the last collumn, got to the next row
        if (col > 8)
        {
            col = 0; // reset to collumn 0
            row++;
        }

        // if see a number, skip the slot (because we already filled the diagonal 3 x 3 grid)
        if (board[row][col] != null)
        {
            return fillRest(row, col + 1);
        }

        // check for empty spots and fill them with valid number
        if (board[row][col] == null)
        {
            for (let n = 1; n <= 9; n++) // guess from 1 to 9
            {
                if (possible(row, col, n))
                {
                    board[row][col] = n;

                    // check for the next slot, if the guessed number is alright to be placed and move on
                    if (fillRest(row, col + 1))
                    {
                        return true;
                    }
                }
                // if not, reset the current number to zero and repeat 
                board[row][col] = null;
            }
        }
        // repeat if slot return to 0, try again until good
        return false;
    }

    function removeSlot(){

        let count = 0;
        let col, row;
        const easy = Math.floor(Math.random() * 11 + 36);

        // fill in zeros according to the level amount
        while (count < easy){
            col = Math.floor(Math.random() * 9);
            row = Math.floor(Math.random() * 9);
            //place zero to nonzero spots
            if(board[row][col] != null){
                board[row][col] = null;
                count++;
            }
            
        }
        
    }


    
    fillDiagonal(); // this return a board with filled diagonal grids
    fillRest(0,0);
    const solution = board.map(row => [...row]);
    setSolution(solution);
    
    removeSlot();
    
    
    const puzzle = board.map(row => [...row]);
    setPuzzle(puzzle);
    setBoard(puzzle);

    setSelected(null);
    

    

    
}