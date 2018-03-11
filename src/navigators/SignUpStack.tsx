import * as React from "react";
import {StackNavigator} from "react-navigation";
import {SignUp} from "../scenes/index";

const SignUpStack = StackNavigator({
    SignUp: {screen: SignUp}
    // Subscription: {screen: Subscription}
});