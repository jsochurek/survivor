/// <reference path="../../typings/index.d.ts" />
import * as React from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ScrollView
} from 'react-native';

type State = {
    text: string
}
type Props = {

}
type Context = {
    
}
export default class Comp1 extends React.Component<Props, State> {
    constructor(props: Props) {
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