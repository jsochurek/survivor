/// <reference path="../../../typings/index.d.ts" />
import * as React from 'react';
import PropTypes from "prop-types";
import {Text, View, TextStyle} from "react-native";
import TeamComponent from '../teamcomponent/index';
import styles from './styles';
import moment from "moment";

type State = {
    awayStyle?: TextStyle,
    homeStyle?: TextStyle,
    homePicked?: boolean,
    awayPicked?: boolean
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
        if (props.game.winner === props.game.away.name) {
            awayStyle = styles.winnerText;
            homeStyle = styles.loserText;
        }
        else {
            awayStyle = styles.loserText;
            homeStyle = styles.winnerText;
        }

        this.state = {
             awayStyle,
             homeStyle,
             awayPicked: this.isTeamPicked(props.game.away.name, props.picks),
             homePicked: this.isTeamPicked(props.game.home.name, props.picks)
        };
    }

    togglePick = (team: string) => {
        //TODO need checks on rounds, whether can still change pick
        this.props.togglePick(team);

        if (team === this.props.game.home.name) {
            this.setState({homePicked: !this.state.homePicked});
        }
        else {
            this.setState({awayPicked: !this.state.awayPicked});
        }
    }

    isTeamPicked = (team: string, picks: {team: string, date: Date}[]): boolean => {
        for (let pick in picks) {
            if (pick) {
                if (pick === picks[pick].team) {
                    return true;
                }
            }
        }
        return false;
    }

    render() {
        let day: moment.Moment = moment(this.props.game.day);
        return(
            <View style={styles.game}>
                <TeamComponent 
                    textStyle={this.state.homeStyle}
                    team={this.props.game.home} 
                    togglePick={this.togglePick}
                    picked={this.state.homePicked}
                    picks={this.props.picks}
                />
                <TeamComponent 
                    textStyle={this.state.awayStyle}
                    team={this.props.game.away} 
                    togglePick={this.togglePick}
                    picked={this.state.awayPicked}
                    picks={this.props.picks}
                />
                <Text>{day.format("ddd MMM D")}</Text>
            </View>
        );
    }
}