/// <reference path="../../../typings/index.d.ts" />
import {StyleSheet} from "react-native";

const styles = StyleSheet.create({
  winnerText: {
    color: "green",
    textAlign: "left" as "left",
    // alignSelf: "center" as React.FlexAlignType,
    // alignItems: "center" as React.FlexAlignType,
    fontSize: 16,
    fontWeight: "900" as "900",
    fontFamily: "Roboto" as "Roboto",
  },
  loserText: {
    color: "black",
    textAlign: "left" as "left",
    // alignSelf: "center" as React.FlexAlignType,
    // alignItems: "center" as React.FlexAlignType,
    fontSize: 16,
    fontWeight: "900" as "900",
    fontFamily: "Roboto" as "Roboto",
  },
  game: {
    paddingTop: 10,
    paddingBottom: 10
  }

});


export default styles;

