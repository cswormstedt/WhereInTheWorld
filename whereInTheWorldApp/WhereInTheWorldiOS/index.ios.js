/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

export default class WhereInTheWorldiOS extends Component {
  render() {

    getInitialState: function(){
    return {loggedIn: true, username: ''
    

    return (
      
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to WhereApp!
        </Text>
        <Text style={styles.instructions}>
          Press Cmd+R to reload,{'\n'}
          Cmd+D or shake for dev menu
        </Text>
      </View>
    );
  }
}




/**
* COMPONENTS
*
*
*/
//sign up/log in










/**
*   END
*COMPONENTS
*
*/

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('WhereInTheWorldiOS', () => WhereInTheWorldiOS);
