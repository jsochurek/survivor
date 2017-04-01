/// <reference path="../typings/index.d.ts" />
import * as React from "react";
import { Route, Router, nativeHistory, withRouter } from "react-router-native";
import Main from './scenes/main/index';
import Wrapper from './components/wrapper/index';
import Login from './scenes/login/index';
const handleHardwareBackPress = (router, exit) => {
    if (router.getCurrentLocation() !== "/") {
        router.pop();
    }
    return true;
};
export default class Routes extends React.Component {
    render() {
        return (React.createElement(Router, { history: nativeHistory, onHardwareBackPress: handleHardwareBackPress },
            React.createElement(Route, { path: "wrapper", component: withRouter(Wrapper) },
                React.createElement(Route, { path: "/", component: Login }),
                React.createElement(Route, { path: "/main", component: Main }))));
    }
}
//# sourceMappingURL=App.js.map