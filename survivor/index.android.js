

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ScrollView
} from 'react-native';
var XMLParser = require('react-xml-parser');
import {teams} from "./2016/teams";
//let xmlText = require('c:/projects/survivor/survivor/2016/teams2016.xml');


export default class survivor extends Component {
  teams2016;
  constructor() {
    super();
//     var xmlText = "<?xml version='1.0' encoding='utf-8'?>\
// <Library>\
//    <Books count='1'>\
//        <Book id='1'>\
//            <Name>Me Before You</Name>\
//            <Author>Jojo Moyes</Author>\
//        </Book>\
//    </Books>\
//    <Music count=1>\
//        <CD id='2'>\
//            <Name>Houses of the Holy</Name>\
//            <Artist>Led Zeppelin</Artist>\
//        </CD>\
//    </Music>\
// </Library>"
    this.teams2016 = teams;
    console.log(this.teams2016);
    //need to define xmlText
    // var xml = new XMLParser().parseFromString(teams);    // Assume xmlText contains the example XML
    // console.log(xml);
    // console.log(xml.getElementsByTagName('Name'));
  }
  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          {this.teams2016.map((item, index) => {
            return(
            <Text key={index}>{item.name}</Text>
            );
            })
          }
        </ScrollView>
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
