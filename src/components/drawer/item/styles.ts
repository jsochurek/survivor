import {StyleSheet, FlexAlignType} from "react-native";
import * as GlobalStyles from "../../../util/styles/index";

export default StyleSheet.create({
    container: {
      paddingLeft: 16
    },
    text: {
    fontSize: 16,
    marginLeft: 24,
    color: GlobalStyles.Colors.black,
    fontWeight: "bold" as "bold"
  },
  content: {
    flexDirection: "row" as "row",
    alignItems: "center" as FlexAlignType,
    justifyContent: "flex-start" as "flex-start",
    paddingVertical: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: GlobalStyles.Colors.black
  }
});