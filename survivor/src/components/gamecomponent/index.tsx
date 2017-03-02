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
import {Team, Game} from '../../types';
import TeamComponent from '../teamcomponent/index';
import styles from './styles';


type State = {
    awayStyle: TextStyle,
    homeStyle: TextStyle
}
type Props = {
    // style?: ViewStyle,
    game: Game,
    picks: string[],
    togglePick: (team: string) => void
}
type Context = {
    getCurrentUser: () => {name: string, picks: string[]}
}
export default class GameComponent extends React.Component<Props, State> {
    context: Context;

    static contextTypes = {
        getCurrentUser: React.PropTypes.func
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

    isPicked = (team: string) => {
        return ( this.context.getCurrentUser().picks.indexOf(team) > -1 );
    }

    togglePick = (team: string) => {
        //TODO need checks on rounds, whether can still change pick
        this.props.togglePick(team);
    }

    render() {
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
            </View>
        );
    }
}