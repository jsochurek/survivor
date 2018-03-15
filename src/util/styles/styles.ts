import {StyleSheet} from "react-native";
import {Colors} from "./colors";

export const Styles = StyleSheet.create({
    defaultHeader: {
        backgroundColor: Colors.basketballOrange,
        shadowColor: Colors.black,
        shadowRadius: 2,
        shadowOpacity: .3,
        shadowOffset: {
            height: 2,
            width: 0
        },
        paddingHorizontal: 16
    },
    defaultTabBar: {
        backgroundColor: Colors.white
    },
    flatHeader: {
        backgroundColor: Colors.basketballOrange,
        paddingHorizontal: 16,
        shadowRadius: 0,
        shadowOpacity: 0,
        shadowColor: "transparent",
        shadowOffset: {
            height: 0,
            width: 0
        },
        elevation: 0
    },
    defaultHeaderTitle: {
         color: Colors.white
    },
    screenContainer: {
        backgroundColor: "#ffffff",
        paddingHorizontal: 16,
        paddingBottom: 16,
        flex: 1
    },
    screenContentContainer: {
        paddingBottom: 16
    },
    sectionHeader: {
        marginVertical: 16,
        fontSize: 20,
        color: Colors.black,
        fontWeight: "700" as "700"
    },
    defaultTabBarTop: {
        backgroundColor: Colors.basketballOrange,
        shadowColor: Colors.black,
        shadowRadius: 2,
        shadowOpacity: .3,
        shadowOffset: {
            height: 2,
            width: 0
        },
        elevation: 4
    },
    headerIconRight: {
        textAlign: "right" as "right"
    },
    defaultDrawerItem: {

    },
    defaultDrawerLabel: {

    }
});