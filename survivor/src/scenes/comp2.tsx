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
export default class Comp2 extends React.Component<Props, State> {
    constructor(props: Props) {
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