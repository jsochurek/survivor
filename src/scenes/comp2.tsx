import * as React from 'react';
import {Text, View} from 'react-native';

type State = {
    text: string
}
type Props = {

}

export default class Comp2 extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {
            text: "Testing Scene 2",
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