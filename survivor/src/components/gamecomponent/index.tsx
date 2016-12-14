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
    game: Game
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

    render() {
        return(
            <View>
                <TeamComponent 
                    textStyle={this.state.homeStyle}
                    team={this.props.game.home} 
                />
                <TeamComponent 
                    textStyle={this.state.awayStyle}
                    team={this.props.game.away} 
                />
            </View>
        );
    }
}