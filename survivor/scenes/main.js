import * as React from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native';

export default class Main extends React.Component {
    constructor(props) {
        super(props);
        console.log("Main constructor");
        this.state = {
            text: "Testing Scene 1",
        }
    }

    onPress1 = () => {
        this.props.router.push('/1');
    }

    onPress2 = () => {
        this.props.router.push('/2');
    }

    render() {
        return(
            <View>
                <TouchableOpacity onPress={this.onPress1}>
                    <Text>TOUCH FOR SCENE 1</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={this.onPress2}>
                    <Text>TOUCH FOR SCENE 2</Text>
                </TouchableOpacity>
            </View>
        );
    }
}