/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow 

 Press Cmd+R to reload,{'\n'}
 Cmd+D or shake for dev menu
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  TextInput,
  ScrollView,
  View,
  Image,
  TouchableOpacity
} from 'react-native';

export default class WhereInTheWorldiOS extends Component {

    
  render() {
    return (
      <View style={styles.container}>
          <SignUp />
      </View>
    );
  }
}



class SignUp extends Component{
  render(){
    return(
      <View style={styles.container}>
      <View style={styles.container} />
        <View style={styles.wrapper}>
          <View style={styles.inputWrap}>
            <TextInput
              placeholder="Username"
              style={styles.input}
            />
          </View>
          <View style={styles.inputWrap}>
            <TextInput
              placeholder="Password"
              secureTextEntry
              style={styles.input}
            />
          </View>
          <TouchableOpacity activeOpacity={.5}>
            <View style={styles.button}>
              <Text style={styles.buttonText}>Sign In</Text>
            </View>
          </TouchableOpacity>
           <TouchableOpacity activeOpacity={.5}>
            <View>
              <Text style={styles.registerText}>Create Account</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.container} />
        </View>
      );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#a9a9a9'
  },
 
  background: {
    width: null,
    height: null
  },

  wrapper: {
    paddingHorizontal: 15
  },

  inputWrap: {
    flexDirection: "row",
    marginVertical: 10,
    height: 40,
    backgroundColor: "transparent"
  },

  input: {
    flex: 1,
    paddingHorizontal: 10,
    backgroundColor: '#FFF'
  },

  button: {
    backgroundColor: '#1e90ff',
    paddingVertical: 15,
    marginVertical: 15,
    alignItems: "center",
    justifyContent: "center"
  },

  buttonText: {
    fontSize: 18
  },

  registerText: {
    color: '#FFF',
    backgroundColor: "transparent",
    textAlign: "center"
  }
});

AppRegistry.registerComponent('WhereInTheWorldiOS', () => WhereInTheWorldiOS);
