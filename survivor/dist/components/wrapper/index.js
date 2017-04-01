/// <reference path="../../../typings/index.d.ts" />
import * as React from "react";
import { View } from "react-native";
import styles from "./styles";
import RealmDB from '../../database/index';
export default class Wrapper extends React.Component {
    constructor(props) {
        super(props);
        this.setCurrentUser = (user) => {
            console.log("setting current user to : ", user);
            this.setState({ currentUser: user });
            //navigate to bracket
            this.props.router.replace("/main");
        };
        this.getCurrentUser = () => {
            return this.state.currentUser;
        };
        this.togglePick = (team) => {
            let picks = this.state.currentUser.picks;
            let index = picks.indexOf(team);
            if (index > -1) {
                let spliced = picks.splice(index, 1);
            }
            else {
                picks.push(team);
            }
            this.state.currentUser.picks = picks;
            this.setState({ currentUser: this.state.currentUser });
            this.db.updateUserPicks({ name: this.state.currentUser.name, picks });
        };
        this.state = {
            currentUser: { name: "", picks: [] }
        };
        // this.realm = new RealmDB(2016);
        this.db = new RealmDB();
    }
    getChildContext() {
        return {
            db: this.db,
            setCurrentUser: this.setCurrentUser,
            // currentUser: this.state.currentUser,
            getCurrentUser: this.getCurrentUser,
            togglePick: this.togglePick,
        };
    }
    componentWillMount() {
    }
    componentWillReceiveProps(nextProps) {
    }
    render() {
        return (React.createElement(View, { style: styles.wrapper }, this.props.children));
    }
}
Wrapper.childContextTypes = {
    db: React.PropTypes.instanceOf(RealmDB),
    setCurrentUser: React.PropTypes.func,
    //   currentUser: React.PropTypes.shape({name: React.PropTypes.string, picks: React.PropTypes.arrayOf(React.PropTypes.string)}),
    getCurrentUser: React.PropTypes.func,
    togglePick: React.PropTypes.func
};
//# sourceMappingURL=index.js.map