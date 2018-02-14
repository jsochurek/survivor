import * as React from "react";
import PropTypes from "prop-types";
import {View, ScrollView, Picker, Text, Button} from "react-native";
import { teams } from "../../2016/teams";
// import { tournament } from "../../2016/tournament2016";
import { tournamentGames2016 } from "../../2016/games2016";
import styles from "./styles";
import RealmDB from "../../database/index";
// import moment from "moment";
import GameComponent from '../../components/gamecomponent/index';

type Props = {
    navigation?: any
}
type State = {
    teams2016?: Team[],
    tournament2016?: any,
    todaysGames?: Game[],
    dayOptions?: string[],
    selectedDay?: string,
    picks?: {team: string, date: Date}[]
}
type Context = {
    db: RealmDB,
    // currentUser: {name: string, picks: string[]},
    getCurrentUser: () => User,
    togglePick: (team: string) => {}
}
export default class MakePick extends React.Component<Props, State> {
    static navigationOptions = ({ navigation }) => {
        const params = navigation.state.params || {};
    
        return {
            title: 'Make Your Pick(s)',
            headerRight: (
                <Button
                  onPress={params.savePicks}
                  title="Info"
                  color="#0000"
                />
              )
        }; 
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
            tournament2016: tournamentGames2016,
            todaysGames: [],
            dayOptions: [
                "Select a Day",
                '2016-03-17', 
                '2016-03-18', 
                '2016-03-19', 
                '2016-03-20',
                '2016-03-24',
                '2016-03-25',
                '2016-03-26',
                '2016-03-27',
                '2016-04-02',
                '2016-04-04'],
            selectedDay: null,
            picks: context.getCurrentUser().picks
        };
    }

    componentWillMount() {
        this.props.navigation.setParams({savePicks: this.savePicks})
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

        // this.context.togglePick(team);
        // let user: User = this.context.getCurrentUser();
        // this.setState({user: user});
        let picks = this.state.picks;
        let index: number = -1;
        for (let i = 0; i < picks.length; i++) {
            if (picks[i].team === team) {
                index = 1;
                break;
            }
        }
        console.log("team, index", team, index);
        console.log("picks before", picks);
        if (index === -1) {
            picks.push({team: team, date: new Date()});
        }
        else {
            picks.splice(index, 1);
        }
        console.log("picks after", picks);
        this.setState({picks});
        //TODO this isn't forcing a re-render of the games components
    }

    savePicks = () => {
        console.log("save picks!");
        let user: User = this.context.getCurrentUser();
        user.picks = this.state.picks;
        this.context.db.updateUserPicks(user);
    }

    getTodaysGames = (day: string): Game[] => {
        let games: Game[] = [];
        // let momToday: moment.Moment = moment(day);
        for (let g = 0; g < tournamentGames2016.length; g++) {
            // TODO need to change the Game type to take date always
            // let momGame: moment.Moment = moment(new Date(tournamentGames2016[g].day));
            // if (momGame.isSame(momToday, "day")) {
            if (day === tournamentGames2016[g].day) {
                games.push(tournamentGames2016[g]);
            }
        }

        return games;
    }

    handleDayPickerChange = (itemValue, itemIndex) => {
        console.log("itemValue", itemValue, itemIndex)
        this.setState({selectedDay: itemValue, todaysGames: this.getTodaysGames(itemValue)});
    }

    isTeamPicked = (team: string): boolean => {
        for (let i = 0; i < this.state.picks.length; i++) {
            if (team === this.state.picks[i].team) {
                return true;
            }
        }
        return false;
    }

    render() {
        return(
            <ScrollView style={styles.container}>
                <Picker
                    selectedValue={this.state.selectedDay}
                    onValueChange={this.handleDayPickerChange}
                    // style={styles.picker}
                >
                    {this.state.dayOptions.map((option: string, i: number) => {
                        return (
                            <Picker.Item key={i} value={option} label={option} />
                        );
                    })
                    }
                </Picker>
                <View style={styles.firstTwoRounds}>
                    {this.state.todaysGames.length === 0 &&
                        <Text>No games available for this day</Text>
                    }
                    <View style={styles.round}>
                        {this.state.todaysGames.map((item, index) => {
                            return(
                                <View style={styles.gameView} key={index}>
                                    <GameComponent 
                                        key={index}
                                        game={item} 
                                        picks={this.state.picks}
                                        togglePick={this.togglePick}
                                        awayPicked={this.isTeamPicked(item.away.name)}
                                        homePicked={this.isTeamPicked(item.home.name)}
                                        />
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
