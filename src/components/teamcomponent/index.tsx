import * as React from 'react';
import PropTypes from "prop-types";
import {Text, TextStyle, TouchableOpacity} from 'react-native';
type State = {
    strikethrough?: boolean
}
type Props = {
    // style: ViewStyle,
    textStyle: TextStyle,
    team: Team,
    picked: boolean,
    togglePick: (team: string) => void
}
type Context = {
    getCurrentUser: () => {name: string, picks: string[]}
}
export default class TeamComponent extends React.Component<Props, State> {
    context: Context;

    static contextTypes = {
        getCurrentUser: PropTypes.func
    };
    constructor(props: Props, context: Context) {
        super(props, context);
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
        // toggle pick
        this.props.togglePick(this.props.team.name);
    }

    render() {
        // let textStyle = this.props.picked == true ? [this.props.textStyle, {textDecorationLine: "line-through"}] : [this.props.textStyle, {textDecorationLine: "none"}];
        // let textStyle = this.context.getCurrentUser().picks.indexOf(this.props.team.name) > -1 == true ? 
            // [this.props.textStyle, {textDecorationLine: "line-through"}] : 
            // [this.props.textStyle, {textDecorationLine: "none"}];
        // console.log(`${this.props.team.name} is picked? ${this.props.picked}`);
        return(
            <TouchableOpacity onPress={this.onPress}>
                <Text style={
                    this.context.getCurrentUser().picks.indexOf(this.props.team.name) > -1 == true ? 
                        [this.props.textStyle, {textDecorationLine: "line-through"}] : 
                        [this.props.textStyle, {textDecorationLine: "none"}]
                }>{`${this.formatSeed()}  ${this.props.team.name}`}</Text>
            </TouchableOpacity>
        );
    }
}