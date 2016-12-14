"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var react_1 = require('react');
var react_native_1 = require('react-native');
var XMLParser = require('react-xml-parser');
//let xmlText = require('c:/projects/survivor/survivor/2016/teams2016.xml');
var survivor = (function (_super) {
    __extends(survivor, _super);
    function survivor() {
        _super.call(this);
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
</Library>";
        console.log(xmlText);
        //need to define xmlText
        var xml = new XMLParser().parseFromString(xmlText); // Assume xmlText contains the example XML
        console.log(xml);
        console.log(xml.getElementsByTagName('Name'));
    }
    survivor.prototype.render = function () {
        return (<react_native_1.View style={styles.container}>
        <react_native_1.Text style={styles.welcome}>
          Welcome to React Native!
        </react_native_1.Text>
        <react_native_1.Text style={styles.instructions}>
          To get started, edit index.android.js
        </react_native_1.Text>
        <react_native_1.Text style={styles.instructions}>
          Double tap R on your keyboard to reload,{'\n'}
          Shake or press menu button for dev menu
        </react_native_1.Text>
      </react_native_1.View>);
    };
    return survivor;
}(react_1.Component));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = survivor;
var styles = react_native_1.StyleSheet.create({
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
react_native_1.AppRegistry.registerComponent('survivor', function () { return survivor; });
