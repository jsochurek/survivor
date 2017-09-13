import * as React from "react";
import {StyleSheet, Dimensions, FlexJustifyType} from "react-native";

let {width, height} = Dimensions.get("window");
const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginLeft: 15,
        marginRight: 15
    },
    firstTwoRounds: {
        flexDirection: "row" as "row",
        justifyContent: "center" as FlexJustifyType,
        flex: 1,
    },
    gameView: {
        marginLeft: 10,
        marginRight: 10,
        marginTop: 15,
        marginBottom: 15
    },
    round: {
        flex: 1,
        flexDirection: "column" as "column",
        justifyContent: "space-around" as FlexJustifyType,
        // borderWidth: 1,
    },
});


export default styles;

