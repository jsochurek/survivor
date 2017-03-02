/// <reference path="../../../typings/index.d.ts" />

import * as React from "react";
import { View, Text } from "react-native";
import { Link, Pop, Router, RouterInterface} from "react-router-native";
import styles from "./styles";
import RealmDB from '../../database/index';

type Props = {
    router: RouterInterface
};

type State = {
    currentUser?: {name: string, picks: string[]}
}

type Context = {
};

export default class Wrapper extends React.Component<Props, State> {
    db: RealmDB;
  static childContextTypes = {
      db: React.PropTypes.instanceOf(RealmDB),
      setCurrentUser: React.PropTypes.func,
    //   currentUser: React.PropTypes.shape({name: React.PropTypes.string, picks: React.PropTypes.arrayOf(React.PropTypes.string)}),
      getCurrentUser: React.PropTypes.func,
      togglePick: React.PropTypes.func
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

  setCurrentUser = (user: {name: string, picks: string[]}) => {
      console.log("setting current user to : ", user);
      this.setState({currentUser: user});
      //navigate to bracket
      this.props.router.replace("/main");
  }

  getCurrentUser = () : {name: string, picks: string[]} => {
    return this.state.currentUser;
  }

  togglePick = (team: string) => {
    let picks: string[] = this.state.currentUser.picks;
    let index: number = picks.indexOf(team);
    if (index > -1) {
        let spliced = picks.splice(index, 1);
    }
    else {
        picks.push(team);
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