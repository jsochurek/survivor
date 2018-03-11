import * as React from "react";
import {StackNavigator} from "react-navigation";
import {SignUp} from "../scenes/index";
// import Main from '../scenes/main/index';

const SignUpStack = StackNavigator({
    SignUp: {screen: SignUp},
    // Main: {screen: Main}
    // Subscription: {screen: Subscription}
});