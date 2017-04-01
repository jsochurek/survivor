/// <reference path="../../typings/index.d.ts" />
import * as React from 'react';
import { Text, View } from 'react-native';
export default class Comp2 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text: "Testing Scene 2",
        };
    }
    render() {
        return (React.createElement(View, null,
            React.createElement(Text, null, this.state.text)));
    }
}
//# sourceMappingURL=comp2.js.map