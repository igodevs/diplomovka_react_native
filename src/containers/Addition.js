import React, {Component} from 'react';
import { Platform, StyleSheet, Text, View} from 'react-native';
import { ProgressBar, Colors, Button } from 'react-native-paper';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { setQuestionNumber} from '../Actions';
import { textStyle, containterStyle } from '../assets/styles';

class Addition extends Component {
    constructor(props){
        super(props);

        this.state= {
            answer: undefined,
            answerColor: this.props.color
        }
    }

    validateAnswer = (answer, counter) => {
        this.setState({answer})
        this.setState({answerColor: answer != 6 ? 'red' : this.props.color})
        if(answer === 6){
            if(counter+1 <= 20)
                this.props.onSetQuestionNumber(this.props.operation, counter+1)
        }
        else {
            if(counter-1 >= 1)
                this.props.onSetQuestionNumber(this.props.operation, counter-1)
        }
        
    }
    


    render(){
            return(
                <View style={[containterStyle(this.props.darkMode), {padding: 10, paddingTop: 30}]}>
                    <Text style={textStyle(this.props.darkMode)}>Sčítanie</Text>
                    <Text style={textStyle(this.props.darkMode)}>{this.props.questionAdditionCounter} z 20</Text>
                    <View style={styles.boxes}>
                    <ProgressBar progress={this.props.questionAdditionCounter * 0.05} color={this.props.color} />
                        
                        <View style={styles.Math}>
                            <Text style = {[styles.textMath, {color: this.state.answerColor} ]}> 1 + 5 = {this.state.answer}</Text>
                        </View>
                        {/* <Button  title={"click"} 
                        onPress={() => {this.props.onSetQuestionNumber(this.props.operation, this.props.questionAdditionCounter+1) 
                        // Actions.refresh({key: 'Addition', title: `${this.props.questionAdditionCounter+1} za 20`})
                        }}
                        /> */}
                        <View style={styles.buttons}>
                            <Button mode="contained" style = {[styles.button, {marginRight: 10, backgroundColor: this.props.color}]}
                            onPress= {() => this.validateAnswer(2, this.props.questionAdditionCounter)}>1</Button>
                            <Button mode="contained" style = {[styles.button, {backgroundColor: this.props.color}]}
                            onPress= {() => this.validateAnswer(6, this.props.questionAdditionCounter)}>6</Button>
                            <Button mode="contained" style = {[styles.button, { marginRight: 10, backgroundColor: this.props.color}]}
                            onPress= {() => this.validateAnswer(3, this.props.questionAdditionCounter)}>3</Button>
                            <Button mode="contained" style = {[styles.button, {backgroundColor: this.props.color}]}
                            onPress= {() => this.validateAnswer(7, this.props.questionAdditionCounter)}>7</Button>
                        </View>
                    
                    </View>
                </View>
            );
        
    }
}

const styles = StyleSheet.create({
    boxes: {
        display: 'flex',
        width: '100%',
        height: 600,
        marginBottom: 0
    },
    Math: {
        height: 300,
        justifyContent: 'center',
        alignItems: 'center'
    },
    textMath: {
        height: 30,
        fontSize: 28,
    },
    buttons: {
        height: 200,
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        flexWrap: 'wrap'
    },
    button: {
        height: 40,
        width: '45%',
        marginBottom: 10,
        justifyContent: 'center',
        alignItems: 'center',
    }
})

const mapStateToProps = state => {
    return {
        operation: state.state.operation,
        color: state.state.color,
        darkMode: state.state.darkMode,
        questionAdditionCounter: state.questions.questionAdditionCounter
    }
  }
  
  const mapDispatchToProps = (dispatch) => {
    return {
        onSetQuestionNumber: (operation, number) => dispatch(setQuestionNumber(operation, number))
    }
  }
  

export default connect(mapStateToProps, mapDispatchToProps)(Addition);