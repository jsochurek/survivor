import * as React from 'react';
import PropTypes from "prop-types";
import { TextInput, View } from 'react-native';
import styles from './styles';
import RealmDB from '../../database/index';
export default class Login extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.submitNewUser = (e) => {
            console.log("e", e.nativeEvent.text);
            let user = this.context.db.getUser(e.nativeEvent.text);
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
            this.setState({ users: this.context.db.getUsers() });
            this.context.setCurrentUser(user);
        };
        console.log("Login constructor");
        this.state = {
            users: this.context.db.getUsers()
        };
    }
    render() {
        return (React.createElement(View, { style: styles.container },
            React.createElement(TextInput, { placeholder: "New User", onSubmitEditing: this.submitNewUser })));
    }
}
Login.contextTypes = {
    db: PropTypes.instanceOf(RealmDB),
    setCurrentUser: PropTypes.func
};
//# sourceMappingURL=index.js.map