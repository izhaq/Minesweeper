import React, { Component } from 'react';
import Minesweeper from '../../modal/Minesweeper'
import PropTypes from 'prop-types'
import './Board.scss'
import Row from '../row/Row.js';


class Board extends Component {
    constructor(props){
        super(props);
        this.minesweeper = new Minesweeper();
        this.state = {
            numberOfRows : props.rows,
            numberOfColumn: props.columns,
            rows : this.minesweeper.resetBoard(props.rows, props.columns, props.mines)
        }

        this.openNeighbors = this.openNeighbors.bind(this);
    }

    componentWillReceiveProps(nextProps){
        this.setState({numberOfRows: nextProps.rows,
            numberOfColumn: nextProps.columns,
            rows: this.minesweeper.resetBoard(nextProps.rows, nextProps.columns, nextProps.mines)
        });

        //this.openNeighbors = this.openNeighbors.bind(this);
    }

    openNeighbors(cell){
        let _rows_ = this.state.rows;

        _rows_ =this.minesweeper.openNeighbors(cell.row, cell.col, _rows_);

        this.setState({
            rows: _rows_
        });
    }

    render(){
        let Rows = this.state.rows.map((cells, index)=>{
            return (
                <Row key={index} cells={cells}  handleClick={this.openNeighbors}/>
            )
        })

        return (
            <div className="Board">
                {Rows}
            </div>
        );
    }
}

Board.defaultProps = {
    numberOfRows:   10,
    numberOfColumn: 10,
}

Board.propTypes = {
    numberOfRows:   PropTypes.number,
    numberOfColumn: PropTypes.number
};

export default Board;