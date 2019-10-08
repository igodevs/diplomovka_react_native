import React, {Component} from 'react';
import {Platform, StyleSheet, Text, TouchableOpacity} from 'react-native';

export default class Box extends Component {
    constructor(props){
        super(props);
    }

    render(){
        return(
            <TouchableOpacity style={[styles.box, this.props.color]} onPress = {this.props.onPress}>
                <Text style={styles.text} >{this.props.text}</Text>
                {this.props.children}
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    box: {
        flex: 1,
        height: 200,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 3,
        marginBottom: 3
    },
    text: {
        fontSize: 18,
    }
})