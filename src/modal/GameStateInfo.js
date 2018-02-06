export default class GameState{
    constructor(gameState){
        this.actionSuccess = gameState.actionSuccess;
        this.state = gameState.state ;
        this.gameOver = gameState.gameOver;
        this.gameOverDesc = gameState.gameOverDesc;
        this.stateDesc = gameState.stateDesc;
        this.leftFlags = gameState.leftFlags || gameState.totalMines;
        this.totalMines = gameState.totalMines;
    }

    singleUpdate(){
        return this.state && this.state.length === 1;
    }
}