"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require('react');
var react_native_1 = require('react-native');
var Main = (function (_super) {
    __extends(Main, _super);
    function Main(props) {
        var _this = this;
        _super.call(this, props);
        this.onPress1 = function () {
            _this.props.router.push('/1');
        };
        this.onPress2 = function () {
            _this.props.router.push('/2');
        };
        console.log("Main constructor");
        this.state = {
            text: "Testing Scene 1",
        };
    }
    Main.prototype.render = function () {
        return (<react_native_1.View>
                <react_native_1.TouchableOpacity onPress={this.onPress1}>
                    <react_native_1.Text>TOUCH FOR SCENE 1</react_native_1.Text>
                </react_native_1.TouchableOpacity>
                <react_native_1.TouchableOpacity onPress={this.onPress2}>
                    <react_native_1.Text>TOUCH FOR SCENE 2</react_native_1.Text>
                </react_native_1.TouchableOpacity>
            </react_native_1.View>);
    };
    return Main;
}(React.Component));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Main;
