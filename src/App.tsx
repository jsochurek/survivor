import * as React from "react";
import * as PropTypes from "prop-types";
import {StatusBar, Platform} from "react-native";
// import Main from './scenes/main/index';
// import Wrapper from './components/wrapper/index';
import { ForgotPassword, Login, SignUp } from "./scenes";
import {StackNavigator} from "react-navigation";
import AuthenticatedDrawer from "./navigators/MainDrawer";
import * as GlobalStyles from "./util/styles";
import LoadingIndicator from "./components/loading-indicator";
// import Bracket from './scenes/bracket/index';
// import MakePick from './scenes/make-pick/index';
const firebase = require("firebase");
const Rebase = require("re-base");
require("firebase/auth");
const config = {
  apiKey: "AIzaSyAtOZ0Bi6QOsXKndmfxiunM7m3C4l3cl_s",
  authDomain: "survivr-cfd9e.firebaseapp.com",
  databaseURL: "https://survivr-cfd9e.firebaseio.com",
  projectId: "survivr-cfd9e",
  storageBucket: "survivr-cfd9e.appspot.com",
  messagingSenderId: "638722860942"
};


const app = firebase.initializeApp(config);
const DB = Rebase.createClass(app.database());
// export const Tabs = TabNavigator({
//   Login: {
//     screen: Login,
//   },
//   Main: {
//     screen: Main,
//   },
// });
const UnAuthenticatedWrapper = StackNavigator({
  Login: {screen: Login},
  SignUp: {screen: SignUp},
  ForgotPassword: {screen: ForgotPassword}
}, {
  headerMode: "none",
  initialRouteName: "Login"
});

// const AuthenticatedWrapper = StackNavigator({
//   Home: {screen: AuthenticatedDrawer}
// }, {
//   headerMode: "screen"
// });


// const SurvivrApp = StackNavigator({
//   Login: { screen: Login },
//   Main: { screen: Main },
//   Bracket: { screen: Bracket },
//   MakePick: { screen: MakePick }
// });
type Props = {

};

type State = {
  loading?: boolean,
  authenticated?: boolean,
  user?: any,
  currentGroup?: string,
  subscriptionValid?: boolean,
  // verifyingSubscription?: boolean,
  group?: any
};

export default class App extends React.Component{
  static childContextTypes = {
    firebaseApp: PropTypes.any,
    firebaseDB: PropTypes.any,
    logout: PropTypes.func,
    user: PropTypes.any,
    toggleLoading: PropTypes.func,
    subscriptionValid: PropTypes.bool,
    updateSubscriptionStatus: PropTypes.func,
    currentGroup: PropTypes.string,
    changeGroup: PropTypes.func,
    group: PropTypes.any
  };
  state = {
    loading: true,
    authenticated: false,
    user: null,
    subscriptionValid: true,
    // verifyingSubscription: true,
    currentGroup: null, // "-L7XBwzq9wt5-s95AxFv", //TODO store the most recently joined group in async storage,
    group: null
  };
  getChildContext() {
    return {
      firebaseApp: app,
      firebaseDB: DB,
      logout: this.logout,
      user: this.state.user,
      toggleLoading: this.toggleLoading,
      subscriptionValid: this.state.subscriptionValid,
      updateSubscriptionStatus: this.updateSubscriptionStatus,
      changeGroup: this.changeGroup,
      currentGroup: this.state.currentGroup,
      group: this.state.group
    };
  }
  changeGroup = (group: string) => {
    console.log("changing current group to ", group);
    this.setState({currentGroup: group}, () => this.syncFirebaseGroupToState());
  }
  updateSubscriptionStatus = (status: boolean) => {
    this.setState({subscriptionValid: status});
  }
  componentDidMount() {
    app.auth().onAuthStateChanged(this.authListener);
    // this.checkSubscription();
    console.log("User in CDM: ", this.state.user);
    // DEBUG ONLY
    // this.setState({verifyingSubscription: false, subscriptionValid: false});
    // this.syncFirebaseToState();
    // this.syncFirebaseGroupToState();
  }
  // checkSubscription = () => {
  //   if (Platform.OS === "ios") {
  //     InAppUtils.receiptData((error, receiptData) => {
  //         if (error) {
  //           if (error === "not_available") {
  //               this.setState({subscriptionValid: false, verifyingSubscription: false});
  //           }
  //         }
  //         else {
  //           validateReceipt(receiptData)
  //             .then((validationData) => {
  //               console.log(validationData);
  //               let receipts = validationData["latest_receipt_info"];
  //               let latestReceipt = receipts[receipts.length - 1];
  //               let expireDate = new Date(parseInt(latestReceipt.expires_date_ms));
  //               let now = new Date();
  //               let valid = expireDate >= now;
  //               this.setState({subscriptionValid: valid, verifyingSubscription: false});
  //             })
  //             .catch(err => {
  //               this.setState({subscriptionValid: false, verifyingSubscription: false});
  //               console.log("Error validating the receipt:  ", err);
  //             });
  //         }
  //     });
  //   }
  //   else if (Platform.OS === "android") {
  //     InAppBilling.open()
  //       .then(() => {
  //         InAppBilling.loadOwnedPurchasesFromGoogle()
  //           .then(() => {
  //             console.log("Successfully refreshed owned purchases from Google");
  //             InAppBilling.listOwnedSubscriptions()
  //                 .then(subscriptions => {
  //                   console.log("DragTuner subscription count:  ", subscriptions.length);
  //                   let valid = false;
  //                   subscriptions.forEach((s) => {
  //                     console.log(s);
  //                     if (s === "com.dragtuner.dragtuner.base_monthly_subscription" || s === "com.dragtuner.dragtuner.base_yearly_subscription") {
  //                       valid = true;
  //                     }
  //                   });
  //                   console.log("Is the subscription valid?  ", valid);
  //                   this.setState({subscriptionValid: valid, verifyingSubscription: false});
  //                 });
  //             })
  //             .then(() => {
  //                 InAppBilling.close();
  //             })
  //             .catch(() => {
  //               console.log("Could not access owned subscriptions");
  //               InAppBilling.close();
  //             });
  //           })
  //           .catch(() => {
  //             console.log("Could not refresh subscriptions from Google");
  //             InAppBilling.close();
  //           });
  //   }
  // }
  authListener = (user: any) => {
    console.log("authlistener", user);
    if (user) {
      this.toggleLoading(true);
      DB.fetch(`users/${user.uid}`, {
        context: this,
        asArray: false
      })
      .then(u => {
        if (u.subscriptionStatus) {
          let shouldBypassCheck = true; // shouldBypassSubscriptionCheck(u.subscriptionStatus);
          // this.setState({verifyingSubscription: false, subscriptionValid: shouldBypassCheck});
          this.setState({subscriptionValid: shouldBypassCheck});
        }
        else {
          console.log("user has no status");
        }
        if (u && JSON.stringify(u) !== JSON.stringify({})) {
          console.log("DB.update");
          DB.update(`users/${user.uid}`, {
            data: {
              emailVerified: user.emailVerified,
              lastSignInTime: new Date().toUTCString()
            }
          })
          .then(() => {
            this.syncFirebaseUserToState(user.uid);
            this.toggleLoading(false);
          })
        }
        else {
          // This is a new user to add to DB
          console.log("app db.post");
          DB.post(`users/${user.uid}`, {
            data: {
              id: user.uid,
              name: user.displayName,
              subscribed: false,
              email: user.email,
              emailVerified: user.emailVerified,
              creationTime: user.metadata.creationTime,
              lastSignInTime: new Date().toUTCString()
            }
          })
          .then(() => {
            this.syncFirebaseUserToState(user.uid);
            this.toggleLoading(false);
          })
        }
      })
      .then(() => {
        this.toggleLoading(false);
      })
    }
    else {
      console.log("authlistener user is no good");
      this.setState({
        user: user
      });
      this.toggleLoading(false);
    }
    // console.log("setting state.user", user.uid, user.picks)
    // this.setState({
    //   user
    // });
  }
  logout = () => {
    app.auth().signOut();
  }
  toggleLoading = (loading: boolean) => {
    this.setState({loading});
  }

  syncFirebaseUserToState = (uid: string) => {
    this.setState({loading: true}, () => {
      DB.syncState(`users/${uid}`, {
        context: this,
        state: "user",
        asArray: false,
        then: () => this.setState({loading: false})
      });
    });
  }
  syncFirebaseGroupToState = () => {
    this.setState({loading: true}, () => {
      DB.syncState(`groups/${this.state.currentGroup}`, {
        context: this,
        state: "group",
        asArray: false,
        then: () => this.setState({loading: false})
      });
    });
  }

  render() {
    console.log("render app");
    StatusBar.setBarStyle("dark-content");
    if (this.state.loading) {
      console.log("render app loadingindicator");
      return (
        <LoadingIndicator show={this.state.loading}/>
      );
    }
    else {
      if (this.state.user !== null && this.state.user.emailVerified) {
        console.log("render app authenticateddrawer");
        if (Platform.OS === "android") {
          StatusBar.setBackgroundColor(GlobalStyles.Colors.basketballOrange);
        }
        return (<AuthenticatedDrawer onNavigationStateChange={null}/>);
      }
      // else if (this.state.user !== null && this.state.user.emailVerified) {
      //   console.log("render app unauthenticateddrawer");
      //   return (
      //     <UnAuthenticatedWrapper />
      //   );
      // }
      else {
        console.log("render app UnAuthenticatedWrapper")
        return (<UnAuthenticatedWrapper/>);
      }
    }
  }
}
