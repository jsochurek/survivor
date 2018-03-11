import {StyleSheet, FlexAlignType} from "react-native";
import * as GlobalStyles from "../../util/styles";

export default StyleSheet.create({
    signUpContainer: {
        flexDirection: "column" as "column",
        width: 250,
        paddingTop: 12,
        // alignSelf: "center" as FlexAlignType,
        // justifyContent: "space-around" as "space-around"
    },
    input: {
        fontSize: 15,
        height: 30
    },
    inputContainer: {
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: "#e6e6e6",
        marginBottom: 8
    },
    submitContainer: {
        
    },
    buttonStyle: {
        backgroundColor: GlobalStyles.Colors.red,
        alignItems: "center" as FlexAlignType,
        justifyContent: "center" as "center",
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 2,
        marginTop: 16
    },
    buttonTitleStyle: {

    },
    haveAccountContainer: {
        paddingVertical: 16,
        flexDirection: "row" as "row",
        alignItems: "center" as FlexAlignType,
        justifyContent: "space-between" as "space-between"
    },
    haveAccountText: {
        fontSize: 12,
        color: GlobalStyles.Colors.gray
    },
    signInButton: {
        backgroundColor: "transparent",
        borderColor: GlobalStyles.Colors.red,
        borderWidth: 2,
        paddingVertical: 4,
        paddingHorizontal: 8,
        borderRadius: 2
    },
    signInButtonText: {
        color: GlobalStyles.Colors.red,
        fontSize: 12
    },
    labelStyle: {
        fontSize: 10
    },
    accountSuccessText: {
        fontSize: 15,
        textAlign: "center" as "center"
    },
    accountSuccessContainer: {
        width: 250,
        paddingTop: 16,
        alignSelf: "center" as FlexAlignType
    }
});