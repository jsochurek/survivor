/// <reference path="../../../typings/index.d.ts" />
import * as React from 'react';
import { View } from 'react-native';
import TeamComponent from '../teamcomponent/index';
import styles from './styles';
export default class GameComponent extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.isPicked = (team) => {
            return (this.context.getCurrentUser().picks.indexOf(team) > -1);
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
        return (React.createElement(View, { style: styles.game },
            React.createElement(TeamComponent, { textStyle: this.state.homeStyle, team: this.props.game.home, picked: this.isPicked(this.props.game.home.name), togglePick: this.togglePick }),
            React.createElement(TeamComponent, { textStyle: this.state.awayStyle, team: this.props.game.away, picked: this.isPicked(this.props.game.away.name), togglePick: this.togglePick })));
    }
}
GameComponent.contextTypes = {
    getCurrentUser: React.PropTypes.func
};
//# sourceMappingURL=index.js.map