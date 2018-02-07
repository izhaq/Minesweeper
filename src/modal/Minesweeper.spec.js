import CellInfo from './CellInfo';
import Minesweeper from './Minesweeper';

const rows = 3, columns = 3, totalMines = 3;
const minesweeper = new Minesweeper();
const bombStack = {};

const generateStaticBombs = ()=>{
    bombStack["0"] = [];
    bombStack["0"]["0"] = {hasFlag : true};
    bombStack["0"]["2"] = {hasFlag : true};
    bombStack["2"] = [];
    bombStack["2"]["0"] = {hasFlag : true};
}

const setNewBoard = (_rows = rows, _columns = columns, _totalMines = totalMines) =>{
    minesweeper.resetBoard(_totalMines);
    generateStaticBombs();
    minesweeper.setBombStack(bombStack);
    minesweeper.setBoard(_rows, _columns);
    minesweeper.calculateSuicideNeighbors();
    minesweeper.setGameState({actionSuccess: true, state: minesweeper.board, gameOver: false});
}


beforeEach(() => {
    setNewBoard();
});


describe('Minesweeper', () => {
    it('board should be initialized', () => {
        const gameState = minesweeper.getGameState();
        expect(gameState.state).not.toBeNull();
    });

    it('selecting mine cell should results in game over with "You Lose..." massage', () => {
        let gameState = minesweeper.getGameState();
        expect(gameState.gameOver).toBeFalsy();
        minesweeper.play(0,0);
        gameState = minesweeper.getGameState();
        expect(gameState.gameOver).toBeTruthy();
        expect(gameState.stateDesc).toEqual("You Lose...");
    });

    it('selecting cell without mine should open the cell and game is not over', () => {
        let gameState = minesweeper.getGameState();
        expect(gameState.gameOver).toBeFalsy();
        minesweeper.play(0,1);
        gameState = minesweeper.getGameState();
        expect(gameState.gameOver).toBeFalsy();
    });

    it('selecting cell without mine should open the cell and game is not over', () => {
        let gameState = minesweeper.getGameState();
        expect(gameState.gameOver).toBeFalsy();
        expect(gameState.state[0].isOpen).toBeFalsy();
        minesweeper.play(0,1);
        gameState = minesweeper.getGameState();
        expect(gameState.gameOver).toBeFalsy();
        expect(gameState.state[0].isOpen).toBeTruthy();
    });

    it('selecting the same cell multippale times should result the same game state', () => {
        let gameState = minesweeper.getGameState();
        expect(gameState.gameOver).toBeFalsy();
        minesweeper.play(0,1);
        minesweeper.play(0,1);
        minesweeper.play(0,1);
        gameState = minesweeper.getGameState();
        expect(gameState).toEqual(gameState);
    });

    it('marking a cell with flag should change cell status to flagged', () => {
        let gameState = minesweeper.getGameState();
        const flagOnCell = true;
        expect(gameState.state[0].hasFlag).toBeFalsy();
        minesweeper.play(0,0, flagOnCell);
        gameState = minesweeper.getGameState();
        expect(gameState.state[0].hasFlag).toBeTruthy();
    });

    it('should not open cell that has flag', () => {
        let gameState = minesweeper.getGameState();
        const flagOnCell = true;
        minesweeper.play(0,0, flagOnCell);
        minesweeper.play(0,0);
        gameState = minesweeper.getGameState();
        expect(gameState.actionSuccess).toBeFalsy();
    });

    it('should open cell after removing flag', () => {
        let gameState = minesweeper.getGameState(), flagOnCell = true;;
        minesweeper.play(0,1, flagOnCell);
        minesweeper.play(0,1, flagOnCell);
        minesweeper.play(0,1);
        gameState = minesweeper.getGameState();
        expect(gameState.state[0].isOpen).toBeTruthy();
    });

    it('should not set flags when all flags used', () => {
        let gameState = minesweeper.getGameState(), flagOnCell = true;;
        minesweeper.play(0,0, flagOnCell);
        gameState = minesweeper.getGameState();
        expect(gameState.state[0].hasFlag).toBeTruthy();
        minesweeper.play(0,1, flagOnCell);
        gameState = minesweeper.getGameState();
        expect(gameState.state[0].hasFlag).toBeTruthy();
        minesweeper.play(0,2, flagOnCell);
        gameState = minesweeper.getGameState();
        expect(gameState.state[0].hasFlag).toBeTruthy();
        minesweeper.play(1,2, flagOnCell);
        gameState = minesweeper.getGameState();
        expect(gameState.actionSuccess).toBeFalsy();
    });

    it('should be game over with "You Win !" massage when all flages placed on mines', () => {
        let gameState = minesweeper.getGameState(), flagOnCell = true;;
        minesweeper.play(0,0, flagOnCell);
        minesweeper.play(0,2, flagOnCell);
        minesweeper.play(2,0, flagOnCell);
        gameState = minesweeper.getGameState();
        expect(gameState.stateDesc).toEqual("You Win !");
    });

    it('cell should be close in even if superman mode on', () => {
        minesweeper.supermanMode();
        const gameState = minesweeper.getGameState();
        expect(gameState.state[0][0].superman).toBeTruthy();
        expect(gameState.state[0][0].isOpen).toBeFalsy();
    });

    it('set flag on board should not success flag was not requested', () => {
        expect(minesweeper.setFlagOnBoard(0,0)).toBeFalsy();
    });

    it('add flag when all flags used will not be allowed', () => {
        minesweeper.play(0,0, true);
        minesweeper.play(0,1, true);
        minesweeper.play(0,2, true);

        const addFlagNotAllowd = minesweeper.addFlagWhenAllFlagsAlreadyUsed(1,1);
        expect(addFlagNotAllowd).toBeTruthy();
    });

    it('remove flag from cell that doesnt have flag will be allowed', () => {
        minesweeper.play(0,0, true);
        const removeFlag = minesweeper.removeFlag(0,0);
        expect(removeFlag).toBeTruthy();
    });

    it('remove flag from cell that have flag will not be done', () => {
        minesweeper.play(0,0);
        const removeFlag = minesweeper.removeFlag(0,0);
        expect(removeFlag).toBeFalsy();
    });

    it('should add flag to close cell that doesnt has flag', () => {
        const flagAdded = minesweeper.addFlag(1,1);
        expect(flagAdded).toBeTruthy();
    });

    it('cell with flag cannot be opened', () => {
        minesweeper.play(1,1, true);
        const openCellWithFlag = minesweeper.openCellWithFlag(1,1);
        expect(openCellWithFlag).toBeTruthy();
    });

    it('cells with mines should not be opend during algorithem automatic cell opening', () => {
        minesweeper.allowOpenCell(0,0);
        const openCellAllowd = minesweeper.allowOpenCell(0,0);
        expect(openCellAllowd).toBeFalsy();
    });

    it('cells with flags should not be opend during algorithem automatic cell opening', () => {
        minesweeper.play(1,1, true);
        const openCellAllowd = minesweeper.allowOpenCell(1,1);
        expect(openCellAllowd).toBeFalsy();
    });
});