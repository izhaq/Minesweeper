export default class CellInfo{
    constructor(row, col, isBomb){
        this.row = row;
        this.col = col;
        this.isOpen = false;
        this.hasMine = isBomb;
        this.hasFlag = false;
        this.suicideNeighbors = 0;
        this.superman = false;
    }

    cellDescription(){
        let description = "";
        if(this.isOpen) {
            if(this.suicideNeighbors){description = this.suicideNeighbors}
            else {description = ""}
        }

        return description;
    }
}