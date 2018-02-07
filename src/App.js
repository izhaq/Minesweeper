import React, { Component } from 'react';
import Board from './components/board/Board'
import UserChoice from './components/user-choice/User-choice'
import {ACTIONS} from './modal/Constants';
import logo from './logo.svg';
import './App.css';




class App extends Component {

    constructor(){
        super();
        this.state = {
            rows: 10,
            columns: 10,
            totalMines: 10,
            leftFlags: 10,
            superman : false,
            action: ACTIONS.NEW_GAME
        }
        this.update = this.update.bind(this);

    }


    update(data){
        if(data.action === ACTIONS.RESET){
            this.setState({
                superman: false,
                leftFlags: this.state.totalMines,
                action: ACTIONS.NEW_GAME
            });
        }
        if(data.action === ACTIONS.NEW_GAME){
            this.setState({
                rows: data.rows,
                columns: data.columns,
                totalMines: data.totalMines,
                leftFlags: data.totalMines,
                superman : false,
                action: ACTIONS.NEW_GAME
            });
        }
        if(data.action === ACTIONS.SUPERMAN){
            this.setState({
                action: ACTIONS.SUPERMAN,
                superman: !this.state.superman
            });
        }
        if(data.action === ACTIONS.FLAG_CHANGE){
            this.setState({
                action: ACTIONS.FLAG_CHANGE,
                leftFlags: data.leftFlags
            });
        }
    }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title"></h1>
        </header>
          <div className="widget-body">
              <UserChoice rows={this.state.rows} columns={this.state.columns} totalMines={this.state.totalMines}
                          leftFlags={this.state.leftFlags} action={this.state.action} update={this.update}/>
              <div className="board-container">
                  <Board rows={this.state.rows} columns={this.state.columns} totalMines={this.state.totalMines}
                         superman={this.state.superman} action={this.state.action} update={this.update}/>
              </div>
          </div>
      </div>
    );
  }
}

export default App;
