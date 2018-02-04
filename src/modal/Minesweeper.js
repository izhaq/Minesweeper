import CellInfo from './CellInfo';
import GameStateInfo from './GameStateInfo'

class Minesweeper {

    constructor(){
        this.opendCells = [];
        this.bombStack = {};
        this.board = [];
    }
    
    resetBoard(totalMines){
        this.opendCells = [];
        this.bombStack = {};
        this.board = []
        this.totalMines =  parseInt(totalMines);
        this.totalFlags = 0;
        this.successfullFlag = 0;
        this.totalOpenCellsWithoutMins = 0,
        this.supermanMode = false
    }

     play(row, col, setFlag){

        if(setFlag){
            return this.setFlagOnBoard(row, col);
        }

        if(this.board[row][col].hasFlag){
            return new GameStateInfo({actionSuccess: false, gameOver: false});
        }

        if(this.board[row][col].hasMine){
            this.board[row][col].isOpen = true;
            return new GameStateInfo({actionSuccess: true, state: [this.board[row][col]], gameOver: true, stateDesc: "you lose !"});
        }

        if(this.board[row][col].suicideNeighbors > 0){
            this.board[row][col].isOpen = true;
            this.totalOpenCellsWithoutMins++;
            return new GameStateInfo({actionSuccess: true, state: [this.board[row][col]], gameOver: this.isGameOver(), stateDesc: "you win !"});
        }

        return this.travel(row, col);

     }

     setSupermanMode(){
         for(let row=0; row < this.board.length; row++){
             for(let col=0; col< this.board[row].length; col++){
                 if(this.board[row][col].hasMine){
                     this.board[row][col].superman = !this.board[row][col].superman;
                 }
             }
         }

         return new GameStateInfo({actionSuccess: true, state: this.board, gameOver: false});
     }

     setFlagOnBoard(row, col){
        // case 1: if all flags already been used and this current cell doesn't
        // have flag - can't set any new flag before an existing one will be removed
        if(!this.board[row][col].hasFlag && this.totalFlags === this.totalMines){
            return new GameStateInfo({actionSuccess: false, stateDesc: "All flags already used !"});
        }

        //case 2: flag already exist on this current cell - flag will be removed
         if(this.board[row][col].hasFlag){
             this.board[row][col].hasFlag = false;
             this.totalFlags--;
             this.successfullFlag -= this.bombStack[row] && this.bombStack[row][col] ? 1: 0;

             return new GameStateInfo({actionSuccess: true, state: [this.board[row][col]], gameOver: false});
         }

         //case 3: flag doesn't exist - set this cell with flag and chck if all mine were marked with cell
         this.board[row][col].hasFlag = true;
         this.totalFlags++;
         this.successfullFlag += this.bombStack[row] && this.bombStack[row][col]  ? 1: 0;
         if(this.successfullFlag === this.totalMines){
             return new GameStateInfo({actionSuccess: true, state: [this.board[row][col]], gameOver: true, stateDesc: "you won !"});
         }

         return new GameStateInfo({actionSuccess: true, state: [this.board[row][col]], gameOver: false});
     }

     travel(row, col){
         this.travelTheBoard(row, col, this.board);

         while(this.opendCells.length>0){
             let cellToOpen = this.opendCells.pop();
             this.travelTheBoard(cellToOpen[0], cellToOpen[1]);
         }

         let gameStateInfo =  this.totalOpenCellsWithoutMins === ((this.board.length * this.board[0].length) - this.totalMines) ?
             new GameStateInfo({actionSuccess: true, state: this.board, gameOver: true, stateDesc: "you won !"}) :
             new GameStateInfo({actionSuccess: true, state: this.board, gameOver: false});

         return gameStateInfo;
    }

     travelTheBoard(row, col){
         if(!this.isCellTraveled(row, col)){
             this.board[row][col].isOpen = true;
             this.totalOpenCellsWithoutMins++;
         }

         if(this.isSuicideNeighborOrBombCell(this.board[row][col])){return;}

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

        let cellNotBomb = !this.board[row][col].hasMine,
            cellNotFlagged = !this.board[row][col].hasFlag,
            cellNotOpen = !this.isCellTraveled(row, col);

        return cellNotOpen && cellNotBomb && cellNotFlagged;
    }

     isCellTraveled(row, col){
         if(!this.board[row] || (this.board[row] && !this.board[row][col])) return true;

         return this.board[row][col].isOpen;
     }

     setNewGame(rows, columns, totalMines){

         this.resetBoard(totalMines);

         this.generateBombs(rows, columns);

         this.setBoard(rows, columns);

         this.calculateSuicideNeighbors();

         return this.board;
     }

     setBoard(rows, columns){
         for(let row = 0; row < rows; row ++){
             this.board.push([]);
             for(let col = 0; col < columns; col ++){
                 let hasMine = this.bombStack[row] && this.bombStack[row][col];
                 this.board[row].push(new CellInfo(row, col, hasMine));
             }
         }
     }

    generateBombs(rows, columns) {
        for(let bomb = 0; bomb<this.totalMines; bomb++) {
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

        this.bombStack[bombY] = this.bombStack[bombY] || [];
        this.bombStack[bombY][bombX] = {hasFlag : false};
    }

     calculateSuicideNeighbors(){
         for(let row = 0; row < this.board.length; row ++){
             for(let col = 0; col < this.board[row].length; col ++){
                 let hasMine = this.board[row][col].hasMine;
                 if(!hasMine){
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
                 suicideNeighbors += this.board[minRow][minCol].hasMine ? 1: 0;
             }
         }

         return suicideNeighbors;
     }

     isSuicideNeighborOrBombCell(cellInfo){
         return cellInfo.hasMine || cellInfo.suicideNeighbors > 0
     }

     isGameOver(){
        return  this.totalOpenCellsWithoutMins === ((this.board.length * this.board[0].length) - this.totalMines)
     }
 }

 export default Minesweeper;