/// <reference path="../../../typings/index.d.ts" />
import * as React from 'react';
import PropTypes from "prop-types";
import {Text, View, TextStyle} from "react-native";
import TeamComponent from '../teamcomponent/index';
import styles from './styles';
import moment from "moment";

type State = {
    awayStyle: TextStyle,
    homeStyle: TextStyle
}
type Props = {
    // style?: ViewStyle,
    game: Game,
    picks: {team: string, date: Date}[],
    togglePick: (team: string) => void
}
type Context = {
    getCurrentUser: () => User
}
export default class GameComponent extends React.Component<Props, State> {
    context: Context;

    static contextTypes = {
        getCurrentUser: PropTypes.func
    };
    constructor(props: Props, context: Context) {
        super(props, context);
        let awayStyle: TextStyle;
        let homeStyle: TextStyle;
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

    isPicked = (team: string): boolean => {
        for (let i = 0; i < this.context.getCurrentUser().picks.length; i++) {
            if (this.context.getCurrentUser().picks[i].team === team) {
                // return ( this.context.getCurrentUser().picks.indexOf(team) > -1 );
                return true;
            }
        }
        return false;
    }

    togglePick = (team: string) => {
        //TODO need checks on rounds, whether can still change pick
        this.props.togglePick(team);
    }

    render() {
        let day: moment.Moment = moment(this.props.game.day);
        return(
            <View style={styles.game}>
                <TeamComponent 
                    textStyle={this.state.homeStyle}
                    team={this.props.game.home} 
                    picked={this.isPicked(this.props.game.home.name)}
                    togglePick={this.togglePick}
                />
                <TeamComponent 
                    textStyle={this.state.awayStyle}
                    team={this.props.game.away} 
                    picked={this.isPicked(this.props.game.away.name)}
                    togglePick={this.togglePick}
                />
                <Text>{day.format("ddd MMM D")}</Text>
            </View>
        );
    }
}