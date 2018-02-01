import CellInfo from './CellInfo';

class Minesweeper {

    constructor(){
        this.opendCells = [];
        this.bombStack = {};
    }

     openNeighbors(row, col, rows){
         this.openCell(row, col, rows);

         while(this.opendCells.length>0){
             let toFill = this.opendCells.pop();
             this.openCell(toFill[0], toFill[1], rows);
         }

         return rows;
     }

     openCell(row, col, rows){
         if(!this.isCellRevealed(row, col, rows)){
             rows[row][col].status = rows[row][col].status = "revealed";
         }
         if(rows[row][col].isBomb || rows[row][col].suicideNeighbors > 0) {return;}

         if(!this.isCellRevealed(row,   col-1, rows) && this.isCellValidToOpen(row,   col-1, rows)) {this.opendCells.push([row,   col-1])};
         if(!this.isCellRevealed(row+1, col, rows) && this.isCellValidToOpen(row+1, col, rows)) {this.opendCells.push([row+1, col  ])};
         if(!this.isCellRevealed(row,   col+1, rows) && this.isCellValidToOpen(row,   col+1, rows)) {this.opendCells.push([row,   col+1])};
         if(!this.isCellRevealed(row-1, col, rows) && this.isCellValidToOpen(row-1, col, rows)) {this.opendCells.push([row-1, col  ])};
         if(!this.isCellRevealed(row-1, col-1, rows) && this.isCellValidToOpen(row-1, col-1, rows)) {this.opendCells.push([row-1, col-1  ])};
         if(!this.isCellRevealed(row-1, col+1, rows) && this.isCellValidToOpen(row-1, col+1, rows)) {this.opendCells.push([row-1, col+1  ])};
         if(!this.isCellRevealed(row+1, col-1, rows) && this.isCellValidToOpen(row+1, col-1, rows)) {this.opendCells.push([row+1, col-1  ])};
         if(!this.isCellRevealed(row+1, col+1, rows) && this.isCellValidToOpen(row+1, col+1, rows)) {this.opendCells.push([row+1, col+1  ])};
     }

     isCellRevealed(row, col, rows){
         if(!rows[row] || (rows[row] && !rows[row][col])) return true;

         return rows[row][col].status === "revealed";
     }

     isCellValidToOpen(row, col, rows){
         if(!rows[row] || (rows[row] && !rows[row][col])) return false;

         let cellNotValid = rows[row][col].isBomb;

         return !cellNotValid;
     }

     resetBoard(rows, columns, numOfbombs){
         let board = [];

         this.generateBombs(numOfbombs, rows, columns);

         for(let row = 0; row < rows; row ++){
             board.push([]);
             for(let col = 0; col < columns; col ++){
                 let isBomb = this.bombStack[row] && this.bombStack[row][col];
                 board[row].push(new CellInfo(row, col, isBomb));
             }
         }
         this.calculateSuicideNeighbors(rows, columns, board);

         return board;
     }

     calculateSuicideNeighbors(rows, columns, board){
         for(let row = 0; row < rows; row ++){
             for(let col = 0; col < columns; col ++){
                 let isBomb = board[row][col].isBomb;
                 if(!isBomb){
                     board[row][col].suicideNeighbors = this.getSuicideNeighbors(row, col, board);
                 }
             }
         }
     }

     getSuicideNeighbors(row, col, rows){
         let endRow = Math.min(rows.length-1, row+1),
             endCol = Math.min(rows[0].length-1, col+1),
             suicideNeighbors = 0;

         for(let startRow = Math.max(0, row-1); startRow <= endRow; startRow++){
             for(let startCol = Math.max(0, col-1); startCol <= endCol; startCol++){
                 suicideNeighbors += rows[startRow][startCol].isBomb ? 1: 0;
             }
         }

         return suicideNeighbors;
     }

     generateBombs(numBombs, rows, columns) {
         this.bombStack = {};

         for(let bomb = 0; bomb<numBombs; bomb++) {
             this.generateBomb(rows, columns);
         }
     }

     generateBomb(rows, columns) {
         let x = Math.floor(Math.random() * columns),
             y = Math.floor(Math.random() * rows);

         while(this.bombStack[y] && this.bombStack[y][x]){
             x = Math.floor(Math.random() * columns);
             y = Math.floor(Math.random() * rows);
         }

         this.bombStack[y] = this.bombStack[y] || {};
         this.bombStack[y][x] = true;
     }
 }

 export default Minesweeper;