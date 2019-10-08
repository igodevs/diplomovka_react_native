import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { emailChanged, passwordChanged, loginUser } from '../Actions';
import { Card, CardSection, Input, Button, Spinner } from '../common';
import { textStyle, containterStyle, containerLoginStyle } from '../assets/styles';

class LoginForm extends Component {

    onEmailChange(text) {
        this.props.emailChanged(text);
    }

    onPasswordChange(text) {
        this.props.passwordChanged(text);
    }

    onButtonPress() {
        const { email, password } = this.props;
        this.props.loginUser({ email, password });
    }

    renderError() {
        if (this.props.error) {
            return (
                <View style={{ backgroundColor: 'white' }}>
                    <Text style={styles.errorTextStyle}>
                        {this.props.error}
                    </Text>
                </View>
            );
        }
    }

    renderButton() {
        if (this.props.loading) {
           return <Spinner size='large' />;
        }

        return <Button onPress={this.onButtonPress.bind(this)} text={'Prihlásiť sa'} />;
    }

    render() {
        return (
            // <View style={[containterStyle(this.props.darkMode)]}>
            <View style={containerLoginStyle(this.props.darkMode)}>
            <Card>
                <CardSection>
                    <Input 
                        label="Email"
                        placeholder="user@gmail.com"
                        onChangeText={this.onEmailChange.bind(this)}
                        value={this.props.email}
                    />
                </CardSection>
                    
                <CardSection>
                    <Input 
                        secureTextEntry
                        label="Heslo"
                        placeholder="*******"
                        onChangeText={this.onPasswordChange.bind(this)}
                        value={this.props.password}
                    />
                </CardSection>

                {this.renderError()}

                <CardSection>
                    
                    {this.renderButton()}
                </CardSection>
            </Card>
           </View>
        );
    }
}

const styles = {
    errorTextStyle: {
        fontSize: 20,
        alignSelf: 'center',
        color: 'red',
        paddingTop: 5,
    }
};

const mapStateToProps = state => {
    return {
        operation: state.state.operation,
        color: state.state.color,
        email: state.state.email,
        password: state.state.password,
        error: state.state.error,
        loading: state.state.loading,
        darkMode: state.state.darkMode,
        questionMultiplyingCounter: state.questions.questionMultiplyingCounter
    }
  }

  const mapDispatchToProps = (dispatch) => {
    return {
        emailChanged: (text) => dispatch(emailChanged(text)),
        passwordChanged: (text) => dispatch(passwordChanged(text)),
        loginUser: (object) => dispatch(loginUser(object))
    }
  }
  

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
