/// <reference path="../../../typings/index.d.ts" />
import * as React from 'react';
import { View } from 'react-native';
import { teams } from '../../2016/teams';
import GameComponent from '../../components/gamecomponent/index';
import { tournament } from '../../2016/tournament2016';
import styles from './styles';
import RealmDB from '../../database/index';
export default class RoundOf8 extends React.Component {
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
            React.createElement(View, { style: styles.firstTwoRounds },
                React.createElement(View, { style: styles.round },
                    this.props.tournament2016.South.roundOf8.map((item, index) => {
                        return (React.createElement(View, { style: styles.gameView, key: index },
                            React.createElement(GameComponent, { key: index, game: item, picks: this.context.getCurrentUser().picks, togglePick: this.togglePick })));
                    }),
                    this.props.tournament2016.West.roundOf8.map((item, index) => {
                        return (React.createElement(View, { style: styles.gameView, key: index },
                            React.createElement(GameComponent, { key: index, game: item, picks: this.context.getCurrentUser().picks, togglePick: this.togglePick })));
                    }),
                    this.props.tournament2016.East.roundOf8.map((item, index) => {
                        return (React.createElement(View, { style: styles.gameView, key: index },
                            React.createElement(GameComponent, { key: index, game: item, picks: this.context.getCurrentUser().picks, togglePick: this.togglePick })));
                    }),
                    this.props.tournament2016.Midwest.roundOf8.map((item, index) => {
                        return (React.createElement(View, { style: styles.gameView, key: index },
                            React.createElement(GameComponent, { key: index, game: item, picks: this.context.getCurrentUser().picks, togglePick: this.togglePick })));
                    })),
                React.createElement(View, { style: styles.round }, this.props.tournament2016.FinalFour.roundOf4.map((item, index) => {
                    return (React.createElement(View, { style: styles.gameView, key: index },
                        React.createElement(GameComponent, { key: index, game: item, picks: this.context.getCurrentUser().picks, togglePick: this.togglePick })));
                })))));
    }
}
RoundOf8.contextTypes = {
    db: React.PropTypes.instanceOf(RealmDB),
    currentUser: React.PropTypes.object,
    getCurrentUser: React.PropTypes.func,
    togglePick: React.PropTypes.func
};
RoundOf8.childContextTypes = {};
//# sourceMappingURL=index.js.map