export default class GameStateInfo{
    constructor(gameState){
        this.actionSuccess = gameState.actionSuccess;
        this.state = gameState.state ;
        this.gameOver = gameState.gameOver;
        this.gameOverDesc = gameState.gameOverDesc;
        this.stateDesc = gameState.stateDesc;
    }
}