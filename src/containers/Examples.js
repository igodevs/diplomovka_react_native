import React, {Component} from 'react';
import { StyleSheet, Text, View, TextInput, Keyboard, ActivityIndicator} from 'react-native';
import { ProgressBar, Button } from 'react-native-paper';
import { connect } from 'react-redux';
import { setQuestionNumber} from '../Actions';
import { textStyle, containterStyle } from '../assets/styles';
import { AnimatedCircularProgress } from 'react-native-circular-progress';

const math = {
    ADDITION: 'addition',
    DIVISION: 'division',
    MULTIPlYING: 'multiplying',
    SUBTRACTION: 'substraction',
}

const mathEnum = {
    ADDITION: 0,
    SUBTRACTION: 1,
    MULTIPlYING: 2,
    DIVISION: 3, 
}

class Examples extends Component {
    constructor(props){
        super(props);

        this.state= {
            answer: undefined,
            answerColor: this.props.color,
            mark: '',
            example: null,
            timer: 15,
            ready: false,
            action: null,
            endTest: false,
            step: 0,
            epoch: 0
        }
    }

    componentDidMount(){
        // this.randomExample(null);
        this.startApplication();
        this.interval = setInterval(
          () => this.setState((prevState)=> ({ timer: prevState.timer - 1 })),
          1000
        );
      }
      
      componentDidUpdate(){
        if(this.state.timer === 0){ 
          clearInterval(this.interval);
        }
      }
      
      componentWillUnmount(){
       clearInterval(this.interval);
      }

    // validateAnswer = (counter) => {
    //     let answer = this.state.answer
    //     let example = this.state.example[0] + this.state.mark + this.state.example[1]

    //     this.setState({answerColor: answer != eval(example) ? 'red' : this.props.color})
    //     console.log()
    //     if(answer === eval(example)){
    //         if(counter+1 <= 10)
    //             this.props.onSetQuestionNumber(this.props.operation, counter+1)
    //             console.log(this.props.operation)
    //     }
    //     else {
    //         if(counter-1 >= 1)
    //             this.props.onSetQuestionNumber(this.props.operation, counter-1)
    //     }
    //     this.setState({timer: 16})
        
    // }

    startApplication = () => {
        fetch('http://127.0.0.1:5000/getZeros',{
            method: 'get',
            headers: {'Content-Type': 'application/json'},
        })
        .then(res => res.json())
        .then(data => {
            console.log(data)
            if(data.res === "success")
                this.getExample()
            
        })
        .catch(console.log)
    }

    getExample = () => {
        fetch('http://127.0.0.1:5000/train',{
            method: 'get',
            headers: {'Content-Type': 'application/json'},
        })
        .then(res => res.json())
        .then(data => {
            console.log(data)
            if(data.res === "ok"){
                console.log(data, data.a, data.b, data.action)
                var arr = [data.a, data.b]
                console.log(arr[0], arr[1])
                console.log(this.randomExample(data.action))

                this.setState({
                    example: arr,
                    action: data.action,
                    mark: this.randomExample(data.action),
                    step: data.step,
                    epoch: data.epoch
                })
                setTimeout(() => {
                    this.setState({ready: true})
                }, 300);
            }
            else{
                this.setState({endTest: true})
            }
        })
        .catch(console.log)
    }

    sendExample = () => {
        console.log(this.state.example[0],this.state.example[1],
            this.state.action,
            this.state.answer)
        fetch('http://localhost:5000/evaluate',{
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                a: this.state.example[0],
                b: this.state.example[1],
                action: this.state.action,
                userResponse: this.state.answer
            })
        })
        .then(res => res.json())
        .then(data => {
            // this.setState({answer:undefined})
            console.log(data)
            if(data.res === "success"){
                this.props.onSetQuestionNumber(this.props.operation, this.props.questionExamplesCounter+1)
                this.setState({answerColor: this.props.color})
            }
            else{
                this.setState({answerColor: 'red'})
            }
            this.setState({timer: 16})
            this.getExample()
        })
        .catch(console.log)
    }
    
    randomExample = (operation) => {
        let marks = [ '+', '/', '*', '-']
        let mark = '';
        console.log(operation, typeof(operation))
        switch(operation){
            // case math.ADDITION:
            //     mark = '+';
            //     break;
            // case math.DIVISION:
            //     mark = '/';
            //     break;
            // case math.MULTIPlYING:
            //     mark = '*';
            //     break;
            // case math.SUBTRACTION:
            //     mark = '-';
            //     break;
            case mathEnum.ADDITION:
                mark = '+';
                break;
            case mathEnum.DIVISION:
                mark = '/';
                break;
            case mathEnum.MULTIPlYING:
                mark = '*';
                break;
            case mathEnum.SUBTRACTION:
                mark = '-';
                break;
            default:
                let randomNumber = Math.floor(Math.random()*marks.length);
                mark = marks[randomNumber]
                break;

        }
        console.log(mark)
        return mark
            
    }

    onChanged = (text) => {
        console.log(text)
        console.log(parseInt(text))
        isNaN(parseInt(text)) ?
             this.setState({answer: undefined})
            :
            this.setState({answer: parseInt(text)})
    }


    render(){
        // if(this.state.endTest){
        //     <View onPress={Keyboard.dismiss}  style={[containterStyle(this.props.darkMode), {padding: 10, paddingTop: 30}]}>
        //         <Text>Koniec Testu</Text>
        //     </View>
        // }
        if(this.state.ready){
            if(this.state.endTest){
                return(
                    <View onPress={Keyboard.dismiss}  style={[containterStyle(this.props.darkMode), {padding: 10, paddingTop: 30}]}>
                        <Text>Koniec testu</Text>
                    </View>
                );
            }
            else{
                return(
                
                    <View onPress={Keyboard.dismiss}  style={[containterStyle(this.props.darkMode), {padding: 10, paddingTop: 30}]}>
                    
                        <Text onPress={Keyboard.dismiss} style={textStyle(this.props.darkMode)}>Test č. {this.state.epoch} príklad:</Text>
                        <Text onPress={Keyboard.dismiss} style={textStyle(this.props.darkMode)}>{this.state.step} z 5</Text>
                        <View onPress={Keyboard.dismiss} style={styles.boxes}>
                            <ProgressBar onPress={Keyboard.dismiss} progress={this.state.step* 0.2} color={this.props.color} />
                            <View onPress={Keyboard.dismiss} style={styles.Math}>
                                
                            <AnimatedCircularProgress 
                                size={150}
                                width={5}
                                backgroundWidth={5}
                                fill={this.state.timer >=1 ? this.state.timer * 6.6666 : 0}
                                tintColor="#00e0ff"
                                backgroundColor="#3d5875"
                                onPress={Keyboard.dismiss}
                                >
                                {
                                    (fill) => (
                                        <Text style = {[styles.textMath, {color: this.state.answerColor} ]}> {`${this.state.example[0]} ${this.state.mark === '/' ? '÷' : this.state.mark} ${this.state.example[1]}`} = {this.state.answer}</Text>
                                    )
                                }
                                </AnimatedCircularProgress>
                                
                            </View>
                        
                            <View onPress={Keyboard.dismiss} style={styles.buttons}>
                                <TextInput 
                                    style={styles.textInput}
                                    keyboardType='numeric'
                                    onChangeText={(text)=> this.onChanged(text)}
                                    value={this.state.answer}
                                    maxLength={2}  //setting limit of input
                                />
                                <Button mode="contained" style = {[styles.button, {backgroundColor: this.props.color}]}
                                onPress= {() => this.sendExample()}>Potvrdit</Button>
                            </View>   
                        </View>
                    </View>
                );
            }
        }  
        else{
            return(
                <View onPress={Keyboard.dismiss}  style={[containterStyle(this.props.darkMode), {padding: 10, paddingTop: 30}]}>
                    <ActivityIndicator size="large" color={this.props.color} />
                </View>
            );
        }
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
        height: 200,
        justifyContent: 'center',
        alignItems: 'center'
    },
    textMath: {
        height: 30,
        fontSize: 25,
        marginRight:4
    },
    buttons: {
        height: 200,
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        height: 40,
        width: '45%',
        marginBottom: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textInput: {
        height: 40,
        width: '45%',
        marginBottom: 10,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#eeeeee',
        textAlign: 'center'
    }
})

const mapStateToProps = state => {
    return {
        operation: state.state.operation,
        color: state.state.color,
        darkMode: state.state.darkMode,
        questionExamplesCounter: state.questions.questionExamplesCounter
    }
  }
  
  const mapDispatchToProps = (dispatch) => {
    return {
        onSetQuestionNumber: (operation, number) => dispatch(setQuestionNumber(operation, number))
    }
  }
  

export default connect(mapStateToProps, mapDispatchToProps)(Examples);