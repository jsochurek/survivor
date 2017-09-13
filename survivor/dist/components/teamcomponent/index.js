/// <reference path="../../../typings/index.d.ts" />
import * as React from 'react';
import PropTypes from "prop-types";
import { Text, TouchableOpacity } from 'react-native';
export default class TeamComponent extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.formatSeed = () => {
            let sd = this.props.team.seed.toString();
            if (this.props.team.seed < 10) {
                sd = `  ${this.props.team.seed.toString()}`;
            }
            return sd;
        };
        this.onPress = () => {
            console.log(`Pressed ${this.props.team.name}`);
            // toggle pick
            this.props.togglePick(this.props.team.name);
        };
        this.state = {};
    }
    render() {
        // let textStyle = this.props.picked == true ? [this.props.textStyle, {textDecorationLine: "line-through"}] : [this.props.textStyle, {textDecorationLine: "none"}];
        let textStyle = this.context.getCurrentUser().picks.indexOf(this.props.team.name) > -1 == true ?
            [this.props.textStyle, { textDecorationLine: "line-through" }] :
            [this.props.textStyle, { textDecorationLine: "none" }];
        // console.log(`${this.props.team.name} is picked? ${this.props.picked}`);
        return (React.createElement(TouchableOpacity, { onPress: this.onPress },
            React.createElement(Text, { style: textStyle }, `${this.formatSeed()}  ${this.props.team.name}`)));
    }
}
TeamComponent.contextTypes = {
    getCurrentUser: PropTypes.func
};
//# sourceMappingURL=index.js.map