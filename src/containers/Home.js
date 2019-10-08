import React, {Component} from 'react';
import { Text, StyleSheet, Button, View, ScrollView} from 'react-native';
import { Actions } from 'react-native-router-flux';
import Box from '../components/Box/Box'
import { connect } from 'react-redux';
import {setOperation} from '../Actions';
import { textStyle, containterStyle } from '../assets/styles';

class Home extends Component {

    componentDidMount(){
      console.log(this.props.operation)
    }

    render(){
        return(
            <View style={containterStyle(this.props.darkMode)}>
                {
                  this.props.user === null 
                ?
                <Button title ="Prihlásiť sa" onPress={() => Actions.login()}/>
                :
                <Button title ="Začať" onPress={() => Actions.mainMath()}/>
                }
            </View>
        );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  boxes: {
    display: 'flex',
    width: '100%',
    height: 1200,
    padding: 10,
    marginBottom: 0
  }
});

const mapStateToProps = state => {
  return {
      operation: state.state.operation,
      darkMode: state.state.darkMode,
      user: state.state.user
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
      onSetOperation: (operation, color) => dispatch(setOperation(operation, color))
  }
}



export default connect(mapStateToProps, mapDispatchToProps)(Home);