import {StyleSheet} from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    firstTwoRounds: {
        flexDirection: "row" as "row",
        justifyContent: "center" as "center",
        flex: 1,
    },
    gameView: {
        marginLeft: 10,
        marginRight: 10
    },
    round: {
        flex: 1,
        flexDirection: "column" as "column",
        justifyContent: "space-around" as "space-around",
        // borderWidth: 1,
    },



});


export default styles;

