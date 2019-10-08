import React, { Component } from 'react';
import { Scene, Router, Actions } from 'react-native-router-flux';
import Home from './src/containers/Home';
import Mathematics from './src/containers/Mathematics';
import MainMath from './src/containers/MainMath';
import Settings from './src/containers/Settings';
import LoginForm from './src/containers/LoginForm';
import settings from './src/assets/svg/settings.svg';
import { connect } from 'react-redux';

class RouterComponent extends Component {
  constructor(props) {
    super(props);
  }

  componentWillReceiveProps(newProps) {
    console.log({ preview: 'Received new props', value: newProps });
    Actions.refresh();
  }

  render() {
    return (
      <Router
        navigationBarStyle={{
          backgroundColor: !this.props.darkMode ? 'white' : 'black',
          borderBottomColor: !this.props.darkMode ? 'white' : 'black',
          color: '#dddddd'
        }}
      >
        <Scene key="root">
          <Scene key="home" component={Home} intitial />
          <Scene key="login" component={LoginForm} title="Please Login" />

          <Scene
            rightTitle="Nastavenia"
            onRight={() => Actions.settings()}
            title=""
            key="mainMath"
            component={MainMath}
          />
          <Scene title="" key="mathematics" component={Mathematics} />
          <Scene title="" key="settings" component={Settings} />
        </Scene>
      </Router>
    );
  }
}

const mapStateToProps = state => {
  return {
    darkMode: state.state.darkMode
    // questionCounter: state.questions.questionCounter
  };
};

export default connect(mapStateToProps)(RouterComponent);

// const styles = StyleSheet.create({
//     container: {
//       flex: 1,
//       paddingTop:50,
//       justifyContent: 'center',
//       alignItems: 'center',
//       backgroundColor: '#F5FCFF',
//     }
//   });
