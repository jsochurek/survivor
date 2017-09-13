/// <reference path="../../../typings/index.d.ts" />
import * as React from 'react';
import PropTypes from "prop-types";
import { Text, View } from 'react-native';
import TeamComponent from '../teamcomponent/index';
import styles from './styles';
import moment from "moment";
export default class GameComponent extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.isPicked = (team) => {
            for (let i = 0; i < this.context.getCurrentUser().picks.length; i++) {
                if (this.context.getCurrentUser().picks[i].team === team) {
                    // return ( this.context.getCurrentUser().picks.indexOf(team) > -1 );
                    return true;
                }
            }
            return false;
        };
        this.togglePick = (team) => {
            //TODO need checks on rounds, whether can still change pick
            this.props.togglePick(team);
        };
        let awayStyle;
        let homeStyle;
        if (this.props.game.winner === this.props.game.away.name) {
            awayStyle = styles.winnerText;
            homeStyle = styles.loserText;
        }
        else {
            awayStyle = styles.loserText;
            homeStyle = styles.winnerText;
        }
        this.state = {
            awayStyle,
            homeStyle
        };
    }
    render() {
        let day = moment(this.props.game.day);
        return (React.createElement(View, { style: styles.game },
            React.createElement(TeamComponent, { textStyle: this.state.homeStyle, team: this.props.game.home, picked: this.isPicked(this.props.game.home.name), togglePick: this.togglePick }),
            React.createElement(TeamComponent, { textStyle: this.state.awayStyle, team: this.props.game.away, picked: this.isPicked(this.props.game.away.name), togglePick: this.togglePick }),
            React.createElement(Text, null, day.format("ddd MMM D"))));
    }
}
GameComponent.contextTypes = {
    getCurrentUser: PropTypes.func
};
//# sourceMappingURL=index.js.map