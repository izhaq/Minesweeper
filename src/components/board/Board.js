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
            board : this.minesweeper.setNewGame(props.rows, props.columns, props.totalMines),
            setSupermanMode : props.setSupermanMode,
            isSupermanModeOn: props.isSupermanModeOn
        }

        this.open = this.open.bind(this);
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.setSupermanMode){
            this.setState({
                board: this.minesweeper.setSupermanMode().state
            });
        }else {
            this.setState({
                numberOfRows: nextProps.rows,
                numberOfColumn: nextProps.columns,
                board: this.minesweeper.setNewGame(nextProps.rows, nextProps.columns, nextProps.totalMines)
            });
        }
    }

    componentDidUpdate(){
        this.logger("updated board! ");
    }

    open(cell, updateSingleCell, markCell){
        this.logger("before flood: ");

        let gameState = this.minesweeper.play(cell.row, cell.col, markCell);

        this.logger("after flood: ");

        if(gameState.actionSuccess){
            if(gameState.state.length === 1){
                updateSingleCell(gameState.state[0]);
            }else {
                this.setState({
                    board: gameState.state
                });
            }
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