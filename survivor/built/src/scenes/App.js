"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require("react");
var react_router_native_1 = require("react-router-native");
var main_1 = require('./main');
var comp1_1 = require('./comp1');
var comp2_1 = require('./comp2');
var handleHardwareBackPress = function (router, exit) {
    if (router.getCurrentLocation() !== "/") {
        router.pop();
    }
    return true;
};
var Routes = (function (_super) {
    __extends(Routes, _super);
    function Routes() {
        _super.apply(this, arguments);
    }
    Routes.prototype.render = function () {
        return (<react_router_native_1.Router history={react_router_native_1.nativeHistory} onHardwareBackPress={handleHardwareBackPress}>
        
        <react_router_native_1.Route path="/" component={react_router_native_1.withRouter(main_1.default)}/>
        <react_router_native_1.Route path="/1" component={comp1_1.default}/>
        <react_router_native_1.Route path="/2" component={comp2_1.default}/>
      </react_router_native_1.Router>);
    };
    return Routes;
}(React.Component));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Routes;
