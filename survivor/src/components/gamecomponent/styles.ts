/// <reference path="../../../typings/index.d.ts" />
import {StyleSheet} from "react-native";

const styles = StyleSheet.create({
  winnerText: {
    color: "green",
    textAlign: "center" as "center",
    alignSelf: "center" as React.FlexAlignType,
    alignItems: "center" as React.FlexAlignType,
    fontSize: 16,
    fontWeight: "900" as "900",
    fontFamily: "Roboto" as "Roboto",
  },
  loserText: {
    color: "black",
    textAlign: "center" as "center",
    alignSelf: "center" as React.FlexAlignType,
    alignItems: "center" as React.FlexAlignType,
    fontSize: 16,
    fontWeight: "900" as "900",
    fontFamily: "Roboto" as "Roboto",
  },

});


export default styles;

