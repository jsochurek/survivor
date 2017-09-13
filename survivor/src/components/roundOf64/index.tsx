/// <reference path="../../../typings/index.d.ts" />
import * as React from 'react';
import PropTypes from "prop-types";
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

type Props = {
    teams2016: Team[],
    tournament2016: any,
    user: {name: string, picks: {team: string, date: Date}[]}
}
type State = {
    
}
type Context = {
    db: RealmDB,
    // currentUser: {name: string, picks: string[]},
    getCurrentUser: () => {name: string, picks: {team: string, date: Date}[]},
    togglePick: (team: string) => {}
}
export default class RoundOf64 extends React.Component<Props, State> {
    context: Context;

    static contextTypes = {
        db: PropTypes.instanceOf(RealmDB),
        currentUser: PropTypes.object,
        getCurrentUser: PropTypes.func,
        togglePick: PropTypes.func
    };

    static childContextTypes = {
    };

    constructor(props: Props, context: Context) {
        super(props, context);
        console.log("Main constructor");
        this.state = {
            teams2016: teams,
            tournament2016: tournament,
            user: this.context.getCurrentUser()
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
        let user: {name: string, picks: {team: string, date: Date}[]} = this.context.getCurrentUser();
        this.setState({user: user});
    }

    getChildContext(): Object {
        return {
        };
    }

    render() {
        return(
            <ScrollView style={styles.container}>
                <View style={styles.firstTwoRounds}>
                    <View style={styles.round}>
                        {this.props.tournament2016.South.roundOf64.map((item, index) => {
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
                        {this.props.tournament2016.West.roundOf64.map((item, index) => {
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
                        {this.props.tournament2016.East.roundOf64.map((item, index) => {
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
                        {this.props.tournament2016.Midwest.roundOf64.map((item, index) => {
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
                        {this.props.tournament2016.South.roundOf32.map((item, index) => {
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
                        {this.props.tournament2016.West.roundOf32.map((item, index) => {
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
                        {this.props.tournament2016.East.roundOf32.map((item, index) => {
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
                        {this.props.tournament2016.Midwest.roundOf32.map((item, index) => {
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
                </View>

            </ScrollView>

        );
    }
}