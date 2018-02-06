import React, { Component } from 'react';
import Minesweeper from '../../modal/Minesweeper'
import PropTypes from 'prop-types'
import './board.scss'
import Row from '../row/Row.js';


class Board extends Component {
    constructor(props){
        super(props);
        this.minesweeper = new Minesweeper();
        this.minesweeper.newGame(props.rows, props.columns, props.totalMines);
        this.gameState = this.minesweeper.getGameState();

        this.state = {
            board : this.gameState.state
        }

        this.open = this.open.bind(this);
        this.checkGameStatus = this.checkGameStatus.bind(this);
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.setSupermanMode) {this.minesweeper.supermanMode();}
        else {this.minesweeper.newGame(nextProps.rows, nextProps.columns, nextProps.totalMines)}

        this.setGameState();
    }

    componentDidUpdate(){
        this.checkGameStatus();
    }

    checkGameStatus(){
        if(this.gameState.gameOver){
            setTimeout(()=>{
                alert(this.gameState.stateDesc);
                this.props.updateUserChoice({reset: true});
                this.minesweeper.newGame(this.state.board.length, this.state.board[0].length,
                    this.gameState.totalMines);
                this.setGameState();
        },50)};
    }

    setGameState(){
        this.gameState = this.minesweeper.getGameState();
        this.setState({
            board: this.gameState.state
        });
    }

    open(cell, updateSingleCell, markCell){
        this.minesweeper.play(cell.row, cell.col, markCell);

        this.gameState = this.minesweeper.getGameState();

        if(this.gameState.actionSuccess){
            if(this.gameState.singleUpdate()){
                updateSingleCell(this.gameState.state[0]);
                this.checkGameStatus();
            }else {
                this.setState({
                    board: this.gameState.state
                });
            }
        }
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