import * as React from 'react';
import { View } from 'react-native';
import { teams } from '../../2016/teams';
import { tournament } from '../../2016/tournament2016';
import styles from './styles';
import RealmDB from '../../database/index';
import RoundOf64 from '../../components/roundOf64/index';
export default class Main extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.togglePick = (team) => {
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
            let user = this.context.getCurrentUser();
            this.setState({ user: user });
        };
        console.log("Main constructor");
        this.state = {
            teams2016: teams,
            tournament2016: tournament,
            user: this.context.getCurrentUser()
        };
    }
    getChildContext() {
        return {};
    }
    render() {
        return (React.createElement(View, { style: styles.container },
            React.createElement(RoundOf64, { teams2016: this.state.teams2016, tournament2016: this.state.tournament2016, user: this.state.user })));
    }
}
Main.contextTypes = {
    db: React.PropTypes.instanceOf(RealmDB),
    currentUser: React.PropTypes.object,
    getCurrentUser: React.PropTypes.func,
    togglePick: React.PropTypes.func
};
Main.childContextTypes = {};
//# sourceMappingURL=index.js.map