import * as React from "react";
import { View, Text, StatusBar, Dimensions } from 'react-native';
import * as PropTypes from "prop-types";
import Icon from "react-native-vector-icons/Ionicons";
import IconButton from "../../components/icon-button";
// import TextButton from "../../components/text-button";
import styles from "./styles";
import * as GlobalStyles from "../../util/styles";
import LoadingIndicator from "../../components/loading-indicator";

type Props = {
  navigation: any
};

type State = {
  loading?: boolean,
  members?: any
};
type Context = {
  firebaseDB: any,
  user: any,
  currentGroup: string
};

export class Groups extends React.Component<Props, State> {
  context: Context;
  static contextTypes = {
    firebaseDB: PropTypes.any,
    user: PropTypes.any,
    currentGroup: PropTypes.string
  };
  static navigationOptions = ({navigation})  => ({
    title: "My Groups",
    headerStyle: GlobalStyles.Styles.defaultHeader,
    headerTitleStyle: GlobalStyles.Styles.defaultHeaderTitle,
    headerTintColor: GlobalStyles.Colors.basketballOrange,
    headerLeft: navigation.state.params ? navigation.state.params.left : null,
    headerRight: navigation.state.params ? navigation.state.params.right : null,
    // tabBarLabel: "My Groups",
    drawerLabel: "My Groups",
    // tabBarIcon: ({tintColor}) => (
    //   <Icon
    //     name="ios-people-outline"
    //     size={28}
    //     color={tintColor}
    //   />
    // )
  })
  constructor(props: Props, context: Context) {
    super(props, context);
    StatusBar.setBarStyle("light-content");

    this.state = {
        members: []
    };
  }
  componentDidMount() {
    this.addDefaultHeader();
    this.getMembers();
  }

  addDefaultHeader = () => {
    const params = {
        left: <IconButton icon="ios-menu" onPress={() => this.props.navigation.navigate("DrawerOpen")} />,
        // right: <IconButton iconSize={22} icon="ios-funnel-outline" iconStyle={styles.rightIcon} onPress={() => this.props.navigation.navigate("Filter", {requestFilter: this.filterRuns})} />
    };
    this.props.navigation.setParams(params);
  }

  getMembers = () => {
    console.log("current group", this.context.currentGroup);
    this.context.firebaseDB.fetch(`groups/${this.context.currentGroup}`, {
        context: this,
        asArray: false
    })
    .then (g => {
      console.log("g", g);
        let memberIds: string[] = g.members;
        this.getMemberNamesFromIds(memberIds);
    });
  }

  getMemberNamesFromIds = (memberIds: string[]) => {
    let members: string[] = [];
    this.context.firebaseDB.fetch(`users`, {
        context: this,
        asArray: false
    })
    .then (users => {
        memberIds.map((id: string, index: number) => {
            members.push(users[id].name);
        });
        this.setState({members});
    });
  }

  

  toggleLoading = (loading: boolean) => {
    this.setState({loading});
  }

  render() {
    console.log("Render GroupMembers");
    const {width} = Dimensions.get("window");
    if (!this.state.loading) {
      return (
        <View style={[styles.container, {maxWidth: width}]}>
            {this.state.members.map((name: string, index: number) => {
                return (
                    <Text key={index}>{name}</Text>
                );
            })

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