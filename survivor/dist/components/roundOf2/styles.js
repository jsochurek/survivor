import { StyleSheet, Dimensions } from "react-native";
let { width, height } = Dimensions.get("window");
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    firstTwoRounds: {
        flexDirection: "row",
        justifyContent: "center",
        flex: 1,
    },
    gameView: {
        marginLeft: 10,
        marginRight: 10
    },
    round: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "space-around",
    },
    winnerText: {
        color: "green",
        textAlign: "left",
        fontSize: 16,
        fontWeight: "900",
        fontFamily: "Roboto",
    },
});
export default styles;
//# sourceMappingURL=styles.js.map