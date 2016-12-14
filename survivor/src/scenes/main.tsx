import * as React from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native';
import {RouterInterface} from "react-router-native";
import { teams } from '../2016/teams';
import { Team } from '../types';
import GameComponent from '../components/gamecomponent/index';
import { tournament } from '../2016/tournament2016';

type Props = {
    router: RouterInterface
}
type State = {
    teams2016: Team[],
    tournament2016: any
}
export default class Main extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        console.log("Main constructor");
        this.state = {
            teams2016: teams,
            tournament2016: tournament
        }
    }



    render() {
        return(
            <View>
                {this.state.tournament2016.South.map((item, index) => {
                    return(
                        <GameComponent 
                            key={index}
                            game={item} />
                    );
                })

                }
            </View>
        );
    }
}