import * as React from "react";
import PropTypes from "prop-types";
import { View, } from "react-native";
import { RouterInterface} from "react-router-native";
import styles from "./styles";
import RealmDB from '../../database/index';

type Props = {
    router: RouterInterface
};

type State = {
    currentUser?: User
}


export default class Wrapper extends React.Component<Props, State> {
    db: RealmDB;
  static childContextTypes = {
      db: PropTypes.instanceOf(RealmDB),
      setCurrentUser: PropTypes.func,
    //   currentUser: PropTypes.shape({name: PropTypes.string, picks: PropTypes.arrayOf(PropTypes.string)}),
      getCurrentUser: PropTypes.func,
      togglePick: PropTypes.func
  };

  constructor(props: Props) {
    super(props);
    this.state = {
        currentUser: {name: "", picks: []}
    };
    // this.realm = new RealmDB(2016);
    this.db = new RealmDB();
  }

  getChildContext(): Object {
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

  setCurrentUser = (user: User) => {
      console.log("setting current user to : ", user);
      this.setState({currentUser: user});
      //navigate to bracket
      this.props.router.replace("/main");
  }

  getCurrentUser = () : User => {
    return this.state.currentUser;
  }

  togglePick = (team: string) => {
    let picks: {team: string, date: Date}[] = this.state.currentUser.picks;
    let index: number = -1;//picks.indexOf(team);
    for (let i = 0; i < this.state.currentUser.picks.length; i++) {
        if (this.state.currentUser.picks[i].team === team) {
            index = i;
            break;
        }
    }
    if (index > -1) {
        picks.splice(index, 1);
    }
    else {
        picks.push({team, date: new Date()});
    }
    this.state.currentUser.picks = picks;
    this.setState({currentUser: this.state.currentUser});
    this.db.updateUserPicks({name: this.state.currentUser.name, picks});
  }

  render() {
    return (
        <View style={styles.wrapper}>
            {this.props.children}
        </View>	
    )
  }
}