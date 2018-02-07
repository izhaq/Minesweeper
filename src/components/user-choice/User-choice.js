import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {ACTIONS, MESSAGES} from '../../modal/Constants';
import './user-choice.scss'


class UserChoice extends Component {
    constructor(props){
        super(props);
        this.state = {
            rows: props.rows,
            columns: props.columns,
            totalMines: props.totalMines,
            superman: false
        }

        this.updateUserInput = this.updateUserInput.bind(this);
        this.newGame = this.newGame.bind(this);
        this.handleSuperman = this.handleSuperman.bind(this);

    }

    componentWillReceiveProps(nextProps){
        if(nextProps.action === ACTIONS.NEW_GAME){
            this.resetSuperman();
        }
    }

    resetSuperman(){
        this.setState({
            superman: false
        })
    }

    newGame(){
        if(this.maxNumberOfMinesExceeded()){alert(MESSAGES.MAX_MINE_EXCEEDED);}
        else{
            this.resetSuperman();
            this.props.update({rows: this.state.rows, columns: this.state.columns, totalMines: this.state.totalMines, action: ACTIONS.NEW_GAME});
        }
    }


    handleSuperman(){
        this.setState({superman: !this.state.superman},()=>{
            this.props.update({action: ACTIONS.SUPERMAN});
        });

    }

    updateUserInput(prop, e){
        let newState = {};
        newState[prop] = e.target.value;
        this.setState(newState);
    }

    maxNumberOfMinesExceeded(){
        return this.state.rows*this.state.columns < this.state.totalMines;
    }

    render(){
        return (
            <div className="User-choice">
                <div className="superman-mode">
                    <input onChange={this.handleSuperman} id="superman" type="checkbox" checked={this.state.superman} />
                    <label htmlFor="superman">Superman</label>
                </div>
                <div className="row-choice">
                    <span className="choice-desc">Rows</span>
                    <input className="user-input" type="text" value={this.state.rows} onChange={(e)=>{this.updateUserInput("rows", e)}} />
                </div>
                <div className="column-choice">
                    <span className="choice-desc">Columns</span>
                    <input className="user-input" type="text" value={this.state.columns} onChange={(e)=>{this.updateUserInput("columns", e)}}/>
                </div>
                <div className="mine-choice">
                    <span className="choice-desc">Mines</span>
                    <input className="user-input" type="text" value={this.state.totalMines} onChange={(e)=>{this.updateUserInput("totalMines", e)}}/>
                </div>
                <div className="flag-left">
                    <span className="choice-desc">Left flags: {this.props.leftFlags}</span>
                </div>
                <div className="reset-container">
                    <button onClick={this.newGame}>
                        New Game
                    </button>
                </div>
            </div>
        );
    }
}

UserChoice.propTypes = {
    notify: PropTypes.func
};

export default UserChoice;