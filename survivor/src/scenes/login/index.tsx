import * as React from 'react';
import {
  Text,
  TextInput,
  View,
  TouchableOpacity,
  ScrollView,
  ListView,
  ListViewDataSource
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
    users?: {name: string, picks: string[]}[],
    dataSource?: ListViewDataSource,
}
type Context = {
    db: RealmDB, 
    setCurrentUser: (user: {name: string, picks: string[]}) => void
}
export default class Login extends React.Component<Props, State> {
    context: Context;

    static contextTypes = {
        db: React.PropTypes.instanceOf(RealmDB),
        setCurrentUser: React.PropTypes.func
    };
    constructor(props: Props, context: Context) {
        super(props, context);
        console.log("Login constructor");
        this.state = {
            users: this.context.db.getUsers()
        }
    }

    submitNewUser = (e: any) => {
        console.log("e", e.nativeEvent.text);
        let user: {name: string, picks: string[]} = {
            name: e.nativeEvent.text,
            picks: []
        };
        this.context.db.addUser(user);
        this.context.db.addPickToUser(user.name, "test");

        console.log("current users", this.context.db.getUsers());
        this.setState({users: this.context.db.getUsers()});
        this.context.setCurrentUser(user);
    }

    render() {
        return(
            <View style={styles.container}>
                <TextInput
                    placeholder="New User"
                    onSubmitEditing={this.submitNewUser}
                />
                

            </View>

        );
    }
}