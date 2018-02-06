import React, { Component } from 'react';
import Board from './components/board/Board'
import UserChoice from './components/user-choice/User-choice'
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
            setSupermanMode : false,
            reset: false
        }
        this.updateBoard = this.updateBoard.bind(this);
        this.updateUserChoice = this.updateUserChoice.bind(this);

    }


    updateBoard(updateInfo){
        this.setState({
            rows: updateInfo.rows,
            columns: updateInfo.columns,
            totalMines: updateInfo.totalMines,
            setSupermanMode : updateInfo.setSupermanMode
        });
    }

    updateUserChoice(updateInfo){
        this.setState({
            reset : updateInfo.reset || false,
            leftFlags: updateInfo.leftFlags
        });
    }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title"></h1>
        </header>
          <div className="widget-body">
              <UserChoice rows={this.state.rows} columns={this.state.columns} totalMines={this.state.totalMines} leftFlags={this.state.leftFlags}
                          superman={this.state.setSupermanMode} reset={this.state.reset} updateBoard={this.updateBoard}/>
              <div className="board-container">
                  <Board rows={this.state.rows} columns={this.state.columns} totalMines={this.state.totalMines}
                         setSupermanMode={this.state.setSupermanMode} updateUserChoice={this.updateUserChoice}/>
              </div>
          </div>
      </div>
    );
  }
}

export default App;
