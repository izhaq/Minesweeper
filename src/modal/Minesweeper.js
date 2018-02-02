import CellInfo from './CellInfo';

class Minesweeper {

    constructor(){
        this.opendCells = [];
        this.bombStack = {};
        this.board = [];
    }
    
    resetBoard(mines){
        this.opendCells = [];
        this.bombStack = {};
        this.board = []
        this.mines = mines;
    }

     play(row, col, markBomb){

        if(markBomb){
            this.board[row][col].isFlagged = !this.board[row][col].isFlagged;
            return [this.board[row][col]];
        }

         if(this.isSuicideOrBombCell(this.board[row][col])){
             this.board[row][col].status = "revealed";
             return [this.board[row][col]];
         }

         this.travelTheBoard(row, col, this.board);

         while(this.opendCells.length>0){
             let cellToOpen = this.opendCells.pop();
             this.travelTheBoard(cellToOpen[0], cellToOpen[1]);
         }

         return this.board;
     }

     travelTheBoard(row, col){
         if(!this.isCellTraveled(row, col)){
             this.board[row][col].status = this.board[row][col].status = "revealed";
         }

         if(this.isSuicideOrBombCell(this.board[row][col])){return;}

         this.addNeighborsCellsToOpen(row, col);
     }

    addNeighborsCellsToOpen(row, col){
        let maxRow = Math.min(this.board.length-1, row+1),
            maxCol = Math.min(this.board[0].length-1, col+1);

        for(let minRow = Math.max(0, row-1); minRow <= maxRow; minRow++){
            for(let minCol = Math.max(0, col-1); minCol <= maxCol; minCol++){
                if(this.allowOpenCell(minRow, minCol)){
                    this.opendCells.push([minRow, minCol])
                }
            }
        }
    }

    allowOpenCell(row, col){
        if(!this.board[row] || (this.board[row] && !this.board[row][col])) return false;

        let cellNotBomb = !this.board[row][col].isBomb,
            cellNotOpen = !this.isCellTraveled(row, col);

        return cellNotOpen && cellNotBomb ;
    }

     isCellTraveled(row, col){
         if(!this.board[row] || (this.board[row] && !this.board[row][col])) return true;

         return this.board[row][col].status === "revealed";
     }

     setNewGame(rows, columns, mines){

         this.resetBoard(mines);

         this.generateBombs(rows, columns);

         this.setBoard(rows, columns);

         this.calculateSuicideNeighbors();

         return this.board;
     }

     setBoard(rows, columns){
         for(let row = 0; row < rows; row ++){
             this.board.push([]);
             for(let col = 0; col < columns; col ++){
                 let isBomb = this.bombStack[row] && this.bombStack[row][col];
                 this.board[row].push(new CellInfo(row, col, isBomb));
             }
         }
     }

    generateBombs(rows, columns) {
        for(let bomb = 0; bomb<this.mines; bomb++) {
            this.generateBomb(rows, columns);
        }
    }

    generateBomb(rows, columns) {
        let bombX = Math.floor(Math.random() * columns),
            bombY = Math.floor(Math.random() * rows);

        while(this.bombStack[bombY] && this.bombStack[bombY][bombX]){
            bombX = Math.floor(Math.random() * columns);
            bombY = Math.floor(Math.random() * rows);
        }

        this.bombStack[bombY] = this.bombStack[bombY] || {};
        this.bombStack[bombY][bombX] = true;
    }

     calculateSuicideNeighbors(){
         for(let row = 0; row < this.board.length; row ++){
             for(let col = 0; col < this.board[row].length; col ++){
                 let isBomb = this.board[row][col].isBomb;
                 if(!isBomb){
                     this.board[row][col].suicideNeighbors = this.getSuicideNeighbors(row, col);
                 }
             }
         }
     }

     getSuicideNeighbors(row, col){
         let maxRow = Math.min(this.board.length-1, row+1),
             maxCol = Math.min(this.board[0].length-1, col+1),
             suicideNeighbors = 0;

         for(let minRow = Math.max(0, row-1); minRow <= maxRow; minRow++){
             for(let minCol = Math.max(0, col-1); minCol <= maxCol; minCol++){
                 suicideNeighbors += this.board[minRow][minCol].isBomb ? 1: 0;
             }
         }

         return suicideNeighbors;
     }

     isSuicideOrBombCell(cellInfo){
         return cellInfo.isBomb || cellInfo.suicideNeighbors > 0
     }
 }

 export default Minesweeper;