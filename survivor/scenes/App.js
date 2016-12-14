import * as React from "react";
import {BackAndroid} from "react-native";
import { Route, StackRoute, TabsRoute, Router, nativeHistory, IndexRoute, withRouter} from "react-router-native";
import Main from './main';
import Comp1 from './comp1';
import Comp2 from './comp2';


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
        {
        //  <Route path="wrapper" component={withRouter(SceneWrapper)}>
        //     <TabsRoute path="tabs"component={BaseComponent}>
        //       <Route path="/" component={Navigate}/>
        //       <StackRoute path="directory" component={BaseComponent}>
        //         <Route path="/directory" component={Directory}/>
        //         <Route path="/directory/:id" component={withRouter(ClinicDetail)}/>
        //       </StackRoute>
        //     </TabsRoute>
        //   </Route>
        }
        <Route path="/" component={withRouter(Main)}/>
        <Route path="/1" component={Comp1}/>
        <Route path="/2" component={Comp2}/>
      </Router>
    );
  }
}
