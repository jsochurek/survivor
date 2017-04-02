/// <reference path="../../../typings/index.d.ts" />
import * as React from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView
} from 'react-native';
import { teams } from '../../2016/teams';
import { Team } from '../../types';
import GameComponent from '../../components/gamecomponent/index';
import { tournament } from '../../2016/tournament2016';
import styles from './styles';
import RealmDB from '../../database/index';
import TeamComponent from '../teamcomponent/index';
import { User } from '../../database/schema';

type Props = {
    teams2016: Team[],
    tournament2016: any,
    user: {name: string, picks: string[]}
}
type State = {
    winningTeam?: Team,
    teams2016?: Team[],
    tournament2016?: any,
    user?: {name: string, picks: string[]}
}
type Context = {
    db: RealmDB,
    // currentUser: {name: string, picks: string[]},
    getCurrentUser: () => {name: string, picks: string[]},
    togglePick: (team: string) => {}
}
export default class RoundOf2 extends React.Component<Props, State> {
    context: Context;

    static contextTypes = {
        db: React.PropTypes.instanceOf(RealmDB),
        currentUser: React.PropTypes.object,
        getCurrentUser: React.PropTypes.func,
        togglePick: React.PropTypes.func
    };

    static childContextTypes = {
    };

    constructor(props: Props, context: Context) {
        super(props, context);
        console.log("Main constructor");
        this.state = {
            teams2016: this.props.teams2016,
            tournament2016: this.props.tournament2016,
            user: this.context.getCurrentUser(),
            winningTeam: this.props.tournament2016.FinalFour.roundOf2[0].winner === this.props.tournament2016.FinalFour.roundOf2[0].home.name ? 
                this.props.tournament2016.FinalFour.roundOf2[0].home : 
                (this.props.tournament2016.FinalFour.roundOf2[0].winner === this.props.tournament2016.FinalFour.roundOf2[0].away.name ? 
                this.props.tournament2016.FinalFour.roundOf2[0].away : null)
        }
    }

    togglePick = (team: string) => {
        // add to db
        // this.context.db.addPickToUser(this.context.currentUser.name, team);

        // let index: number = this.context.currentUser.picks.indexOf(team);
        // if (index > -1) {
        //     this.context.currentUser.picks.slice(index, 1);
        // }
        // else {
        //     this.context.currentUser.picks.push(team);
        // }
        // console.log (`toggled ${team} in ${JSON.stringify(this.context.currentUser)}`);
        // this.context.db.updateUserPicks(this.context.currentUser);
        // this.setState({user: this.context.currentUser});

        this.context.togglePick(team);
        let user: {name: string, picks: string[]} = this.context.getCurrentUser();
        this.setState({user: user});
    }

    getChildContext(): Object {
        return {
        };
    }

    isPicked = (team: string) => {
        return ( this.context.getCurrentUser().picks.indexOf(team) > -1 );
    }

    
    render() {
        return(
            <View style={styles.container}>
                <View style={styles.firstTwoRounds}>
                    <View style={styles.round}>
                        {this.props.tournament2016.FinalFour.roundOf2.map((item, index) => {
                            return(
                                <View style={styles.gameView} key={index}>
                                    <GameComponent 
                                        key={index}
                                        game={item} 
                                        picks={this.context.getCurrentUser().picks}
                                        togglePick={this.togglePick}/>
                                </View>
                            );
                        })
                        }
                    </View>
                    <View style={styles.round}>
                        {this.state.winningTeam !== null && 
                            <View style={styles.gameView}>
                                <TeamComponent 
                                    textStyle={styles.winnerText}
                                    team={this.state.winningTeam} 
                                    picked={this.isPicked(this.props.tournament2016.FinalFour.roundOf2[0].winner)}
                                    togglePick={this.togglePick}
                                />
                            </View>
                        }
                    </View>
                </View>

            </View>

        );
    }
}