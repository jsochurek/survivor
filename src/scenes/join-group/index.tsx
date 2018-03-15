import * as React from "react";
import { View, Text, StatusBar, Dimensions, TextInput, Button, Alert } from 'react-native';
import * as PropTypes from "prop-types";
import Icon from "react-native-vector-icons/Ionicons";
import IconButton from "../../components/icon-button";
// import TextButton from "../../components/text-button";
import styles from "./styles";
import * as GlobalStyles from "../../util/styles";
// import RunList from "../../components/run-list";
import LoadingIndicator from "../../components/loading-indicator";
// const tracks = require("../../../tracks.json");

type Props = {
  navigation: any
};

type State = {
  loading?: boolean,
  name?: string,
  password?: string,
  displayError?: boolean
};
type Context = {
  firebaseDB: any,
  logout: () => void,
  user: any,
  changeGroup: (group: string) => void
};

export class JoinGroup extends React.Component<Props, State> {
  context: Context;
  static contextTypes = {
    firebaseDB: PropTypes.any,
    logout: PropTypes.func,
    user: PropTypes.any,
    changeGroup: PropTypes.func
  };
  static navigationOptions = ({navigation})  => ({
    title: "Join An Existing Group",
    headerStyle: GlobalStyles.Styles.defaultHeader,
    headerTitleStyle: GlobalStyles.Styles.defaultHeaderTitle,
    headerTintColor: GlobalStyles.Colors.basketballOrange,
    headerLeft: navigation.state.params ? navigation.state.params.left : null,
    headerRight: navigation.state.params ? navigation.state.params.right : null,
    tabBarLabel: "Join Group",
    drawerLabel: "Join Group",
    tabBarIcon: ({tintColor}) => (
      <Icon
        name="ios-add-circle-outline"
        size={28}
        color={tintColor}
      />
    )
  })
  constructor(props: Props) {
    super(props);
    StatusBar.setBarStyle("light-content");
    this.state = {
      loading: false,
      name: "",
      password: "",
      displayError: false
    };
  }
  componentDidMount() {
    this.addDefaultHeader();
  }

  addDefaultHeader = () => {
    const params = {
        left: <IconButton icon="ios-menu" onPress={() => this.props.navigation.navigate("DrawerOpen")} />,
        // right: <IconButton iconSize={22} icon="ios-funnel-outline" iconStyle={styles.rightIcon} onPress={() => this.props.navigation.navigate("Filter", {requestFilter: this.filterRuns})} />
    };
    this.props.navigation.setParams(params);
  }

//   syncFirebaseToState = () => {
//     let {uid} = this.context.user;
//     this.setState({loading: true});
//     this.context.firebaseDB.syncState(`groups/${uid}`, {
//       context: this,
//       state: "runs",
//       asArray: true,
//       then: () => this.setState({loading: false})
//     });
//   }
  handleGroupChange = (text: string) => {
    this.setState({name: text, displayError: false});
  }
  handlePasswordChange = (text: string) => {
    this.setState({password: text, displayError:false});
  }
  handleButtonPress = () => {
    this.context.firebaseDB.fetch(`groups`, {
      context: this,
      asArray: false
    })
    .then (groups => {
      console.log("groups", groups);
      let found: boolean = false;
      Object.keys(groups).forEach(key => {
        let group = groups[key];
        if (this.state.name === group.name && this.state.password === group.password) {
          console.log("found a match");
          if (group.members.indexOf(this.context.user.id) > -1) {
            console.log("user already in group");
          }
          else {
            let members = group.members;
            members.push(this.context.user.id);
            this.context.firebaseDB.update(`groups/${key}`, {
              data: {
                  members: members
              }
            });
            let userGroups = this.context.user.groups;
            if (userGroups == undefined) {
              userGroups = [];
            }
            if (userGroups.indexOf(key) < 0) {
              userGroups.push(key);
            }
            this.context.firebaseDB.update(`users/${this.context.user.id}`, {
              data: {
                groups: userGroups
              }
            });
          }
          this.setState({displayError: false});
          this.props.navigation.navigate("GroupMembers");
        }
      });
      if (!found) {
        this.setState({displayError: true});
      }
    });
    // Alert.alert("No Group Found", "No group was found with this username and password. Please check your inputs.");

  }

  toggleLoading = (loading: boolean) => {
    this.setState({loading});
  }

  render() {
    console.log("Render Join Group");
    const {width} = Dimensions.get("window");
    if (!this.state.loading) {
      return (
        <View style={[styles.container, {maxWidth: width}]}>
            <Text>Enter Group Name</Text>
            <TextInput onChangeText={this.handleGroupChange}/>
            <Text>Enter Group Password</Text>
            <TextInput onChangeText={this.handlePasswordChange} />
            <Button 
              color="#FA8320"
              onPress={this.handleButtonPress}
              title="Join Group"
              disabled={this.state.name === "" || this.state.password === ""}
            />
            {this.state.displayError === true && 
              <Text>No group found with this name/password. Please check your entry.</Text>
            }
        </View>    
      );
    }
    else {
      return (
        <LoadingIndicator show={this.state.loading}/>
      );
    }
  }
}