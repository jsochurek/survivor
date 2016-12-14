import * as React from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ScrollView
} from 'react-native';

export default class Comp1 extends React.Component {
    constructor(props) {
        super(props);
        console.log("Comp1 constructor");
        this.state = {
            text: "Testing Scene 1",
        }
    }

    render() {
        return(
            <View>
                <Text>{this.state.text}</Text>
            </View>
        );
    }
}