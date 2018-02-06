import React, { Component } from 'react';
import PropTypes from 'prop-types'
import './User-choice.scss'


class UserChoice extends Component {
    constructor(props){
        super(props);
        this.state = {
            rows: props.rows,
            columns: props.columns,
            totalMines: props.totalMines,
            superman: props.superman,
            leftFlags: props.leftFlags
        }

        this.handleRowChange = this.handleRowChange.bind(this);
        this.handleColumnsChange = this.handleColumnsChange.bind(this);
        this.handleMinesChange = this.handleMinesChange.bind(this);
        this.notifyListeners = this.notifyListeners.bind(this);
        this.handleSupermanMode = this.handleSupermanMode.bind(this);

    }

    componentWillReceiveProps(nextProps){
        if(nextProps.reset){this.resetSelection();}
        if(nextProps.leftFlags){}
    }

    resetSelection(){
        this.setState({
            superman: false,
            leftFlags: this.state.totalMines
        })
    }

    notifyListeners(){
        if(this.maxNumberOfMinesExceeded(this.state.rows, this.state.columns, this.state.totalMines)){
            alert("maximum number of mines exceeded !");
        }else{
            this.resetSelection();
            this.props.updateBoard({rows: this.state.rows, columns: this.state.columns, totalMines: this.state.totalMines});
        }
    }


    handleSupermanMode(){
        this.setState({superman: !this.state.superman},()=>{
            this.props.updateBoard({setSupermanMode: true});
        });

    }

    handleRowChange(e){
        let rows = e.target.value;
        this.setState({rows: rows});
    }

    handleColumnsChange(e){
        let column = e.target.value;
        this.setState({columns: column});
    }

    handleMinesChange(e){
        let mines = e.target.value;
        this.setState({
            totalMines: mines,
            leftFlags: mines
        });

    }

    maxNumberOfMinesExceeded(){
        return this.state.rows*this.state.columns < this.state.totalMines;
    }

    render(){
        return (
            <div className="User-choice">
                <div className="superman-mode">
                    <input onChange={this.handleSupermanMode} id="superman" type="checkbox" checked={this.state.superman} />
                    <label htmlFor="superman">Superman</label>
                </div>
                <div className="row-choice">
                    <span className="choice-desc">Rows</span>
                    <input className="user-input" type="text" value={this.state.rows} onChange={this.handleRowChange} />
                </div>
                <div className="column-choice">
                    <span className="choice-desc">Columns</span>
                    <input className="user-input" type="text" value={this.state.columns} onChange={this.handleColumnsChange}/>
                </div>
                <div className="mine-choice">
                    <span className="choice-desc">Mines</span>
                    <input className="user-input" type="text" value={this.state.totalMines} onChange={this.handleMinesChange}/>
                </div>
                <div className="flag-left">
                    <span className="choice-desc">Left flags: {this.state.leftFlags}</span>
                </div>
                <div className="reset-container">
                    <button onClick={this.notifyListeners}>
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