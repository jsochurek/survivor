import {StyleSheet, FlexAlignType} from "react-native";
import {Colors} from "../../util/styles";

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#ffffff"
    },
    buttonContainer: {
        padding: 16,
        flexDirection: "row" as "row"
    },
    clearFilterContainer: {
        paddingVertical: 16,
        paddingHorizontal: 16,
        flexDirection: "row" as "row",
        alignItems: "center" as FlexAlignType,
        justifyContent: "space-around" as "space-around"
    },
    clearFilterButton: {
        backgroundColor: "transparent",
        borderColor: Colors.red,
        borderWidth: 2,
        paddingVertical: 5,
        paddingHorizontal: 8,
        borderRadius: 3
    },
    clearFilterButtonText: {
        color: Colors.red,
        fontSize: 16,
        fontWeight: "500" as "500"
    },
    horizontalSpacer: {
        width: 8
    },
    button: {
        backgroundColor: "#f44336",
        borderRadius: 3,
        paddingVertical: 8,
        flex: 1,
        alignSelf: "flex-start" as FlexAlignType,
        marginBottom: 8
    },
    buttonText: {
        color: "#f9f9f9",
        fontSize: 15,
        fontWeight: "700" as "700",
        textAlign: "center" as "center"
    },
    rightIcon: {
        textAlign: "right" as "right"
    }
});