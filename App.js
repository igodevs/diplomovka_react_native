/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, ScrollView} from 'react-native';
import { Provider } from 'react-redux';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import reducers from './src/reducers';
import Router from './Router';
import Box from './src/components/Box/Box';
import firebase from 'firebase';

// const instructions = Platform.select({
//   ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
//   android:
//     'Double tap R on your keyboard to reload,\n' +
//     'Shake or press menu button for dev menu',
// });

const logger = createLogger();

export default class App extends Component {

  componentWillMount(){
    const config = {
      apiKey: "AIzaSyCYXirsXgjKK1GAto6DZHQ-z_wPraIA9nU",
      authDomain: "diplomovka-76167.firebaseapp.com",
      databaseURL: "https://diplomovka-76167.firebaseio.com",
      projectId: "diplomovka-76167",
      storageBucket: "diplomovka-76167.appspot.com",
      messagingSenderId: "778415840635"
    };
    
    firebase.initializeApp(config);
  }

  render() {
    return (
      // <View style={styles.container}>
      //   
      // </View>

      <Provider store={createStore(reducers, {}, applyMiddleware(logger, thunkMiddleware))}>
          <Router />
      </Provider>
    );
  }
}


