import React, { Component } from 'react';
import PropTypes from 'prop-types'
import './User-choice.scss'


class UserChoice extends Component {
    constructor(props){
        super(props);
        this.state = {
            rows: 10,
            columns: 10,
            totalMines: 10,
            superman: false
        }

        this.handleRowChange = this.handleRowChange.bind(this);
        this.handleColumnsChange = this.handleColumnsChange.bind(this);
        this.notifyListeners = this.notifyListeners.bind(this);
        this.handleSupermanMode = this.handleSupermanMode.bind(this);

    }

    componentWillUpdate(prevProps, prevState){
    }

    componentDidUpdate(prevProps, prevState){
    }

    notifyListeners(){
        this.props.notify({rows: this.state.rows, columns: this.state.columns, totalMines: this.state.totalMines});
    }


    handleSupermanMode(){
        this.setState({superman: !this.state.superman},()=>{
            this.props.notify({setSupermanMode: true, isSupermanModeOn: this.state.superman});
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
        this.setState({totalMines: mines});
    }

    render(){
        return (
            <div className="User-choice">
                <div className="superman-mode">
                    <input onChange={this.handleSupermanMode} id="superman" type="checkbox" checked={this.state.superman} />
                    <label htmlFor="superman">Label</label>
                </div>
                <div className="row-choice">
                    <span className="choice-desc">Rows</span>
                    <input className="user-input" type="text" value={this.state.rows} onChange={(e) => this.handleRowChange(e)} />
                </div>
                <div className="column-choice">
                    <span className="choice-desc">Columns</span>
                    <input className="user-input" type="text" value={this.state.columns} onChange={(e) => this.handleColumnsChange(e)}/>
                </div>
                <div className="mine-choice">
                    <span className="choice-desc">Mines</span>
                    <input className="user-input" type="text" value={this.state.totalMines} onChange={(e) => this.handleMinesChange(e)}/>
                </div>
                <div className="reset-container">
                    <button onClick={this.notifyListeners}>
                        Reset
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