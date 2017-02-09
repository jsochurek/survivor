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
    addPick: (team: string) => void
}
type Context = {
    
}
export default class GameComponent extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
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
        return ( this.props.picks.indexOf(team) > -1 );
    }

    addPick = (team: string) => {
        //
    }

    render() {
        return(
            <View style={styles.game}>
                <TeamComponent 
                    textStyle={this.state.homeStyle}
                    team={this.props.game.home} 
                    picked={this.isPicked(this.props.game.home.name)}
                    addPick={this.addPick}
                />
                <TeamComponent 
                    textStyle={this.state.awayStyle}
                    team={this.props.game.away} 
                    picked={this.isPicked(this.props.game.home.name)}
                    addPick={this.addPick}
                />
            </View>
        );
    }
}