import * as React from 'react';
import PropTypes from "prop-types";
import {View} from 'react-native';
import GameComponent from '../../components/gamecomponent/index';
import styles from './styles';
import RealmDB from '../../database/index';
import TeamComponent from '../teamcomponent/index';

type Props = {
    teams2016: Team[],
    tournament2016: any,
    user: User
}
type State = {
    winningTeam?: Team,
    teams2016?: Team[],
    tournament2016?: any,
    user?: User
}
type Context = {
    db: RealmDB,
    // currentUser: {name: string, picks: string[]},
    getCurrentUser: () => User,
    togglePick: (team: string) => {}
}
export default class RoundOf2 extends React.Component<Props, State> {
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
        let user: User = this.context.getCurrentUser();
        this.setState({user: user});
    }

    getChildContext(): Object {
        return {
        };
    }

    isPicked = (team: string): boolean => {
        // return ( this.context.getCurrentUser().picks.indexOf(team) > -1 );
        for (let i = 0; i < this.context.getCurrentUser().picks.length; i++) {
            if (this.context.getCurrentUser().picks[i].team === team) {
                return true;
            }
        }
        return false;
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