import * as React from "react";
import {View, Text, StatusBar, TouchableOpacity, Alert, Modal, Dimensions} from "react-native";
import * as PropTypes from "prop-types";
import Icon from "react-native-vector-icons/Ionicons";
import IconButton from "../../components/icon-button";
import TextButton from "../../components/text-button";
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
//   filters: RunFilterType
};
type Context = {
  firebaseDB: any,
  logout: () => void,
  user: any
};

export class HomeScreen extends React.Component<Props, State> {
  context: Context;
//   runList: RunList;
  static contextTypes = {
    firebaseDB: PropTypes.any,
    logout: PropTypes.func,
    user: PropTypes.any
  };
  static navigationOptions = ({navigation})  => ({
    title: "Runs",
    headerStyle: GlobalStyles.Styles.defaultHeader,
    headerTitleStyle: GlobalStyles.Styles.defaultHeaderTitle,
    headerTintColor: GlobalStyles.Colors.red,
    headerLeft: navigation.state.params ? navigation.state.params.left : null,
    headerRight: navigation.state.params ? navigation.state.params.right : null,
    tabBarLabel: "Runs",
    drawerLabel: "Home",
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
    //   runs: [],
      selectRowEnabled: false,
      filterActive: false,
    //   filteredRuns: [],
    //   filters: {
    //     trackLength: "",
    //     track: "",
    //     event: "",
    //     startDate: null,
    //     endDate: null,
    //     order: "DESC",
    //     sortBy: "date",
    //     lane: ""
    //   }
    };
  }
  componentDidMount() {
    this.addDefaultHeader();
    this.syncFirebaseToState();
    // this.addTracksToFirebase();
  }
  addTracksToFirebase = () => {
    // this.context.firebaseDB.post(`allTracks`, {
    //   data: tracks
    // }).then(() => {
    // }).catch(err => {
    //   // handle error
    // });
  }
  addDefaultHeader = () => {
    const params = {
        left: <IconButton icon="ios-menu" onPress={() => this.props.navigation.navigate("DrawerOpen")} />,
        // right: <IconButton iconSize={22} icon="ios-funnel-outline" iconStyle={styles.rightIcon} onPress={() => this.props.navigation.navigate("Filter", {requestFilter: this.filterRuns})} />
    };
    this.props.navigation.setParams(params);
  }
//   filterRuns = (filterParams: RunFilterType) => {
//     let runs = this.state.runs.filter((run: RunType) => {
//       return (
//         run.timeslip.track.includes(filterParams.track) &&
//         run.timeslip.event.includes(filterParams.event) &&
//         run.timeslip.length.includes(filterParams.trackLength)
//       );
//     });
//     if (filterParams.lane !== "") {
//       runs = runs.filter((run: RunType) => {
//         return run.timeslip.lane === filterParams.lane;
//       });
//     }
//     let sorted = this.sortRunsByField(runs, filterParams.sortBy, filterParams.order);
//     this.setState({filteredRuns: sorted, filterActive: true, filters: filterParams});
//   }
//   sortRunsByField = (runs: RunType[], sortBy: RunField | "", order: "ASC" | "DESC" | "") => {
//     switch (sortBy) {
//       case "date": case "track": case "event": case "lane": case "session": case "length":
//         if (order === "ASC") {
//           return runs.sort((a, b) => a.timeslip.date - b.timeslip.date);
//         }
//         else if (order === "DESC") {
//           return runs.sort((a, b) => b.timeslip.date - a.timeslip.date);
//         }
//         else {
//           return runs;
//         }
//       case "reactionTime": case "sixty": case "threeThirty": case "sixSixty": case "sixSixtyMph": case "thousand": case "thirteenTwenty": case "thirteenTwentyMph":
//         if (order === "ASC") {
//           return runs.sort((a, b) => (a.timeslip[sortBy] ? parseFloat(a.timeslip[sortBy]) : 9999) - (b.timeslip[sortBy] ? parseFloat(b.timeslip[sortBy]) : 99999));
//         }
//         else if (order === "DESC") {
//           return runs.sort((a, b) => (b.timeslip[sortBy] ? parseFloat(b.timeslip[sortBy]) : 0) - (a.timeslip[sortBy] ? parseFloat(a.timeslip[sortBy]) : 0));
//         }
//       else {
//         return runs;
//       }
//       case "dialIn": case "estimatedET": case "tirePressure":
//         if (order === "ASC") {
//           return runs.sort((a, b) => (a.details[sortBy] ? parseFloat(a.details[sortBy]) : 9999) - (b.details[sortBy] ? parseFloat(b.details[sortBy]) : 99999));
//         }
//         else if (order === "DESC") {
//           return runs.sort((a, b) => (b.details[sortBy] ? parseFloat(b.details[sortBy]) : 0) - (a.details[sortBy] ? parseFloat(a.details[sortBy]) : 0));
//         }
//         else {
//           return runs;
//         }
//       case "trackTemp":
//         if (order === "ASC") {
//           return runs.sort((a, b) => (a.conditions[sortBy] ? parseFloat(a.conditions[sortBy]) : 9999) - (b.conditions[sortBy] ? parseFloat(b.conditions[sortBy]) : 99999));
//         }
//         else if (order === "DESC") {
//           return runs.sort((a, b) => (b.conditions[sortBy] ? parseFloat(b.conditions[sortBy]) : 0) - (a.conditions[sortBy] ? parseFloat(a.conditions[sortBy]) : 0));
//         }
//         else {
//           return runs;
//         }
//       default:
//         return runs;
//     }
//   }
  syncFirebaseToState = () => {
    let {uid} = this.context.user;
    this.setState({loading: true});
    this.context.firebaseDB.syncState(`runs/${uid}`, {
      context: this,
      state: "runs",
      asArray: true,
      then: () => this.setState({loading: false})
    });
  }
//   handleAddRun = () => {
//     this.props.navigation.navigate("AddRun", {newRun: {}});
//   }
//   handleDeleteRun = (id: string) => {
//     let {runs} = this.state;
//     let filtered = runs.filter(run => run.id !== id);
//     this.setState({runs: filtered});
//   }
//   handleViewRun = (ID: string) => {
//     const run = this.state.runs.find(r => r.id === ID);
//     this.props.navigation.navigate("ViewRun", {run, id: ID});
//   }
  handleRowOpen = () => {
    const params = {
        // left: <TextButton title="Done" onPress={this.runList.closeOpenRow} />
    };
    this.props.navigation.setParams(params);
  }
  handleRowClose = () => {
    this.addDefaultHeader();
  }
//   cancelCompareRuns = () => {
//     this.setState({selectRowEnabled: false});
//     this.addDefaultHeader();
//     this.runList.clearSelectedRuns();
//   }
//   handleCompareRuns = () => {
//     const params = {
//           left: <TextButton title="Cancel" onPress={this.cancelCompareRuns} />,
//           right: <TextButton title="Compare" onPress={() => this.compareRuns()} />
//       };
//     this.props.navigation.setParams(params);
//     this.setState({selectRowEnabled: true});
//   }
//   compareRuns = () => {
//     let selectedRuns = this.runList.getSelectedRuns();
//     let runs = this.sortRuns();
//     if (selectedRuns.length === 2) {
//       let run1 = runs[selectedRuns[0]];
//       let run2 = runs[selectedRuns[1]];
//       this.props.navigation.navigate("CompareRuns", {runs: [run1, run2]});
//     }
//     else {
//       Alert.alert("Error Comparing Runs", "Two runs must be selected to compare.");
//     }
//   }
//   sortRuns = () => {
//     let sorted = [];
//     for (let run in this.state.runs) {
//       if (run) {
//         sorted.push(this.state.runs[run]);
//       }
//     }
//     sorted = sorted.sort((a, b) => b.timeslip.date - a.timeslip.date);
//     return sorted;
//   }
//   clearFilters = () => {
//     this.setState({
//       filteredRuns: [], 
//       filterActive: false,
//       filters: {
//         startDate: null,
//         endDate: null,
//         trackLength: "",
//         lane: "",
//         track: "",
//         event: "",
//         order: "DESC",
//         sortBy: "date",
//       }
//     });
//   }
  render() {
    console.log("Render home");
    const {width} = Dimensions.get("window");
    if (!this.state.loading) {
    //   let sortedRuns = this.sortRuns();
      return (
        <View style={[styles.container, {maxWidth: width}]}>
            <Text>This is sample text</Text>
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