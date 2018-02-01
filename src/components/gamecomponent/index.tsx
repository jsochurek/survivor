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
    awayPicked?: boolean,
    homePicked?: boolean
}
type Props = {
    // style?: ViewStyle,
    game: Game,
    picks: {team: string, date: Date}[],
    togglePick: (team: string) => void
}
type Context = {
}
export default class GameComponent extends React.Component<Props, State> {
    context: Context;

    static contextTypes = {
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

    componentWillReceiveProps(nextProps: Props, nextContext: Context) {
        if (this.props.picks.length !== nextProps.picks.length) {
            console.log("game componentwillreceiveprops");
            this.setState({
                awayPicked: this.isTeamPicked(this.props.game.away.name, nextProps.picks),
                homePicked: this.isTeamPicked(this.props.game.home.name, nextProps.picks)
            });
        }
    }

    togglePick = (team: string) => {
        if (!this.isTeamPicked(this.props.game.home.name) && team === this.props.game.away.name) {
            this.props.togglePick(team);
            this.setState({awayPicked: !this.state.awayPicked});
        }
        else if (!this.isTeamPicked(this.props.game.away.name) && team === this.props.game.home.name) {
            this.props.togglePick(team);
            this.setState({homePicked: !this.state.homePicked});
        }

    }

    isTeamPicked = (team: string, picks?: {team: string, date: Date}[]): boolean => {
        let userPicks: {team: string, date: Date}[] = picks ? picks : this.props.picks;
        for (let pick in userPicks) {
            if (pick) {
                if (pick === userPicks[pick].team) {
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
                />
                <TeamComponent 
                    textStyle={this.state.awayStyle}
                    team={this.props.game.away} 
                    togglePick={this.togglePick}
                    picked={this.state.awayPicked}
                />
                <Text>{day.format("ddd MMM D")}</Text>
            </View>
        );
    }
}