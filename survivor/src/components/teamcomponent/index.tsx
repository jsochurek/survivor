/// <reference path="../../../typings/index.d.ts" />
import * as React from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ScrollView,
  ViewStyle,
  TextStyle
} from 'react-native';
import {Team} from '../../types';
type State = {

}
type Props = {
    // style: ViewStyle,
    textStyle: TextStyle,
    team: Team
}
type Context = {
    
}
export default class TeamComponent extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {

        };
    }

    render() {
        return(
            <View>
                <Text style={this.props.textStyle}>{`${this.props.team.seed.toString()}  ${this.props.team.name}`}</Text>
            </View>
        );
    }
}