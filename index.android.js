import *as React from 'react';
import {AppRegistry} from 'react-native';
import App from './dist/App';


export default class Survivor extends React.Component {
  constructor() {
    super();
    console.log("index.android.js");
  }

  render() {
    return (
      <App />
    );
  }
}



AppRegistry.registerComponent('survivor', () => Survivor);
