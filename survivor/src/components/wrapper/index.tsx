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
      currentUser: React.PropTypes.object
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
        currentUser: this.state.currentUser
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

  render() {
    return (
        <View style={styles.wrapper}>
            {this.props.children}
        </View>	
    )
  }
}