import React from 'react';
import {mount} from 'enzyme';
import Row from './Row';
import CellInfo from "../../modal/CellInfo";
import Cell from "../cell/Cell";

describe('Row', () => {
    it('should render cells', () => {
        const cellsData = [new CellInfo(), new CellInfo()];
        const rowOfCells = mount(<Row cells={cellsData}></Row>);

        expect(rowOfCells.find(Cell).length).toBe(cellsData.length);
    });

    it('should pass props to cells', () => {
        const cellData = new CellInfo();
        const rowOfCells = mount(<Row cells={[cellData]}></Row>);

        expect(rowOfCells.find(Cell).prop('cellInfo')).toBe(cellData);
    });
});