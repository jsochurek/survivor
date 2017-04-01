import * as React from "react";
import {StyleSheet, Dimensions} from "react-native";

let {width, height} = Dimensions.get("window");
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    firstTwoRounds: {
        flexDirection: "row" as "row",
        justifyContent: "center" as React.FlexJustifyType,
        flex: 1,
    },
    gameView: {
        marginLeft: 10,
        marginRight: 10
    },
    round: {
        flex: 1,
        flexDirection: "column" as "column",
        justifyContent: "space-around" as React.FlexJustifyType,
        // borderWidth: 1,
    },
winnerText: {
    color: "green",
    textAlign: "left" as "left",
    fontSize: 16,
    fontWeight: "900" as "900",
    fontFamily: "Roboto" as "Roboto",
  },


});


export default styles;

