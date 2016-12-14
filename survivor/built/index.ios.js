"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require('react');
var react_native_1 = require('react-native');
var App_1 = require('./src/scenes/App');
var Survivor = (function (_super) {
    __extends(Survivor, _super);
    function Survivor() {
        _super.call(this);
    }
    Survivor.prototype.render = function () {
        return (<App_1.default />);
    };
    return Survivor;
}(React.Component));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Survivor;
react_native_1.AppRegistry.registerComponent('survivor', function () { return Survivor; });
