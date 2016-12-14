"use strict";
require('react-native');
var react_1 = require('react');
var index_android_js_1 = require('../index.android.js');
// Note: test renderer must be required after react-native.
var react_test_renderer_1 = require('react-test-renderer');
it('renders correctly', function () {
    var tree = react_test_renderer_1.default.create(<index_android_js_1.default />);
});
