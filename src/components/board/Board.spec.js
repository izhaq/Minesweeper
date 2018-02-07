import React from 'react';
import {mount} from 'enzyme';
import Board from './Board';
import Row from "../row/Row";
import CellInfo from '../../modal/CellInfo';

const generatBoard = (props) =>{
    return mount(<Board rows={props.row} columns={props.col} totalMines={props.mines} action={props.action}></Board>);
}

describe('Board', () => {
    it('should render rows', () => {
        const row = 2, col = 2, mines = 2, action = "new_game";
        const board = generatBoard({row: row, col: col, action: action, mines: mines});

        expect(board.find(Row).length).toBe(row);
    });

    it('should pass props to rows', () => {
        const row = 1, col = 2, mines = 1, action = "new_game";
        const board = generatBoard({row: row, col: col, action: action, mines: mines});

        expect(board.find(Row).prop('cells')).toBe(board.state().board[0]);
    });

    it('should initialize instance properties', () => {
        const row = 1, col = 2, mines = 1, action = "new_game";
        const board = generatBoard({row: row, col: col, action: action, mines: mines});

        expect(board.instance().gameState).not.toBeNull();
        expect(board.instance().minesweeper).not.toBeNull();
    });

    it('selecting mine cell should results in game over', () => {
        const row = 2, col = 2, mines = 0, action = "new_game";
        const board = generatBoard({row: row, col: col, action: action, mines: mines});
        const clickedCell = new CellInfo(0,0, false);

        expect(board.instance().gameState.gameOver).toBeFalsy();
        board.instance().open(clickedCell);
        expect(board.instance().gameState.gameOver).toBeTruthy();
    });

    it('selecting mine cell should results in you', () => {
        const row = 2, col = 2, mines = 0, action = "new_game";
        const board = generatBoard({row: row, col: col, action: action, mines: mines});
        const clickedCell = new CellInfo(0,0, false);

        expect(board.instance().gameState.gameOver).toBeFalsy();
        board.instance().open(clickedCell);
        expect(board.instance().gameState.gameOver).toBeTruthy();
    });
});