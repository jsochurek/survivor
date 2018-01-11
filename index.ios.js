import *as React from 'react';
import {AppRegistry} from 'react-native';
import App from './src/scenes/App';


export default class Survivor extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <App />
    );
  }
}



AppRegistry.registerComponent('survivor', () => Survivor);
