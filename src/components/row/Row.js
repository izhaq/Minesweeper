import React, { Component } from 'react';
import './row.scss'
import Cell from '../cell/Cell.js';


export default class Row extends Component {
    constructor(props){
        super(props);
        this.state = {
            cells : props.cells,
            index: props.rowId
        }
    }

    componentWillReceiveProps(nextProps){
        this.setState({
            cells: nextProps.cells
        });
    }

    render(){
        let Cells = this.state.cells.map((cell, index)=>{
            return (
                <Cell key={index} cellInfo={cell} handleClick={this.props.handleClick}/>
            )
        })

        return (
            <div className="Row">
                {Cells}
            </div>
        );
    }
}
