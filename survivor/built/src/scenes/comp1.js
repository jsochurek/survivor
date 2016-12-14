"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require('react');
var react_native_1 = require('react-native');
var Comp1 = (function (_super) {
    __extends(Comp1, _super);
    function Comp1(props) {
        _super.call(this, props);
        console.log("Comp1 constructor");
        this.state = {
            text: "Testing Scene 1",
        };
    }
    Comp1.prototype.render = function () {
        return (<react_native_1.View>
                <react_native_1.Text>{this.state.text}</react_native_1.Text>
            </react_native_1.View>);
    };
    return Comp1;
}(React.Component));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Comp1;
