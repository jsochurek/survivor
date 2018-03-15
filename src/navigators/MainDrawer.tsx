import * as React from "react";
import {Alert} from "react-native";
import * as PropTypes from "prop-types";
import {DrawerNavigator, StackNavigator, TabNavigator, TabBarBottom } from "react-navigation";
import {HomeScreen, Feedback, CreateGroup, GroupMembers, MakePicks, JoinGroup } from "../scenes";
import Drawer from "../components/drawer/index";
import DrawerItem from "../components/drawer/item/index";
import * as GlobalStyles from "../util/styles/index";
// import FilterRunStack from "./FilterRunStack";

const TabsWrapper = TabNavigator({
    Home: {screen: HomeScreen},
    CreateGroup: {screen: CreateGroup},
    JoinGroup: {screen: JoinGroup},
    GroupMembers: {screen: GroupMembers},
    MakePicks: {screen: MakePicks}
  }, {
    tabBarComponent: props => <TabBarBottom {...props}/>,
    animationEnabled: false,
    swipeEnabled: false,
    tabBarPosition: "bottom",
    tabBarOptions: {
      activeTintColor: "#FA8320",
      style: GlobalStyles.Styles.defaultTabBar
    }
  });

const AuthenticatedWrapper = StackNavigator({
    TabsWrapper: {screen: TabsWrapper},
    // AddRun: {screen: AddRun},
    // ViewRun: {screen: ViewRun},
    // CompareRuns: {screen: CompareRuns},
    // Filter: {
    //     screen: FilterRunStack,
    //     navigationOptions: ({navigation}) => ({
    //         header: null
    //     })
    // },
    Feedback: {screen: Feedback}
  }, {
      headerMode: "screen",
      mode: "modal"
  });


type Props = {
    navigation: any
};

type State = {

};

type Context = {
    logout: () => void
};

export class DrawerContentComponent extends React.Component<Props, State> {
    context: Context;
    static contextTypes = {
        logout: PropTypes.func
    };
    verifyLogout = () => {
        Alert.alert(
          "Logout",
          "Are you sure you want to log out?",
          [
            {text: "Cancel", onPress: () => console.log("Cancel Pressed"), style: "cancel"},
            {text: "Log out", onPress: () => this.context.logout()}
          ],
          { cancelable: true }
        );
      }
    render() {
        let {routes} = this.props.navigation.state;
        return (
            <Drawer>
                {routes.map((route, index) => {
                    return (
                        <DrawerItem
                            route={route}
                            key={index}
                            onPress={() => {
                                    this.props.navigation.navigate(route.routeName);
                                }
                            }
                        />
                    );
                })}
                <DrawerItem
                    route={{routeName: "Logout"}}
                    onPress={this.verifyLogout}
                />
            </Drawer>
        );
    }
}

const MainDrawerNavigator = DrawerNavigator({
    Home: {
        screen: AuthenticatedWrapper
      },
    Feedback: {
        screen: Feedback
    }
}, {
    headerMode: "screen",
    initialRouteName: "Home",
    contentComponent: props => <DrawerContentComponent {...props} />,
    contentOptions: {
        activeTintColor: GlobalStyles.Colors.basketballOrange,
        inactiveTintColor: GlobalStyles.Colors.gray,
        style: GlobalStyles.Styles.defaultDrawerItem,
        labelStyle: GlobalStyles.Styles.defaultDrawerLabel,
        activeBackgroundColor: "transparent",
        inactiveBackgroundColor: "transparent"
    }
});

export default MainDrawerNavigator;