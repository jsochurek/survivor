import * as React from "react";
import {StyleSheet, FlexAlignType} from "react-native";

export default StyleSheet.create({
    container: {
        position: "absolute" as "absolute",
        left: 0,
        right: 0,
        bottom: 0,
        top: 0,
        flex: 1,
        alignItems: "center" as FlexAlignType,
        justifyContent: "center" as "center",
        backgroundColor: "rgba(255,255,255,1)"
    },
    overlay: {
        backgroundColor: "rgba(0,0,0,.25)"
    },
    indicator: {
        alignSelf: "center" as FlexAlignType
    }
});