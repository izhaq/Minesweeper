import CellInfo from './CellInfo';
import GameState from './GameStateInfo'



class Minesweeper {

    constructor(){
        this.opendCells = [];
        this.bombStack = {};
        this.board = [];
    }

     play(row, col, setFlag){
		 if(this.setFlagOnBoard(row, col, setFlag)){return;}

		 if(this.openCellWithFlag(row, col)){return;}

		 if(this.openMine(row, col)){return;}

         if(this.openSuicideNeighbors(row, col)){return;}

         this.travel(row, col);
     }

     supermanMode(){
         for(let row=0; row < this.board.length; row++){
             for(let col=0; col< this.board[row].length; col++){
                 if(this.board[row][col].hasMine){
                     this.board[row][col].superman = !this.board[row][col].superman;
                 }
             }
         }
         this.setGameState({actionSuccess: true, state: this.board, gameOver: false});
     }

    newGame(rows, columns, totalMines){

        this.resetBoard(totalMines);

        this.generateBombs(rows, columns);

        this.setBoard(rows, columns);

        this.calculateSuicideNeighbors();

        this.setGameState({actionSuccess: true, state: this.board, gameOver: false});
    }

    setGameState(gameState){
        gameState.totalMines = this.totalMines;
        gameState.leftFlags  = this.leftFlags();
        this.gameState = new GameState(gameState);
    }

    getGameState(){
        return this.gameState;
    }

    resetBoard(totalMines){
        this.opendCells = [];
        this.bombStack = {};
        this.board = []
        this.totalMines =  parseInt(totalMines);
        this.totalFlags = 0;
        this.successfullFlag = 0;
        this.totalOpenCellsWithoutMins = 0
    }

     setFlagOnBoard(row, col, flag){

        if(!flag){return false;}

        if(this.addFlagWhenAllFlagsAlreadyUsed(row, col)){return true;}

        if(this.removeFlag(row, col)){return true;}

        return this.addFlag(row, col);
     }

    leftFlags(){
        return this.totalMines - this.totalFlags;
    }

     addFlagWhenAllFlagsAlreadyUsed(row, col){
         if(!this.board[row][col].hasFlag && this.totalFlags === this.totalMines){
             this.setGameState({actionSuccess: false, stateDesc: "All flags already used !"});
             return true;
         }
         return false;
     }

     removeFlag(row, col){
         if(this.board[row][col].hasFlag){
             this.board[row][col].hasFlag = false;
             this.totalFlags--;
             this.successfullFlag -= this.bombStack[row] && this.bombStack[row][col] ? 1: 0;
             this.setGameState({actionSuccess: true, state: [this.board[row][col]], gameOver: false});
             return true;
         }
         return false;
     }

     addFlag(row, col){
         this.board[row][col].hasFlag = true;
         this.totalFlags++;
         this.successfullFlag += this.bombStack[row] && this.bombStack[row][col]  ? 1: 0;
         if(this.gameOver()){
             this.setGameState({actionSuccess: true, state: [this.board[row][col]], gameOver: true, stateDesc: "you won !"});
         }else{this.setGameState({actionSuccess: true, state: [this.board[row][col]], gameOver: false});}

         return true;
     }

     openCellWithFlag(row, col){
         if(this.board[row][col].hasFlag){
             this.setGameState({actionSuccess: false, gameOver: false});
             return true;
         }
         return false;
     }

     gameOver(){
         return this.allFlagsSetOnMines() || this.mineOpend || this.allCellsWithoutMinesAreOpend();
     }

     allFlagsSetOnMines(){
         return this.successfullFlag === this.totalMines;
     }

     openMine(row, col){
         if(this.board[row][col].hasMine){
             this.board[row][col].isOpen = true;
             this.mineOpend = true
             this.setGameState({actionSuccess: true, state: [this.board[row][col]], gameOver: true, stateDesc: "you lose !"});
             return true;
         }
         return false;
     }

     openSuicideNeighbors(row, col){
         if(this.board[row][col].suicideNeighbors > 0){
             this.board[row][col].isOpen = true;
             this.totalOpenCellsWithoutMins++;
             this.setGameState({actionSuccess: true, state: [this.board[row][col]], gameOver: this.isGameOver(), stateDesc: "you win !"});

             return true;
         }
         return false;
     }

     travel(row, col){
         this.travelTheBoard(row, col, this.board);

         while(this.opendCells.length>0){
             let cellToOpen = this.opendCells.pop();
             this.travelTheBoard(cellToOpen[0], cellToOpen[1]);
         }

         if(this.allCellsWithoutMinesAreOpend()) {
             this.setGameState({actionSuccess: true, state: this.board, gameOver: true, stateDesc: "you won !"})
         }else{this.setGameState({actionSuccess: true, state: this.board, gameOver: false});}
    }

    allCellsWithoutMinesAreOpend(){
         return this.totalOpenCellsWithoutMins === ((this.board.length * this.board[0].length) - this.totalMines)
    }

     travelTheBoard(row, col){
         if(!this.isCellTraveled(row, col)){
             this.board[row][col].isOpen = true;
             this.totalOpenCellsWithoutMins++;
         }

         if(this.suicideNeighborOrMine(this.board[row][col])){return;}

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

     suicideNeighborOrMine(cellInfo){
         return cellInfo.hasMine || cellInfo.suicideNeighbors > 0
     }

     isGameOver(){
        return  this.totalOpenCellsWithoutMins === ((this.board.length * this.board[0].length) - this.totalMines)
     }
 }

 export default Minesweeper;