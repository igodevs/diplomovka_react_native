import React, {Component} from 'react';
import Addition from './Addition';
import Substraction from './Substraction';
import Multiplying from './Multiplying';
import Division from './Division';
import Examples from './Examples';
import { connect } from 'react-redux';

class Mathematics extends Component {

    render(){
        switch(this.props.operation){
            case 'addition':
                return(
                    <Addition />
                );
            case 'substraction':
                return(
                    <Substraction />
                );
            case 'multiplying':
                return(
                    <Multiplying />
                );
            case 'division':
                return(
                    <Division />
                );
            case 'examples':
                return(
                    <Examples />
                );
        }
    }
}

const mapStateToProps = state => {
    return {
        operation: state.state.operation,
    }
}
  

export default connect(mapStateToProps)(Mathematics);