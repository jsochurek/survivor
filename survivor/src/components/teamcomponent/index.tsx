/// <reference path="../../../typings/index.d.ts" />
import * as React from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ScrollView,
  ViewStyle,
  TextStyle,
  TouchableOpacity
} from 'react-native';
import {Team} from '../../types';
type State = {

}
type Props = {
    // style: ViewStyle,
    textStyle: TextStyle,
    team: Team,
    picked: boolean,
    addPick: (team: string) => void
}
type Context = {
    
}
export default class TeamComponent extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {

        };
    }

    formatSeed = () => {
        let sd: string = this.props.team.seed.toString();
        if (this.props.team.seed < 10) {
            sd = `  ${this.props.team.seed.toString()}`;
        }
        return sd;
    }

    onPress = () => {
        console.log(`Pressed ${this.props.team.name}`);
        // add pick
        this.props.addPick(this.props.team.name);
    }

    render() {
        let textStyle = this.props.picked ? [this.props.picked, {textDecorationLine: "line-through"}] : this.props.picked
        return(
            <TouchableOpacity onPress={this.onPress}>
                <Text style={textStyle}>{`${this.formatSeed()}  ${this.props.team.name}`}</Text>
            </TouchableOpacity>
        );
    }
}