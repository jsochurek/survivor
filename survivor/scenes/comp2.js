import * as React from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ScrollView
} from 'react-native';

export default class Comp2 extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            text: "Testing Scene 2",
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