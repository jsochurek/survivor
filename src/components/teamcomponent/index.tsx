import * as React from "react";
import PropTypes from "prop-types";
import {Text, TextStyle, TouchableOpacity} from "react-native";
type State = {
    strikethrough?: boolean
}
type Props = {
    // style: ViewStyle,
    textStyle: TextStyle,
    team: Team,
    togglePick: (team: string) => void
}
type Context = {
    getCurrentUser: () => User,
    currentUser: any
}
export default class TeamComponent extends React.Component<Props, State> {
    context: Context;

    static contextTypes = {
        getCurrentUser: PropTypes.func,
        currentUser: PropTypes.shape({
            name: PropTypes.string,
            picks: PropTypes.arrayOf(PropTypes.shape({
                team: PropTypes.string,
                date: PropTypes.date
            }))
        })
    };
    constructor(props: Props, context: Context) {
        super(props, context);
        console.log("cons currentUser", context);
        this.state = {
            strikethrough: false
        };
    }

    componentDidMount() {
        console.log("didmoutn currentUser", this.context);
        if (this.context.currentUser) {
            this.setState({strikethrough: this.isTeamPicked(this.context.currentUser.picks)});
        }
    }

    componentWillReceiveProps(nextProps: Props, nextContext: Context) {
        console.log("nextContext", nextContext);
        if (nextContext.currentUser.picks !== this.context.currentUser.picks) {
            console.log("current, next", this.context.currentUser, nextContext.currentUser)
            this.setState({strikethrough: this.isTeamPicked(nextContext.currentUser.picks)});
        }
    }

    formatSeed = () => {
        let sd: string = this.props.team.seed.toString();
        if (this.props.team.seed < 10) {
            sd = `  ${this.props.team.seed.toString()}`;
        }
        return sd;
    }

    onPress = () => {
        console.log(`Pressed ${this.props.team.name}`);
        // toggle pick
        this.props.togglePick(this.props.team.name);
    }

    isTeamPicked = (picks: {team: string, date: Date}[]): boolean => {
        for (let pick in picks) {
            if (pick) {
                console.log("isteampicked", picks[pick].team, this.props.team.name);
                if (picks[pick].team === this.props.team.name) {
                    return true;
                }
            }
        }
        return false;
    }

    render() {

        return(
            <TouchableOpacity onPress={this.onPress}>
                <Text style={
                    this.state.strikethrough === true ? 
                        [this.props.textStyle, {textDecorationLine: "line-through"}] : 
                        [this.props.textStyle, {textDecorationLine: "none"}]
                }>{`${this.formatSeed()}  ${this.props.team.name}`}</Text>
            </TouchableOpacity>
        );
    }
}