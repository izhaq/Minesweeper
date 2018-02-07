import CellInfo from './CellInfo';
import Minesweeper from './Minesweeper';

const rows = 2, columns = 2, totalMines = 1;
const minesweeper = new Minesweeper();
const bombStack = {};

const generateStaticBombs = ()=>{
    bombStack["0"] = [];
    bombStack["0"]["0"] = {hasFlag : false};
    // bombStack["0"]["2"] = {hasFlag : false};
    // bombStack["2"] = [];
    // bombStack["2"]["2"] = {hasFlag : false};
}

const setNewBoard = () =>{
    minesweeper.newGame(rows,columns,totalMines);
    generateStaticBombs();
    minesweeper.setBombStack(bombStack);
    minesweeper.setBoard(rows, columns);
    minesweeper.calculateSuicideNeighbors();
    minesweeper.setGameState({actionSuccess: true, state: this.board, gameOver: false});
}


beforeEach(() => {
    setNewBoard();
    console.log("eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee");
});


describe('Minesweeper', () => {
    it('board should be initialized', () => {
        const gameState = minesweeper.getGameState();
        console.log(gameState.state);
        expect(gameState.state).not.toBeNull();
    });


});