/// <reference path="../../typings/index.d.ts" />
import * as React from 'react';
import { Text, View } from 'react-native';
export default class Comp1 extends React.Component {
    constructor(props) {
        super(props);
        console.log("Comp1 constructor");
        this.state = {
            text: "Testing Scene 1",
        };
    }
    render() {
        return (React.createElement(View, null,
            React.createElement(Text, null, this.state.text)));
    }
}
//# sourceMappingURL=comp1.js.map