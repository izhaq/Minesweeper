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
                this.showMassage(this.gameState.stateDesc);
                this.props.update({action: ACTIONS.RESET});
        },50)};
    }

    setGameState(){
        this.gameState = this.minesweeper.getGameState();
        this.setState({
            board: this.gameState.state
        });
    }

    updateFlagsLeft(newFlag){
        if(newFlag){
            this.props.update({action: ACTIONS.FLAG_CHANGE, leftFlags: this.gameState.leftFlags});
        }
    }

    updateBoard(updateClickedCell, newFlag){
        if(this.gameState.singleUpdate()){
            updateClickedCell(this.gameState.state[0]);
            this.updateFlagsLeft(newFlag);
        }else {
            this.setState({
                board: this.gameState.state
            });
        }
    }

    showMassage(message){
        alert(message);
    }

    open(cell, updateClickedCell, newFlag){

        this.minesweeper.play(cell.row, cell.col, newFlag);
        this.gameState = this.minesweeper.getGameState();

        if(this.gameState.actionSuccess){
            this.updateBoard(updateClickedCell, newFlag);
            this.checkGameStatus();
        }else{this.showMassage(this.gameState.stateDesc)}
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