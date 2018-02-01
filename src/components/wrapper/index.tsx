import * as React from "react";
import PropTypes from "prop-types";
import { View, } from "react-native";
import styles from "./styles";
import RealmDB from '../../database/index';

type Props = {
    navigation?: any
}

type State = {
    currentUser?: User
}


export default class Wrapper extends React.Component<Props, State> {
    db: RealmDB;
  static childContextTypes = {
      db: PropTypes.instanceOf(RealmDB),
      setCurrentUser: PropTypes.func,
      currentUser: PropTypes.shape({
        name: PropTypes.string,
        picks: PropTypes.arrayOf(PropTypes.shape({
            team: PropTypes.string,
            date: PropTypes.date
        }))
      }),
      getCurrentUser: PropTypes.func,
      togglePick: PropTypes.func
    //   currentUser: PropTypes.shape(User)
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
        currentUser: this.state.currentUser,
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
  }

  getCurrentUser = () : User => {
    return this.state.currentUser;
  }

  togglePick = (team: string) => {
    // console.log("this.state.currentUser", this.state.currentUser);
    let user: User = this.state.currentUser;
    let picks: {team: string, date: Date}[] = user.picks;
    let index: number = -1;//picks.indexOf(team);
    for (let i = 0; i < user.picks.length; i++) {
        if (user.picks[i].team === team) {
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
    user.picks = picks;
    
    this.setState({currentUser: user});
    this.db.updateUserPicks(user);
  }

  render() {
    return (
        <View style={styles.wrapper}>
            {this.props.children}
        </View>	
    )
  }
}