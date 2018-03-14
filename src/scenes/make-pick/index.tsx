import * as React from "react";
import { View, Text, StatusBar, Dimensions, ScrollView, Picker, TouchableOpacity } from 'react-native';
import * as PropTypes from "prop-types";
import Icon from "react-native-vector-icons/Ionicons";
import IconButton from "../../components/icon-button";
// import TextButton from "../../components/text-button";
import styles from "./styles";
import * as GlobalStyles from "../../util/styles";
import LoadingIndicator from "../../components/loading-indicator";
import TextButton from '../../components/text-button/index';

type Props = {
  navigation: any
};

type State = {
  loading?: boolean,
  selectedDay?: string,
  teams?: string[],
  picks?: string[],
  dayOptions?: string[],
  data?: any
};
type Context = {
  firebaseDB: any,
  logout: () => void,
  user: any,
  currentGroup: string
};

export class MakePicks extends React.Component<Props, State> {
  context: Context;
  static contextTypes = {
    firebaseDB: PropTypes.any,
    logout: PropTypes.func,
    user: PropTypes.any,
    currentGroup: PropTypes.string
  };
  static navigationOptions = ({navigation})  => ({
    title: "Make Picks",
    headerStyle: GlobalStyles.Styles.defaultHeader,
    headerTitleStyle: GlobalStyles.Styles.defaultHeaderTitle,
    headerTintColor: GlobalStyles.Colors.red,
    headerLeft: navigation.state.params ? navigation.state.params.left : null,
    headerRight: navigation.state.params ? navigation.state.params.right : null,
    tabBarLabel: "Picks",
    drawerLabel: "Picks",
    tabBarIcon: ({tintColor}) => (
      <Icon
        name="ios-stopwatch-outline"
        size={28}
        color={tintColor}
      />
    )
  })
  constructor(props: Props, context: Context) {
    super(props, context);
    StatusBar.setBarStyle("light-content");

    this.state = {
        teams: [],
        selectedDay: null,
        picks: [],
        dayOptions: [],
        data: {}
    };
  }
  componentDidMount() {
    this.addDefaultHeader();
    this.getTeamsByDay();
  }

  addDefaultHeader = () => {
    const params = {
        left: <IconButton icon="ios-menu" onPress={() => this.props.navigation.navigate("DrawerOpen")} />,
        // right: <IconButton iconSize={22} icon="ios-funnel-outline" iconStyle={styles.rightIcon} onPress={() => this.props.navigation.navigate("Filter", {requestFilter: this.filterRuns})} />
    };
    this.props.navigation.setParams(params);
  }

  getTeamsByDay = () => {
    let year: number = new Date().getFullYear();
    this.context.firebaseDB.fetch(`${year}`, {
        context: this,
        asArray: false
    })
    .then (data => {
        this.setState({data})
    });
  }


    handleDayPickerChange = (selectedDay, itemIndex) => {
        let picks: string[] = [];
        if (this.context.user.picks && 
            this.context.user.picks[new Date().getFullYear().toString()] &&
            this.context.user.picks[new Date().getFullYear().toString()][this.context.currentGroup] &&
            this.context.user.picks[new Date().getFullYear().toString()][this.context.currentGroup][selectedDay]
        )
        {
            picks = this.context.user.picks[new Date().getFullYear().toString()][this.context.currentGroup][selectedDay]
        }
        this.setState({
            selectedDay,
            picks
        });
    }


  toggleLoading = (loading: boolean) => {
    this.setState({loading});
  }

  handlePressTeam = (team: string) => {
    let index: number = this.state.picks.indexOf(team);
    let picks: string[] = this.state.picks;
    if (index > -1) {
        picks.splice(index, 1);
        if (picks.length === 0) {
            // Remove the save button
            const params = {
                left: <IconButton icon="ios-menu" onPress={() => this.props.navigation.navigate("DrawerOpen")} />,
                // right: <IconButton iconSize={22} icon="ios-funnel-outline" iconStyle={styles.rightIcon} onPress={() => this.props.navigation.navigate("Filter", {requestFilter: this.filterRuns})} />
            };
            this.props.navigation.setParams(params);
        }
    }
    else {
        picks.push(team);
        if (picks.length === 1) {
            // Add the save button
            const params = {
                left: <IconButton icon="ios-menu" onPress={() => this.props.navigation.navigate("DrawerOpen")} />,
                right: <IconButton iconSize={22} icon="ios-funnel-outline" onPress={() => this.handleSavePicks} />
            };
            this.props.navigation.setParams(params);
        }
    }
    this.setState({picks});
  }

  handleSavePicks = () => {
      let {name, picks} = this.context.user;
      console.log("Handle Save Picks", this.context.user);
      if (picks === undefined) {
        picks = {};
      }
      if (this.context.user.picks) {
          picks = this.context.user.picks;
      }
      console.log("picks", picks);
      if (picks[new Date().getFullYear().toString()] == undefined) {
        picks[new Date().getFullYear().toString()] = {};
      }
      if (picks[new Date().getFullYear().toString()][this.context.currentGroup] == undefined) {
        picks[new Date().getFullYear().toString()][this.context.currentGroup] = {};
      }
      if (picks[new Date().getFullYear().toString()][this.context.currentGroup][this.state.selectedDay] == undefined) {
        picks[new Date().getFullYear().toString()][this.context.currentGroup][this.state.selectedDay] = {};
      }
      picks[new Date().getFullYear().toString()][this.context.currentGroup][this.state.selectedDay] = this.state.picks;

      this.context.firebaseDB.update(`users/${this.context.user.uid}`, {
        data: {
            picks: picks
        }
    });
  }

  render() {
    let keys: string[] = [""];
    keys = keys.concat(Object.keys(this.state.data));
    const {width} = Dimensions.get("window");
    let teams: JSX.Element;
    teams = this.state.data[this.state.selectedDay] ? (
        <View>
            {this.state.data[this.state.selectedDay].teams.map((team: string, index: number) => {
                let textStyle = this.state.picks.indexOf(team) > -1 ? styles.textLinethrough : styles.text;
                return (
                    <TouchableOpacity key={index} style={styles.teamContainer} onPress={() => this.handlePressTeam(team)}>
                        <Text key={index} style={textStyle}>{team}</Text>
                    </TouchableOpacity>
                );
            })}
        </View>
    ) :
    (
        <View>
            <Text>No Teams to Pick</Text>
        </View>
    );
    // TODO ios picker needs to be implemented
    return (
        <View style={styles.container}>
            <Picker
                selectedValue={this.state.selectedDay}
                onValueChange={this.handleDayPickerChange}
                // style={styles.picker}
            >
                {keys.map((option: string, i: number) => {
                    return (
                        <Picker.Item key={i} value={option} label={option} />
                    );
                })
                }
            </Picker>
            <TextButton 
                title="Save Picks"
                disabled={this.state.picks.length === 0}
                onPress={this.handleSavePicks}
                style={styles.button}
                titleStyle={styles.buttonText}
            />
            <ScrollView>
                {teams}
            </ScrollView>
        </View>
    );
  }
}