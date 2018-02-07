import React, { Component } from 'react';
import Minesweeper from '../../modal/Minesweeper';
import {ACTIONS} from '../../modal/Constants';
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
        if(nextProps.action === ACTIONS.SUPERMAN && this.props.superman !== nextProps.superman) {
            this.minesweeper.supermanMode();
            this.setGameState();
        }
        if(nextProps.action === ACTIONS.NEW_GAME){
            this.minesweeper.newGame(nextProps.rows, nextProps.columns, nextProps.totalMines);
            this.setGameState();
        }
    }


    checkGameStatus(){
        if(this.gameState.gameOver){
            setTimeout(()=>{
                alert(this.gameState.stateDesc);
                this.props.update({action: ACTIONS.RESET});
        },50)};
    }

    setGameState(){
        this.gameState = this.minesweeper.getGameState();
        this.setState({
            board: this.gameState.state
        });
    }

    updateFlagsLeft(prevLeftFlags){
        if(prevLeftFlags !== this.gameState.leftFlags){
            this.props.update({action: ACTIONS.FLAG_CHANGE, leftFlags: this.gameState.leftFlags});
        }
    }

    open(cell, updateSingleCell, setFlag){
        const prevFlagsLeft = this.gameState.leftFlags;

        this.minesweeper.play(cell.row, cell.col, setFlag);
        this.gameState = this.minesweeper.getGameState();

        if(this.gameState.actionSuccess){
            if(this.gameState.singleUpdate()){
                updateSingleCell(this.gameState.state[0]);
                this.updateFlagsLeft(prevFlagsLeft);
            }else {
                this.setState({
                    board: this.gameState.state
                });
            }
            this.checkGameStatus();
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

export default Board;