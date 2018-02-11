import React, { Component } from 'react';
import FlagLogo from './flag-camel.svg'
import MineLogo from './mine.svg'
import './cell.scss';


export default class Cell extends Component {
    constructor(props){
        super(props);
        this.state ={
            cellInfo: props.cellInfo
        }

        this.handleClick = this.handleClick.bind(this);
        this.className = this.className.bind(this);
        this.cellDescription = this.cellDescription.bind(this);
    }

    componentWillReceiveProps(nextProps){
        this.setState({
            cellInfo: nextProps.cellInfo
        });
    }

    handleClick(e){

        this.props.handleClick(this.state.cellInfo, (cellInfo) => this.openCell(cellInfo), e.shiftKey);
    }

    openCell(cellInfo){
        this.setState({
            cellInfo: cellInfo
        });
    }

    className(){
        const classNames = ["cell"];
        if(this.state.cellInfo.isOpen) {classNames.push("open-cell");} else {classNames.push("close-cell");}
        if(this.state.cellInfo.hasMine) {classNames.push("mine-cell");}
        if(this.state.cellInfo.superman) {classNames.push("superman");}
        if(this.state.cellInfo.hasFlag) {classNames.push("flag-cell");}
        if(this.state.cellInfo.suicideNeighbors) {classNames.push("mine-near-cell-"+this.state.cellInfo.suicideNeighbors);}

        return classNames.join(' ');
    }

    cellDescription(){
        return this.state.cellInfo.cellDescription();
    }

    render(){
        const flagLogo = this.state.cellInfo.hasFlag ? (<img src={FlagLogo} className="flag-logo" alt="flag-logo" />) : null;
        const mineLogo = this.state.cellInfo.hasMine ? (<img src={MineLogo} className="mine-logo" alt="mine-logo" />) : null;
        return (
            <div className="cell-container">
                <div className={this.className()} onClick={ this.handleClick } >
                    {flagLogo}
                    {mineLogo}
                    {this.cellDescription()}
                </div>
            </div>
        );
    }
}