import * as React from "react";
import PropTypes from "prop-types";
import {View, ScrollView} from "react-native";
import { teams } from "../../2016/teams";
import { tournament } from "../../2016/tournament2016";
import { tournamentGames2016 } from "../../2016/games2016";
import styles from "./styles";
import RealmDB from "../../database/index";
import moment from "moment";
import GameComponent from '../../components/gamecomponent/index';

type Props = {
    navigation?: any,
    pickDate?: Date
}
type State = {
    teams2016?: Team[],
    tournament2016?: any,
    user?: User,
    todaysGames?: Game[]
}
type Context = {
    db: RealmDB,
    // currentUser: {name: string, picks: string[]},
    getCurrentUser: () => User,
    togglePick: (team: string) => {}
}
export default class MakePick extends React.Component<Props, State> {
    static navigationOptions = {
        title: 'MakePick',
      };
    context: Context;

    static contextTypes = {
        db: PropTypes.instanceOf(RealmDB),
        currentUser: PropTypes.object,
        getCurrentUser: PropTypes.func,
        togglePick: PropTypes.func
    };

   

    constructor(props: Props, context: Context) {
        super(props, context);
        this.state = {
            teams2016: teams,
            tournament2016: tournament,
            user: this.context.getCurrentUser(),
            todaysGames: this.getTodaysGames(props.navigation.state.params.day)
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
        let user: User = this.context.getCurrentUser();
        this.setState({user: user});
    }

    getTodaysGames = (day: Date): Game[] => {
        let games: Game[] = [];
        let momToday: moment.Moment = moment(day);
        for (let g = 0; g < tournamentGames2016.length; g++) {
            // TODO need to change the Game type to take date always
            let momGame: moment.Moment = moment(new Date(tournamentGames2016[g].day));
            if (momGame.isSame(momToday, "day")) {
                games.push(tournamentGames2016[g]);
            }
        }

        return games;
    }

    render() {
        return(
            <ScrollView style={styles.container}>
                <View style={styles.firstTwoRounds}>
                    <View style={styles.round}>
                        {this.state.todaysGames.map((item, index) => {
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
