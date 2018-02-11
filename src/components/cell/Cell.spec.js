import React from 'react';
import {mount} from 'enzyme';
import Cell from './Cell';
import CellInfo from '../../modal/CellInfo';

describe('Cell', () => {
    it('should not be open by default', () => {
        const cellInfo = new CellInfo(0, 0);
        const cell = mount(<Cell cellInfo={cellInfo}></Cell>);

        expect(cell.find('.open-cell').length).not.toBe(1);
    });

    it('should be close when superman state is on', () => {
        const haveMine = true;
        const cellInfo = new CellInfo(0, 0, haveMine);
        cellInfo.superman = true;
        const cell = mount(<Cell cellInfo={cellInfo}></Cell>);

        expect(cell.find('.close-cell').hasClass('superman')).toBeTruthy();
    });
    it('should be open and show how many mines exist around him', () => {
        const cellInfo = new CellInfo(0, 0);
        cellInfo.suicideNeighbors = 5;
        cellInfo.isOpen = true;
        const cell = mount(<Cell cellInfo={cellInfo}></Cell>);

        expect(cell.find('.mine-near-cell-5').text()).toBe("5");
    });
    it('should show close mine', () => {
        const haveMine = true;
        const cellInfo = new CellInfo(0,0, haveMine);
        const cell = mount(<Cell cellInfo={cellInfo}></Cell>);

        expect(cell.find('.mine-cell').length).toBe(1);
        expect(cell.find('.mine-cell').text()).toBe("")
    });

    it('should show flag', () => {
        const cellInfo = new CellInfo();
        cellInfo.hasFlag = true;
        const cell = mount(<Cell cellInfo={cellInfo}></Cell>);

        expect(cell.find('.flag-cell').length).toBe(1);
    });

    it('should not show flag by default', () => {
        const cellInfo = new CellInfo();
        const cell = mount(<Cell cellInfo={cellInfo}></Cell>);

        expect(cell.find('.flag-cell').length).not.toBe(1);
    });
});