/// <reference path="../../../typings/index.d.ts" />
import * as React from 'react';
import PropTypes from "prop-types";
import { View } from 'react-native';
import GameComponent from '../../components/gamecomponent/index';
import styles from './styles';
import RealmDB from '../../database/index';
import TeamComponent from '../teamcomponent/index';
export default class RoundOf2 extends React.Component {
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
        this.isPicked = (team) => {
            // return ( this.context.getCurrentUser().picks.indexOf(team) > -1 );
            for (let i = 0; i < this.context.getCurrentUser().picks.length; i++) {
                if (this.context.getCurrentUser().picks[i].team === team) {
                    return true;
                }
            }
            return false;
        };
        console.log("Main constructor");
        this.state = {
            teams2016: this.props.teams2016,
            tournament2016: this.props.tournament2016,
            user: this.context.getCurrentUser(),
            winningTeam: this.props.tournament2016.FinalFour.roundOf2[0].winner === this.props.tournament2016.FinalFour.roundOf2[0].home.name ?
                this.props.tournament2016.FinalFour.roundOf2[0].home :
                (this.props.tournament2016.FinalFour.roundOf2[0].winner === this.props.tournament2016.FinalFour.roundOf2[0].away.name ?
                    this.props.tournament2016.FinalFour.roundOf2[0].away : null)
        };
    }
    getChildContext() {
        return {};
    }
    render() {
        return (React.createElement(View, { style: styles.container },
            React.createElement(View, { style: styles.firstTwoRounds },
                React.createElement(View, { style: styles.round }, this.props.tournament2016.FinalFour.roundOf2.map((item, index) => {
                    return (React.createElement(View, { style: styles.gameView, key: index },
                        React.createElement(GameComponent, { key: index, game: item, picks: this.context.getCurrentUser().picks, togglePick: this.togglePick })));
                })),
                React.createElement(View, { style: styles.round }, this.state.winningTeam !== null &&
                    React.createElement(View, { style: styles.gameView },
                        React.createElement(TeamComponent, { textStyle: styles.winnerText, team: this.state.winningTeam, picked: this.isPicked(this.props.tournament2016.FinalFour.roundOf2[0].winner), togglePick: this.togglePick }))))));
    }
}
RoundOf2.contextTypes = {
    db: PropTypes.instanceOf(RealmDB),
    currentUser: PropTypes.object,
    getCurrentUser: PropTypes.func,
    togglePick: PropTypes.func
};
RoundOf2.childContextTypes = {};
//# sourceMappingURL=index.js.map