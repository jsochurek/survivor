import * as React from 'react';
import {Text, View} from 'react-native';

type State = {
    text: string
}
type Props = {

}

export default class Comp1 extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        console.log("Comp1 constructor");
        this.state = {
            text: "Testing Scene 1",
        }
    }

    render() {
        return(
            <View>
                <Text>{this.state.text}</Text>
            </View>
        );
    }
}