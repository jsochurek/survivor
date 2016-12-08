

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';
var XMLParser = require('react-xml-parser');

//let xmlText = require('c:/projects/survivor/survivor/2016/teams2016.xml');


export default class survivor extends Component {
  constructor() {
    super();
    var xmlText = "<?xml version='1.0' encoding='utf-8'?>\
<Library>\
   <Books count='1'>\
       <Book id='1'>\
           <Name>Me Before You</Name>\
           <Author>Jojo Moyes</Author>\
       </Book>\
   </Books>\
   <Music count=1>\
       <CD id='2'>\
           <Name>Houses of the Holy</Name>\
           <Artist>Led Zeppelin</Artist>\
       </CD>\
   </Music>\
</Library>"
    console.log(xmlText);
    //need to define xmlText
    var xml = new XMLParser().parseFromString(xmlText);    // Assume xmlText contains the example XML
    console.log(xml);
    console.log(xml.getElementsByTagName('Name'));
  }
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to React Native!
        </Text>
        <Text style={styles.instructions}>
          To get started, edit index.android.js
        </Text>
        <Text style={styles.instructions}>
          Double tap R on your keyboard to reload,{'\n'}
          Shake or press menu button for dev menu
        </Text>
      </View>
    );
  }
}

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

AppRegistry.registerComponent('survivor', () => survivor);
