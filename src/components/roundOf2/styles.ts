import {StyleSheet} from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginLeft: 15,
        marginRight: 15
    },
    firstTwoRounds: {
        flexDirection: "row" as "row",
        justifyContent: "center" as "center",
        flex: 1,
    },
    gameView: {
        marginLeft: 10,
        marginRight: 10,
        marginTop: 15,
        marginBottom: 15
    },
    round: {
        flex: 1,
        flexDirection: "column" as "column",
        justifyContent: "space-around" as "space-around",
        // borderWidth: 1,
    },
    winnerText: {
        color: "green",
        textAlign: "left" as "left",
        fontSize: 16,
        fontWeight: "900" as "900",
        fontFamily: "Roboto" as "Roboto",
    },


});


export default styles;

