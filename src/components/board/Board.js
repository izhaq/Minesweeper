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
            board : this.minesweeper.setNewGame(props.rows, props.columns, props.mines)
        }

        this.open = this.open.bind(this);
    }

    componentWillReceiveProps(nextProps){
        this.setState({numberOfRows: nextProps.rows,
            numberOfColumn: nextProps.columns,
            board: this.minesweeper.setNewGame(nextProps.rows, nextProps.columns, nextProps.mines)
        });
    }

    componentDidUpdate(){
        this.logger("updated board! ");
    }

    open(cell, updateSingleCell, markCell){
        let board = this.state.board;

        this.logger("before flood: ");

        board = this.minesweeper.play(cell.row, cell.col, markCell);

        this.logger("after flood: ");

        if(board.length === 1){
            updateSingleCell(board[0]);
        }else {
            this.setState({
                board: board
            });
        }
    }

    logger(desc){
        let date = new Date();
        date = date.getHours()+":"+ date.getMinutes() +":"+ date.getSeconds()+":"+ date.getMilliseconds();
        console.log(desc, date);
    }

    render(){
        let Rows = this.state.board.map((row, index)=>{
            return (
                <Row key={index} cells={row}  handleClick={this.open}/>
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