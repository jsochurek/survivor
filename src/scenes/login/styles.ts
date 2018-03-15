import {StyleSheet, FlexAlignType} from "react-native";
import * as GlobalStyles from "../../util/styles";

export default StyleSheet.create({
    loginContainer: {
        paddingTop: 48,
        flexDirection: "column" as "column"
    },
    emailContainer: {
        flexDirection: "row" as "row",
        alignItems: "center" as FlexAlignType,
    }, 
    passwordContainer: {
        flexDirection: "row" as "row",
         alignItems: "center" as FlexAlignType,
         paddingTop: 8
    },
    buttonContainer: {
        
    },
    button: {
        backgroundColor: GlobalStyles.Colors.basketballOrange,
        alignItems: "center" as FlexAlignType,
        justifyContent: "center" as "center",
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 2,
        marginTop: 32
    },
    input: {
        height: 40,
        width: 200,
        fontSize: 15
    },
    emailInputContainer: {
        alignItems: "center" as FlexAlignType,
        flexDirection: "row" as "row",
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: GlobalStyles.Colors.gray,
        marginLeft: 16
    },
    passwordInputContainer: {
        alignItems: "center" as FlexAlignType,
        flexDirection: "row" as "row",
        marginLeft: 16
    },
    forgotPasswordContainer: {
        paddingVertical: 8
    },
    forgotPasswordText: {
        color: GlobalStyles.Colors.gray,
        fontSize: 12,
        textAlign: "center" as "center"
    },
    noAccountContainer: {
        paddingVertical: 16,
        flexDirection: "row" as "row",
        alignItems: "center" as FlexAlignType,
        justifyContent: "space-between" as "space-between"
    },
    noAccountText: {
        fontSize: 12,
        color: GlobalStyles.Colors.gray
    },
    signUpButton: {
        backgroundColor: "transparent",
        borderColor: GlobalStyles.Colors.basketballOrange,
        borderWidth: 2,
        paddingVertical: 4,
        paddingHorizontal: 8,
        borderRadius: 2
    },
    signUpButtonText: {
        color: GlobalStyles.Colors.basketballOrange,
        fontSize: 12
    }
});