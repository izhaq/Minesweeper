import React, { Component } from 'react';
import './Cell.scss';


class Cell extends Component {
    constructor(props){
        super(props);
        this.state ={
            cellInfo: props.cellInfo
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

    handleClick(e){
        this.props.handleClick(this.state.cellInfo, this.openCell.bind(this), e.shiftKey);
    }

    openCell(cellInfo){
        this.setState({
            cellInfo: cellInfo
        });
    }

    getClass(){
        let classNames = this.state.cellInfo.isOpen ? "open-cell ": "close-cell ";
        classNames = this.state.cellInfo.hasMine ? classNames.concat("mine-cell ") : classNames;
        classNames = this.state.cellInfo.superman ? classNames.concat("superman ") : classNames;
        classNames = this.state.cellInfo.hasFlag ? classNames.concat("flag-cell ") : classNames;
        classNames = this.state.cellInfo.suicideNeighbors ? classNames.concat("mine-near-cell-"+this.state.cellInfo.suicideNeighbors+" ") : classNames;

        return classNames;
    }

    getCellDescription(){
        let desc = this.state.cellInfo.isOpen ?
                        this.state.cellInfo.suicideNeighbors ? this.state.cellInfo.suicideNeighbors :
                                                               this.state.cellInfo.hasMine ? "B": "": "" ;
        return desc;
    }

    render(){
        return (
            <div className="cell-container">
                <div className={"cell ".concat(this.getClass())} onClick={ this.handleClick } >
                    {this.getCellDescription()}
                </div>
            </div>
        );
    }
}


export default Cell;