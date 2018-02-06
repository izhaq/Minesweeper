import React from 'react';
import {mount} from 'enzyme';
import Cell from './Cell';
import CellInfo from '../../modal/CellInfo';

describe('Cell', () => {
    it('should show mine', () => {
        const haveMine = true;
        const cellInfo = new CellInfo(0,0, haveMine);
        const cell = mount(<Cell cellInfo={cellInfo}></Cell>);

        expect(cell.find('.mine-cell').length).toBe(1);
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