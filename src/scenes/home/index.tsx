import * as React from "react";
import { View, Text, StatusBar, Dimensions, TouchableOpacity } from 'react-native';
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
//   runs?: RunType[],
  loading?: boolean,
  selectRowEnabled?: boolean,
//   filteredRuns?: RunType[],
  filterActive?: boolean,
//   filters: RunFilterType,
  groups?: {[key: string]: string}
};
type Context = {
  firebaseDB: any,
  logout: () => void,
  user: any,
  changeGroup: (group: string) => void
};

export class HomeScreen extends React.Component<Props, State> {
  context: Context;
//   runList: RunList;
  static contextTypes = {
    firebaseDB: PropTypes.any,
    logout: PropTypes.func,
    user: PropTypes.any,
    changeGroup: PropTypes.func
  };
  static navigationOptions = ({navigation})  => ({
    title: "Home",
    headerStyle: GlobalStyles.Styles.defaultHeader,
    headerTitleStyle: GlobalStyles.Styles.defaultHeaderTitle,
    headerTintColor: GlobalStyles.Colors.basketballOrange,
    headerLeft: navigation.state.params ? navigation.state.params.left : null,
    headerRight: navigation.state.params ? navigation.state.params.right : null,
    tabBarLabel: "Home",
    drawerLabel: "Home",
    tabBarIcon: ({tintColor}) => (
      <Icon
        name="ios-home-outline"
        size={28}
        color={tintColor}
      />
    )
  })
  constructor(props: Props, context: Context) {
    super(props, context);
    StatusBar.setBarStyle("light-content");
    this.state = {
      selectRowEnabled: false,
      filterActive: false,
      groups: {},
      loading: true
    };
  }
  componentDidMount() {
    this.addDefaultHeader();
    this.getGroups();
  }

  getGroups = () => {
    let {groups} = this.context.user;
    if (groups) {
      this.setState({loading: true}, () => {
        this.context.firebaseDB.fetch("groups", {
          context: this,
          asArray: false
        })
        .then(dbGroups => {
          // console.log("dbgroups", dbGroups);
          let gs: {[key: string]: string} = {};
          Object.keys(dbGroups).forEach(key => {
            // console.log("key, dbgroups", key, dbGroups[key])
            gs[key] = dbGroups[key].name;
          });
          this.setState({groups: gs, loading: false});
        });
      });
    }
  }

  addDefaultHeader = () => {
    const params = {
        left: <IconButton icon="ios-menu" onPress={() => this.props.navigation.navigate("DrawerOpen")} />,
        // right: <IconButton iconSize={22} icon="ios-funnel-outline" iconStyle={styles.rightIcon} onPress={() => this.props.navigation.navigate("Filter", {requestFilter: this.filterRuns})} />
    };
    this.props.navigation.setParams(params);
  }

  handleGroupPress = (key: string) => {
    // console.log("pressed group name", key);
    this.context.changeGroup(key);
    this.props.navigation.navigate("GroupMembers");
  }
  render() {
    // console.log("Render home");
    const {width} = Dimensions.get("window");
    if (!this.state.loading) {
      if (Object.keys(this.state.groups).length === 0) {
        return (
          <View style={[styles.container, {maxWidth: width}]}>
              <Text>You have not joined any groups.</Text>
          </View>    
        );
      }
      else {
        return (
          <View>
            <Text style={styles.header}>Your Groups</Text>
            {Object.keys(this.state.groups).map(key => {
              let name: string = this.state.groups[key];
              // console.log("name", name, this.state.groups[key]);
              return(
                <TouchableOpacity key={key} onPress={() => this.handleGroupPress(key)}>
                  <Text key={key} style={styles.text}>{name}</Text>
                </TouchableOpacity>
              );

            })
            }
          </View>
        );
      }
    }
    else {
      return (
        <LoadingIndicator show={this.state.loading}/>
      );
    }
  }
}