import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, ScrollView} from 'react-native';
import { Actions } from 'react-native-router-flux';
import Box from '../components/Box/Box'
import { connect } from 'react-redux';
import {setOperation} from '../Actions';
import { textStyle, containterStyle } from '../assets/styles';

class Home extends Component {
    constructor(props){
        super(props);
    }

    componentDidMount(){
      console.log(this.props.operation)
    }

    render(){
        return(
            <View style={containterStyle(this.props.darkMode)}>
                <ScrollView style={styles.boxes}>
                  <Box text= 'Matematika' color={{backgroundColor: '#00A572'}} onPress= {() => {
                      this.props.onSetOperation("examples", "#00A572")
                      Actions.mathematics()
                    }}/>
                  <Box text= 'Sčítanie' color={{backgroundColor:'#FFCF43'}} onPress= {() => {
                      this.props.onSetOperation("addition", "#FFCF43")
                      Actions.mathematics()
                    }}/>
                  <Box text= 'Odčítanie' color={{backgroundColor:'#5CE0D8'}} onPress= {() => {
                      this.props.onSetOperation("substraction", "#5CE0D8")
                      Actions.mathematics()
                    }}/>
                  <Box  text= 'Násobenie' color={{backgroundColor: '#FE4A49'}} onPress= {() => {
                      this.props.onSetOperation("multiplying", "#FE4A49")
                      Actions.mathematics()
                    }}/>
                  <Box text= 'Delenie' color={{backgroundColor: '#0D9EDF'}} onPress= {() => {
                      this.props.onSetOperation("division", "#0D9EDF")
                      Actions.mathematics()
                    }}/>
                </ScrollView>
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
      darkMode: state.state.darkMode
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
      onSetOperation: (operation, color) => dispatch(setOperation(operation, color))
  }
}



export default connect(mapStateToProps, mapDispatchToProps)(Home);