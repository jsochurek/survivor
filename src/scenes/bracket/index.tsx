import * as React from "react";
import PropTypes from "prop-types";
import {View} from "react-native";
import { teams } from "../../2016/teams";
import { tournament } from "../../2016/tournament2016";
import styles from "./styles";
import RealmDB from "../../database/index";
import RoundOf64 from "../../components/roundOf64/index";
import Swiper from "react-native-swiper";
import RoundOf32 from "../../components/roundOf32/index";
import RoundOf16 from "../../components/roundOf16/index";
import RoundOf8 from "../../components/roundOf8/index";
import RoundOf4 from "../../components/roundOf4/index";
import RoundOf2 from "../../components/roundOf2/index";

type Props = {
    navigation?: any
}
type State = {
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
export default class Bracket extends React.Component<Props, State> {
    static navigationOptions = {
        title: 'Bracket',
      };
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
        let user: User = this.context.getCurrentUser();
        this.setState({user: user});
    }

    getChildContext(): Object {
        return {
        };
    }

    render() {
        return(
            
            <Swiper
                    loop={false}
                    showsPagination={false}
                    showsButtons={true}
                    index={0}>
                            <RoundOf64 
                                teams2016={this.state.teams2016}
                                tournament2016={this.state.tournament2016}    
                                user={this.state.user}
                            />
                        <View style={styles.container}> 
                            <RoundOf32 
                                teams2016={this.state.teams2016}
                                tournament2016={this.state.tournament2016}    
                                user={this.state.user}
                            />
                        </View>
                        <View style={styles.container}> 
                            <RoundOf16 
                                teams2016={this.state.teams2016}
                                tournament2016={this.state.tournament2016}    
                                user={this.state.user}
                            />
                        </View>
                        <View style={styles.container}> 
                            <RoundOf8
                                teams2016={this.state.teams2016}
                                tournament2016={this.state.tournament2016}    
                                user={this.state.user}
                            />
                        </View>
                        <View style={styles.container}> 
                            <RoundOf4
                                teams2016={this.state.teams2016}
                                tournament2016={this.state.tournament2016}    
                                user={this.state.user}
                            />
                        </View>
                        <View style={styles.container}> 
                            <RoundOf2
                                teams2016={this.state.teams2016}
                                tournament2016={this.state.tournament2016}    
                                user={this.state.user}
                            />
                        </View>
                </Swiper>

        );
    }
}
