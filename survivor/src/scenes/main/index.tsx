import * as React from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView
} from 'react-native';
import {RouterInterface} from "react-router-native";
import { teams } from '../../2016/teams';
import { Team } from '../../types';
import GameComponent from '../../components/gamecomponent/index';
import { tournament } from '../../2016/tournament2016';
import styles from './styles';
import RealmDB from '../../database/index';

type Props = {
    router: RouterInterface
}
type State = {
    teams2016?: Team[],
    tournament2016?: any,
    user?: {name: string, picks: string[]}
}
type Context = {
    db: RealmDB,
    currentUser: {name: string, picks: string[]}
}
export default class Main extends React.Component<Props, State> {
    context: Context;

    static contextTypes = {
        db: React.PropTypes.instanceOf(RealmDB),
        currentUser: React.PropTypes.object
    };
    constructor(props: Props, context: Context) {
        super(props, context);
        console.log("Main constructor");
        this.state = {
            teams2016: teams,
            tournament2016: tournament,
            user: this.context.currentUser
        }
    }

    addPick = (team: string) => {
        // add to db
        this.context.db.addPickToUser(this.context.currentUser.name, team);
    }

    render() {
        return(
            <View style={styles.container}>
                <View style={styles.firstTwoRounds}>
                    <View style={styles.round}>
                        {this.state.tournament2016.South.roundOf64.map((item, index) => {
                            return(
                                <View style={styles.gameView} key={index}>
                                    <GameComponent 
                                        key={index}
                                        game={item} 
                                        picks={this.state.user.picks}
                                        addPick={this.addPick}/>
                                </View>
                            );
                        })

                        }
                    </View>
                    <View style={styles.round}>
                        {this.state.tournament2016.South.roundOf32.map((item, index) => {
                            return(
                                <View style={styles.gameView} key={index}>
                                    <GameComponent 
                                        key={index}
                                        game={item}
                                        picks={this.state.user.picks}
                                        addPick={this.addPick}/>
                                </View>
                            );
                        })

                        }
                    </View>
                </View>

            </View>

        );
    }
}