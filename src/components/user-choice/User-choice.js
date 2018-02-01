import React, { Component } from 'react';
import PropTypes from 'prop-types'
import './User-choice.scss'


class UserChoice extends Component {
    constructor(props){
        super(props);
        this.state = {
            rows: 10,
            columns: 10,
            mines: 10
        }

        this.handleRowChange = this.handleRowChange.bind(this);
        this.handleColumnsChange = this.handleColumnsChange.bind(this);
        this.notifyListeners = this.notifyListeners.bind(this);
    }

    componentWillUpdate(prevProps, prevState){
    }

    componentDidUpdate(prevProps, prevState){
    }

    notifyListeners(){
        this.props.notify({rows: this.state.rows, columns: this.state.columns, mines: this.state.mines});
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
        this.setState({mines: mines});
    }

    render(){
        return (
            <div className="User-choice">
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
                    <input className="user-input" type="text" value={this.state.mines} onChange={(e) => this.handleMinesChange(e)}/>
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