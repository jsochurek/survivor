import * as React from "react";
import PropTypes from "prop-types";
import {View, TouchableOpacity, Text} from "react-native";
import { teams } from "../../2016/teams";
import { tournament } from "../../2016/tournament2016";
import styles from "./styles";
import RealmDB from "../../database/index";

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
export default class Main extends React.Component<Props, State> {
    static navigationOptions = {
        title: 'Main',
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
            
            <View style={styles.container}>
                <TouchableOpacity onPress={() => this.props.navigation.navigate("Bracket")}>
                    <Text>View Bracket</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.props.navigation.navigate("MakePick", {day: new Date('2016-03-17')})}>
                    <Text>Make Today's Pick</Text>
                </TouchableOpacity>
            </View>

        );
    }
}
