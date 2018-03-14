import * as React from "react";
import { View, Text, StatusBar, Dimensions, TextInput, Button } from 'react-native';
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
  password?: string
};
type Context = {
  firebaseDB: any,
  logout: () => void,
  user: any,
  changeGroup: (group: string) => void
};

export class CreateGroup extends React.Component<Props, State> {
  context: Context;
  static contextTypes = {
    firebaseDB: PropTypes.any,
    logout: PropTypes.func,
    user: PropTypes.any,
    changeGroup: PropTypes.func
  };
  static navigationOptions = ({navigation})  => ({
    title: "Create A New Group",
    headerStyle: GlobalStyles.Styles.defaultHeader,
    headerTitleStyle: GlobalStyles.Styles.defaultHeaderTitle,
    headerTintColor: GlobalStyles.Colors.red,
    headerLeft: navigation.state.params ? navigation.state.params.left : null,
    headerRight: navigation.state.params ? navigation.state.params.right : null,
    tabBarLabel: "New Group",
    drawerLabel: "Group",
    tabBarIcon: ({tintColor}) => (
      <Icon
        name="ios-stopwatch-outline"
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
      password: ""
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
    this.setState({name: text});
  }
  handlePasswordChange = (text: string) => {
    this.setState({password: text});
  }
  handleButtonPress = () => {
    this.context.firebaseDB.push(`groups`, {
      data: {
        commish: this.context.user.uid,
        name: this.state.name,
        password: this.state.password,
        creationTime: new Date().toUTCString(),
        members: [this.context.user.uid]
      }
    })
    .then((g) => {
      this.toggleLoading(false);
      this.context.changeGroup(g.key);
      this.props.navigation.navigate("GroupMembers");
    })
  }

  toggleLoading = (loading: boolean) => {
    this.setState({loading});
  }

  render() {
    console.log("Render Create Group");
    const {width} = Dimensions.get("window");
    if (!this.state.loading) {
      return (
        <View style={[styles.container, {maxWidth: width}]}>
            <Text>Enter Group Name</Text>
            <TextInput onChangeText={this.handleGroupChange}/>
            <Text>Enter Group Password</Text>
            <TextInput onChangeText={this.handlePasswordChange} />
            <Button 
              color="#841584"
              onPress={this.handleButtonPress}
              title="Create Group"
              disabled={this.state.name === "" || this.state.password === ""}
            />
            <Text>After button</Text>
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