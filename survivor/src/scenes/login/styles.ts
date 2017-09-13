import {StyleSheet, Dimensions, FlexJustifyType} from "react-native";
import * as React from 'react';

let {width, height} = Dimensions.get("window");
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    firstTwoRounds: {
        flexDirection: "row" as "row",
        justifyContent: "center" as FlexJustifyType,
        flex: 1,
    },
    gameView: {
        marginLeft: 10,
        marginRight: 10
    },
    round: {
        flex: 1,
        flexDirection: "column" as "column",
        justifyContent: "space-around" as FlexJustifyType,
        // borderWidth: 1,
    },



});


export default styles;

