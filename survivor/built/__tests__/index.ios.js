"use strict";
require('react-native');
var react_1 = require('react');
var index_ios_js_1 = require('../index.ios.js');
// Note: test renderer must be required after react-native.
var react_test_renderer_1 = require('react-test-renderer');
it('renders correctly', function () {
    var tree = react_test_renderer_1.default.create(<index_ios_js_1.default />);
});
