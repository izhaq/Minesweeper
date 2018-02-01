import React, { Component } from 'react';
import './Cell.scss';


class Cell extends Component {
    constructor(props){
        super(props);
        this.state ={
            cellInfo: props.cellInfo,
            status: "Cell"
        }

        this.handleClick = this.handleClick.bind(this);
        this.getClass = this.getClass.bind(this);
        this.getCellDescription = this.getCellDescription.bind(this);
    }

    componentWillReceiveProps(nextProps){
        this.setState({
            cellInfo: nextProps.cellInfo
        });
    }

    handleClick(){
        this.props.handleClick(this.state.cellInfo);
    }

    getClass(){
        let cellType = this.state.cellInfo.isBomb ? "bomb " : "";
        return cellType.concat(this.state.cellInfo.status);
    }

    getCellDescription(){
        let desc = this.state.cellInfo.status === "revealed" ?
                    this.state.cellInfo.suicideNeighbors > 0 ? this.state.cellInfo.suicideNeighbors :
                                                               this.state.cellInfo.isBomb ? "B": "": "" ;
        return desc;
    }

    render(){
        return (
            <div className={"Cell ".concat(this.getClass())} onClick={ this.handleClick } >
                {this.getCellDescription()}
            </div>
        );
    }
}

export default Cell;