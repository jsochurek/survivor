import {StyleSheet, FlexAlignType, Platform} from "react-native";
import * as GlobalStyles from "../../util/styles";

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: GlobalStyles.Colors.white,
    paddingTop: Platform.OS === "android" ? 24 : 24
  },
  logo: {
    marginLeft: 16,
    width: 100,
    height: 135.5
  },
  imageContainer: {
    paddingVertical: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: GlobalStyles.Colors.black
  },
  menu: {
    paddingBottom: 0
  },
  link: {

  },
  active: {

  },
  linkText: {
    fontSize: 18,
    marginLeft: 48,
    color: GlobalStyles.Colors.black
  },
  linkContent: {
    flexDirection: "row" as "row",
    alignItems: "center" as FlexAlignType,
    justifyContent: "flex-start" as "flex-start",
    paddingVertical: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: GlobalStyles.Colors.black
  },
  version: {
    alignItems: "flex-end" as FlexAlignType,
    justifyContent: "flex-end" as "flex-end",
    position: "absolute" as "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: "column" as "column",
    paddingRight: 16,
    paddingVertical: 16,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderColor: GlobalStyles.Colors.black
  },
  versionText: {
    color: GlobalStyles.Colors.black
  }
});

export default styles;