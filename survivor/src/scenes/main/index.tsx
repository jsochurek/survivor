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
import RoundOf64 from '../../components/roundOf64/index';

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
    // currentUser: {name: string, picks: string[]},
    getCurrentUser: () => {name: string, picks: string[]},
    togglePick: (team: string) => {}
}
export default class Main extends React.Component<Props, State> {
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
        let user: {name: string, picks: string[]} = this.context.getCurrentUser();
        this.setState({user: user});
    }

    getChildContext(): Object {
        return {
        };
    }

    render() {
        return(
            <View style={styles.container}>
                <RoundOf64 
                    teams2016={this.state.teams2016}
                    tournament2016={this.state.tournament2016}    
                    user={this.state.user}
                />

            </View>

        );
    }
}