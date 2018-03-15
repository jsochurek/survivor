import * as React from "react";
import {StyleSheet, FlexAlignType} from "react-native";
import * as GlobalStyles from "../../util/styles";

export default StyleSheet.create({
    input: {
        fontSize: 15,
        alignSelf: "stretch" as FlexAlignType,
        flex: 1,
        height: 40
    },
    heading: {
        textAlign: "center" as "center",
        fontSize: 18,
        color: GlobalStyles.Colors.black,
        fontWeight: "700" as "700",
        marginVertical: 16
    },
    text: {
        textAlign: "center" as "center",
        color: GlobalStyles.Colors.gray
    },
    inputContainer: {
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: "#e6e6e6",
        marginBottom: 8,
        alignItems: "flex-start" as FlexAlignType,
        // alignSelf: "stretch" as FlexAlignType,
        backgroundColor: "red",
        height: 30,
        width: 200
    },
    forgotPasswordContainer: {
        paddingTop: 16,
        flexDirection: "column" as "column",
        alignItems: "flex-start" as FlexAlignType
    },
    textContainer: {
        paddingVertical: 16
    },
    emailContainer: {
        flexDirection: "row" as "row",
        alignItems: "center" as FlexAlignType,
        alignSelf: "stretch" as FlexAlignType
    },
    emailInputContainer: {
        alignItems: "center" as FlexAlignType,
        flexDirection: "row" as "row",
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: GlobalStyles.Colors.gray,
        marginLeft: 16,
        flex: 1
    },
    buttonContainer: {
        alignItems: "center" as FlexAlignType,
        flexDirection: "row" as "row",
         justifyContent: "center" as "center",
         alignSelf: "center" as FlexAlignType
    },
    button: {
        backgroundColor: GlobalStyles.Colors.basketballOrange,
        alignItems: "center" as FlexAlignType,
        justifyContent: "center" as "center",
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 2,
        marginTop: 24,
        flex: 0,
        alignSelf: "center" as FlexAlignType
    },
    labelStyle: {
        fontSize: 10
    },
    goBackContainer: {
        paddingVertical: 16,
        flexDirection: "row" as "row",
        alignItems: "center" as FlexAlignType,
        justifyContent: "space-between" as "space-between"
    },
    goBackButton: {
        backgroundColor: "transparent",
        borderColor: GlobalStyles.Colors.basketballOrange,
        borderWidth: 2,
        paddingVertical: 4,
        paddingHorizontal: 8,
        borderRadius: 2
    },
    goBackButtonText: {
        color: GlobalStyles.Colors.basketballOrange,
        fontSize: 12
    }
});