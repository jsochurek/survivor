import {StyleSheet, FlexAlignType} from "react-native";

export default StyleSheet.create({
    button: {
        backgroundColor: "#f44336",
        borderRadius: 3,
        paddingVertical: 8,
        alignSelf: "stretch" as FlexAlignType,
        marginBottom: 8,
        marginTop: 24
    },
    buttonText: {
        color: "#f9f9f9",
        fontSize: 15,
        fontWeight: "700" as "700",
        textAlign: "center" as "center"
    }
});