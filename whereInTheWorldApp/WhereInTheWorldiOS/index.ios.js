/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow 

 Press Cmd+R to reload,{'\n'}
 Cmd+D or shake for dev menu
 */

import React, { Component, PropTypes } from 'react';
import {
  AppRegistry,
  StyleSheet,
  NavigatorIOS,
  Platform,
  Switch,
  Text,
  TextInput,
  ScrollView,
  View,
  PROVIDER_GOOGLE,
  PROVIDER_DEFAULT,
  MapView,
  Image,
  TouchableOpacity
} from 'react-native';

import axios from 'axios';


export default class WhereInTheWorldiOS extends Component {
  constructor(props) {
    super(props);
    this.checkIn = this.checkIn.bind(this)
    this.getLocationData = this.getLocationData.bind(this)
    this.changeView = this.changeView.bind(this)
    this.state = {
      loggedIn: true,
      username: '',
      view: 'home',
      lastPosition: {},
      placeData: []
      }


  }
  
  watchID: ?number = null;

  //get all the places feed
  componentDidMount() {
    this.getLocationData()
  } 

  getLocationData(){
      console.log("this is hitting")
      var state = this.state;
      var self  = this;
      axios.get('http://localhost:9393/place')
      .then(function(response){
        state.placeData =response.data;
        self.setState(state)
      })

  //     navigator.geolocation.getCurrentPosition(
  //       (position) => {
  //         var initialPosition = JSON.stringify(position);
  //         this.setState({initialPosition});
  //       },
  //       (error) => alert(JSON.stringify(error)),
  //       {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
  //       );

  //       state = self.state

  //       this.watchID = navigator.geolocation.watchPosition((position) => {
  //       state.lastPosition.latitude = position.coords.latitude;
  //       state.lastPosition.longitude = position.coords.longitude;
  //       this.setState(state);
  //       console.log(state, "geooo")

  //   });

  }
  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID);
  }

  //post the lat and long
  checkIn() {

      var state = this.state;
      var self  = this;

        axios.post('http://localhost:9393/place', {
          latitude: self.state.lastPosition.latitude ,
          longitude: self.state.lastPosition.longitude
        })
        .then(function (response) {
          console.log(response, "POST RESPONSE");
          self.getLocationData();
        })
        .catch(function (error) {
          console.log(error,"errrrrrrrr");
        })
    }


    changeView = (component) =>{
      
      var state = this.state
      state.view = 'map'
      this.setState(state);
    }
    
    renderView(component) {
            var self = this;
            console.log(this.state)
            if(component == 'home') {
            return <HomeFeed changeView={this.changeView} placeData={self.state.placeData} checkIn={self.checkIn}/>
          } else if(component == 'map') {
            return <Map changeView={this.changeView} placeData={self.state.placeData}/>
          } 
      }
  

  render() {    
    

    return (
      <View style={styles.container}>
        {this.renderView(this.state.view)}
      </View>
    );
  }
}

/**
*HOME COMPONENT
*        <Map placeData={self.state.placeData} />
*        <HomeFeed placeData={self.state.placeData} checkIn={self.checkIn} />
*/
class HomeFeed extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log(this.props.placeData, "home")
    var placeInfo = this.props.placeData.map((place, i) =>{
      return <View key={i}><Text style={styles.placeText}>{place.user_id}: {place.time} {"\n"} {place.latitude} {place.longitude}</Text></View>
    })

    return(
      <View >
        <TouchableOpacity onPress={this.props.checkIn} activeOpacity={.5}>
            <View style={styles.button}>
              <Text style={styles.buttonText}>Yo Check In</Text>
            </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.props.changeView('map') } activeOpacity={.5}>
                <View style={styles.button}>
              <Text style={styles.buttonText}>MAP YO</Text>
            </View>
        </TouchableOpacity>
          <ScrollView
            scrollEventThrottle={200}
            automaticallyAdjustContentInsets={false}
            bounces={true}>
            <View style={styles.places}>
              {placeInfo.reverse()}
            </View>
          </ScrollView>  
      </View>
      )
  }
}

/**
*MAP COMPONENT
*< <TouchableOpacity activeOpacity={.5}>
            <View style={styles.button}>
              <Text style={styles.buttonText}>map map map</Text>
            </View>
        </TouchableOpacity>

    console.log(nextProps, ' nextProps')
    
   
*/
class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      markers: []
    }
    this.createMarkers()
  }

  createMarkers() {
    this.props.placeData.map((place, i) =>{
      
      if(isNaN(parseInt(place.latitude)) === false ||  isNaN(parseInt(place.longitude)) === false){
            var obj = {};
            obj.latitude = parseInt(place.latitude)
            obj.longitude = parseInt(place.longitude)
            obj.title = place.time
            this.state.markers.push(obj)
            console.log(obj);
      }
    })
  }

  componentWillReceiveProps(nextProps) {
    

  }
  render() {
debugger
    return (
      <MapView
        style={styles.map}
        showsUserLocation={true}
        annotations={this.state.markers}
        >
      
        </MapView>
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
    paddingHorizontal: 15,
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
