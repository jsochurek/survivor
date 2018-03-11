import * as React from "react";
import {StyleSheet, FlexAlignType} from "react-native";
import * as GlobalStyles from "../../util/styles";

export default StyleSheet.create({
    container: {
        flexDirection: "column" as "column",
        alignItems: "flex-start" as FlexAlignType,
        paddingVertical: 8
    },
    label: {
        fontSize: 13.5,
        color: GlobalStyles.Colors.gray
    },
    input: {
        fontSize: 18,
        color: GlobalStyles.Colors.black,
        height: 40,
        flex: 1
    }
});