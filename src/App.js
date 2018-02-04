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
            setSupermanMode : false,
            isSupermanModeOn: false
        }
        this.updateUserSelection = this.updateUserSelection.bind(this);
    }


    updateUserSelection(updateInfo){
        this.setState({
            rows: updateInfo.rows,
            columns: updateInfo.columns,
            totalMines: updateInfo.totalMines,
            setSupermanMode : updateInfo.setSupermanMode,
            isSupermanModeOn: updateInfo.isSupermanModeOn
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
              <div className="board-container">
                  <UserChoice notify={this.updateUserSelection}/>
                  <Board rows={this.state.rows} columns={this.state.columns} totalMines={this.state.totalMines}
                         setSupermanMode={this.state.setSupermanMode} isSupermanModeOn={this.state.isSupermanModeOn}/>
              </div>
          </div>
      </div>
    );
  }
}

export default App;
