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
  Platform,
  Switch,
  Text,
  TextInput,
  ScrollView,
  View,
  Image,
  TouchableOpacity
} from 'react-native';

import { PROVIDER_GOOGLE, PROVIDER_DEFAULT, MapView } from 'react-native';


export default class WhereInTheWorldiOS extends Component {
  constructor(props) {
    super(props);
    this.state = {loggedIn: true, username: '', initialPosition: 'unknown', lastPosition: 'unknown'}
}
    watchID: ?number = null;

  //get all the places feed
  componentDidMount() {
      var state = this.state;
      var self  = this;
        fetch('http://localhost:9393/place')  
          .then(function(data) {
          return data.json()
          console.log(data.body)
          state.placeData = data.body;
          self.setState = data.body;
      })
      //this is the geolocation api
      navigator.geolocation.getCurrentPosition(
        (position) => {
          var initialPosition = JSON.stringify(position);
          this.setState({initialPosition});
        },
        (error) => alert(JSON.stringify(error)),
        {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
        );
        this.watchID = navigator.geolocation.watchPosition((position) => {
        var lastPosition = JSON.stringify(position);
        this.setState({lastPosition});
    });
}
  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID);
  }
  //post the lat and long
  checkIn() {
      var state = this.state;
      var self  = this;
        fetch('http://localhost:3000/place', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          latitudeParams: "latitude",
          longitudeParams: "longitude"
        })
      })  
    }


 
  render() {
    return (
      <View style={styles.container}>
          <Map />
      </View>
    );
  }
}


/**
*SIGN IN COMPONENT
*/
class SignIn extends Component{
  constructor(props) {
    super(props);
    this.state = { usernameValue: '', passwordValue: '' }
  }

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

/**
*SIGN UP COMPONENT
*/
class SignUp extends Component{
  constructor(props) {
    super(props);
    this.state = { usernameValue: '', passwordValue: '' }
  }

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
              <Text style={styles.buttonText}>Sign Up</Text>
            </View>
          </TouchableOpacity>
           <TouchableOpacity activeOpacity={.5}>
            <View>
              <Text style={styles.registerText}>Already have an account?</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.container} />
        </View>
      );
  }
}


/**
*HOME COMPONENT
*
*/
class HomeFeed extends Component {
  constructor(props) {
    super(props);
    this.state = {placeData: []}
  }


  render() {

    // var placeInfo = this.props.placeData.map((place, i) =>{
    //   return <li key={i}> {place} </li>
    // })
    return(
      <View>
        <TouchableOpacity activeOpacity={.5}>
            <View style={styles.button}>
              <Text style={styles.buttonText}>Check In</Text>
            </View>
          </TouchableOpacity>
        <ul>
          {entries}
        </ul>
      </View>
      )
  }
}


/**
*MAP COMPONENT
*
*/
class Map extends Component {
  render() {
    return (
      <MapView
        style={styles.map}
        showsUserLocation={true}
      />
    );
  }
}






/**
*STYLES
*/
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#a9a9a9'
  },
 
  background: {
    width: null,
    height: null
  },

  map: {
    ...StyleSheet.absoluteFillObject,
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
