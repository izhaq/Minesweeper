import React from 'react';
import {mount} from 'enzyme';
import UserChoice from './User-choice';

const generatUserChoice = (props) =>{
    return mount(<UserChoice rows={props.row} columns={props.col} totalMines={props.mines} action={props.action} leftFlags={props.leftFlags}></UserChoice>);
}

let row = 2, col = 2, mines = 2, leftFlags = 2, action = "new_game", userChoice = {};

describe('UserChoice', () => {
    beforeEach(() => {
        userChoice = generatUserChoice({row: row, col: col, action: action, mines: mines, leftFlags:leftFlags});
    });

    it('should render input box for rows, columns, totalMines', () => {

        expect(userChoice.find('.row-choice .user-input').length).toBe(1);
        expect(userChoice.find('.column-choice .user-input').length).toBe(1);
        expect(userChoice.find('.mine-choice .user-input').length).toBe(1);

    });

    it('rows, columns, totalMines has default values', () => {

        expect(userChoice.find('.row-choice .user-input').props().value).toBe(row);
        expect(userChoice.find('.column-choice .user-input').props().value).toBe(col);
        expect(userChoice.find('.mine-choice .user-input').props().value).toBe(mines);
    });

    it('should render input checkbox for superman mode', () => {
        expect(userChoice.find('#superman').length).toBe(1);
    });

    it('superman mode should be off by default', () => {
        expect(userChoice.find('#superman').props().checked).toBeFalsy();
    });

    it('changing superman will change the checkbox to be checked/unchecked', () => {
        const spy = jest.spyOn(userChoice.instance(), 'updateBoard').mockImplementation(()=>{});
        const supermanCheckBox = userChoice.find('#superman');

        userChoice.find('#superman').simulate('change');
        expect(userChoice.find('#superman').props().checked).toBeTruthy();
        userChoice.find('#superman').simulate('change');
        expect(userChoice.find('#superman').props().checked).toBeFalsy();
    });

    it('changing superman to on/off will notify to the board', () => {
        const spy = jest.spyOn(userChoice.instance(), 'updateBoard').mockImplementation(()=>{});

        userChoice.find('#superman').simulate('change');
        expect(spy).toHaveBeenCalled();
    });

    it('changing row will set new value in the value and the corresponds state property', () => {
        const newRows = 20;

        userChoice.find('.row-choice .user-input').simulate('change', { target: { value: newRows } });
        expect(userChoice.find('.row-choice .user-input').props().value).toBe(newRows);
        expect(userChoice.state().rows).toBe(newRows);
    });

    it('changing row to negative or string will not be allowed', () => {
        let newRows = -1;

        userChoice.find('.row-choice .user-input').simulate('change', { target: { value: newRows } });
        expect(userChoice.find('.row-choice .user-input').props().value).not.toBe(newRows);
        expect(userChoice.state().rows).not.toBe(newRows);

        newRows = "abc";

        userChoice.find('.row-choice .user-input').simulate('change', { target: { value: newRows } });
        expect(userChoice.find('.row-choice .user-input').props().value).not.toBe(newRows);
        expect(userChoice.state().rows).not.toBe(newRows);
    });

    it('changing columns will set new value in the value and the corresponds state property', () => {
        const newColumns = 15;

        userChoice.find('.column-choice .user-input').simulate('change', { target: { value: newColumns } });
        expect(userChoice.find('.column-choice .user-input').props().value).toBe(newColumns);
        expect(userChoice.state().columns).toBe(newColumns);
    });

    it('changing Columns to negative or string will not be allowed', () => {
        let newColumns = -1;

        userChoice.find('.column-choice .user-input').simulate('change', { target: { value: newColumns } });
        expect(userChoice.find('.column-choice .user-input').props().value).not.toBe(newColumns);
        expect(userChoice.state().rows).not.toBe(newColumns);

        newColumns = "abc";

        userChoice.find('.column-choice .user-input').simulate('change', { target: { value: newColumns } });
        expect(userChoice.find('.column-choice .user-input').props().value).not.toBe(newColumns);
        expect(userChoice.state().rows).not.toBe(newColumns);
    });


    it('changing number of mines will set new value in the value and the corresponds state property', () => {
        const newTotalMines = 15;

        userChoice.find('.mine-choice .user-input').simulate('change', { target: { value: newTotalMines } });
        expect(userChoice.find('.mine-choice .user-input').props().value).toBe(newTotalMines);
        expect(userChoice.state().totalMines).toBe(newTotalMines);
    });

    it('changing number of mines to negative or string will not be allowed', () => {
        let newTotalMines = -1;

        userChoice.find('.mine-choice .user-input').simulate('change', { target: { value: newTotalMines } });
        expect(userChoice.find('.mine-choice .user-input').props().value).not.toBe(newTotalMines);
        expect(userChoice.state().rows).not.toBe(newTotalMines);

        newTotalMines = "abc";

        userChoice.find('.mine-choice .user-input').simulate('change', { target: { value: newTotalMines } });
        expect(userChoice.find('.mine-choice .user-input').props().value).not.toBe(newTotalMines);
        expect(userChoice.state().rows).not.toBe(newTotalMines);
    });
});