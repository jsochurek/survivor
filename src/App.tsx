import * as React from "react";
import Main from './scenes/main/index';
import Wrapper from './components/wrapper/index';
import Login from './scenes/login/index';
import {StackNavigator, TabNavigator} from "react-navigation";
import Bracket from './scenes/bracket/index';
import MakePick from './scenes/make-pick/index';

export const Tabs = TabNavigator({
  Login: {
    screen: Login,
  },
  Main: {
    screen: Main,
  },
});


const SurvivorApp = StackNavigator({
  Login: { screen: Login },
  Main: { screen: Main },
  Bracket: { screen: Bracket },
  MakePick: { screen: MakePick }
});

export default class App extends React.Component{
  render() {
    return (
      <Wrapper>
        <SurvivorApp />
      </Wrapper>
    )
  }
}
