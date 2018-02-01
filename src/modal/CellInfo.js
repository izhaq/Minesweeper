export default class Cell{
    constructor(row, col, isBomb){
        this.row = row;
        this.col = col;
        this.status = "hidden";
        this.isBomb = isBomb;
    }
}