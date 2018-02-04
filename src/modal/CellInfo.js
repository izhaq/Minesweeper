export default class Cell{
    constructor(row, col, isBomb){
        this.row = row;
        this.col = col;
        this.isOpen = false;
        this.hasMine = isBomb;
        this.hasFlag = false;
        this.suicideNeighbors = 0;
        this.superman = false;
    }
}