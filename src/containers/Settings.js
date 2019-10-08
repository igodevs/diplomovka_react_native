import React, {Component} from 'react';
import {StyleSheet, Text, View, Button} from 'react-native';
import { connect } from 'react-redux';
import {setDarkMode} from '../Actions';
import { textStyle, containterStyle } from '../assets/styles';
import { Actions } from 'react-native-router-flux';


class Settings extends Component {
    constructor(props){   
        super(props);
    }

    componentDidMount(){
        console.log(this.props.darkMode)
    }


    render(){
        return(
            <View style={[containterStyle(this.props.darkMode), {paddingTop: 30}]}>
                <Button title="História testov"/>
                <Button  title={!this.props.darkMode ? "Zapnúť Dark Mode" : "Vypnúť Dark Mode"} onPress={() => {
                    this.props.onSetDarkMode(!this.props.darkMode)
                    Actions.refresh({titleStyle: {color: 'red'}})
                }
                }/>
            </View>
            
        )
        
        
    }
}

const mapStateToProps = state => {
    return {
        darkMode: state.state.darkMode
    }
  }
  
  const mapDispatchToProps = (dispatch) => {
    return {
        onSetDarkMode: (bool) => dispatch(setDarkMode(bool))
    }
  }
  

export default connect(mapStateToProps, mapDispatchToProps)(Settings);