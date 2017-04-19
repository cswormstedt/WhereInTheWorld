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
import axios from 'axios';


export default class WhereInTheWorldiOS extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: true,
      username: '',
      lastPosition: 'unknown', 
      placeData: []
      }
  }
    watchID: ?number = null;

  //get all the places feed
  componentDidMount() {
      var state = this.state;
      var self  = this;
      axios.get('http://localhost:9393/place')
      .then(function(response){
        state.placeData =response.data;
        self.setState(state)
      })

      navigator.geolocation.getCurrentPosition(
        (position) => {
          var initialPosition = JSON.stringify(position);
          this.setState({initialPosition});
        },
        (error) => alert(JSON.stringify(error)),
        {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
        );


        this.watchID = navigator.geolocation.watchPosition((position) => {
        var lastPosition = {};
        lastPosition.latitude = position.coords.latitude;
        lastPosition.longitude = position.coords.longitude;
        this.setState({lastPosition});
        console.log(lastPosition, ' this is lastPosition');
        console.log(lastPosition.latitude)
        console.log(lastPosition.longitude)

    });
}
  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID);
  }
  //post the lat and long
  checkIn() {
      var state = this.state;
      var self  = this;
      console.log(this, "this is this")
      console.log(self.state.lastPosition.latitude, "latttttttttt")
        axios.post('http://localhost:3000/place', {
          latitude: this.lastPosition.latitude,
          longitude: this.state.lastPosition.longitude
        })
        .then(function (response) {
          console.log(response, "POST RESPONSE");
        })
        .catch(function (error) {
          console.log(error);
        })
    }


  render() {
    var self = this;

    return (
      <View style={styles.container}>
          <HomeFeed placeData={self.state.placeData} checkIn={self.checkIn} />
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
  }


  render() {
    console.log(this.props.placeData)
    var placeInfo = this.props.placeData.map((place, i) =>{
      return <View key={i}><Text style={styles.placeText}>{place.user_id}: {place.time} {"\n"} {place.latitude} {place.longitude}</Text></View>
    })
    return(
      <View >
        <View style={styles.places}>
          {placeInfo}
        </View>
        <TouchableOpacity onPress={this.props.checkIn} activeOpacity={.5}>
            <View style={styles.button}>
              <Text style={styles.buttonText}>Yo Check In</Text>
            </View>
          </TouchableOpacity>
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

  places: {
    paddingVertical: 15,
    marginVertical: 15,
  },

  placeText: {
    color: '#FFF',
    textAlign: "center",
    fontSize: 20
  },

  registerText: {
    color: '#FFF',
    backgroundColor: "transparent",
    textAlign: "center"
  }
});

AppRegistry.registerComponent('WhereInTheWorldiOS', () => WhereInTheWorldiOS);
