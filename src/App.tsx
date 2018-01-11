/// <reference path="../typings/index.d.ts" />
import * as React from "react";
import {BackAndroid} from "react-native";
import { Route, StackRoute, TabsRoute, Router, nativeHistory, IndexRoute, withRouter} from "react-router-native";
import Main from './scenes/main/index';
import Wrapper from './components/wrapper/index';
import Login from './scenes/login/index';


const handleHardwareBackPress = (router, exit) => {
  if(router.getCurrentLocation() !== "/"){
    router.pop();
  }
  return true;
}

export default class Routes extends React.Component <{}, {}>{
  render(){
    return (
      <Router history={nativeHistory} onHardwareBackPress={handleHardwareBackPress}>
        <Route path="wrapper" component={withRouter(Wrapper)}>
          <Route path="/" component={Login}/>
          <Route path="/main" component={Main}/>
        </Route>
      </Router>
    );
  }
}
