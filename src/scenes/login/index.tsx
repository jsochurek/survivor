import * as React from 'react';
import PropTypes from "prop-types";
import {TextInput, View, ListViewDataSource} from 'react-native';
import styles from './styles';
import RealmDB from '../../database/index';

type Props = {
    navigation?: any
}
type State = {
    users?: User[],
    dataSource?: ListViewDataSource,
}
type Context = {
    db: RealmDB, 
    setCurrentUser: (user: User) => void
}
export default class Login extends React.Component<Props, State> {
    static navigationOptions = {
        title: 'Login',
      };
    context: Context;

    static contextTypes = {
        db: PropTypes.instanceOf(RealmDB),
        setCurrentUser: PropTypes.func
    };
    constructor(props: Props, context: Context) {
        super(props, context);
        console.log("Login constructor");
        this.state = {
            users: this.context.db.getUsers()
        }
    }

    submitNewUser = async (e: any) => {
        console.log("e", e.nativeEvent.text);
        let user: User = this.context.db.getUser(e.nativeEvent.text);
        if (!user) {
            user = {
                name: e.nativeEvent.text,
                picks: []
            };
            this.context.db.addUser(user);
        }
        else {
            console.log("found user", user);
        }

        console.log("current users", this.context.db.getUsers());
        this.context.setCurrentUser(user);
        this.setState({users: this.context.db.getUsers()}, () => {
            this.props.navigation.navigate("Main");
        });
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