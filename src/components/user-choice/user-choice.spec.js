import React from 'react';
import {mount} from 'enzyme';
import UserChoice from './User-choice';

const generatUserChoice = (props) =>{
    return mount(<UserChoice rows={props.row} columns={props.col} totalMines={props.mines} action={props.action} leftFlags={props.leftFlags}></UserChoice>);
}

describe('UserChoice', () => {
    it('should render input box to number of rows', () => {
        const row = 2, col = 2, mines = 2, leftFlags = 2, action = "new_game";
        const board = generatUserChoice({row: row, col: col, action: action, mines: mines, leftFlags:leftFlags});

        expect(board.find('.row-choice .user-input').length).toBe(1);
    });

    it('has defaul properties', () => {
        const row = 2, col = 2, mines = 2, leftFlags = 2, action = "new_game";
        const userChoice = generatUserChoice({row: row, col: col, action: action, mines: mines, leftFlags:leftFlags});

        expect(userChoice.prop('rows')).toBe(row);
        expect(userChoice.prop('columns')).toBe(col);
        expect(userChoice.prop('totalMines')).toBe(mines);
    });
/*
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
    });*/
});