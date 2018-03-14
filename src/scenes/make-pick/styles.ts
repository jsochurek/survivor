import {StyleSheet, FlexAlignType} from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 10,
        marginBottom: 10
    },
    firstTwoRounds: {
        flexDirection: "row" as "row",
        justifyContent: "center" as "center",
        flex: 1,
    },
    gameView: {
        marginLeft: 10,
        marginRight: 10,
        marginTop: 20
    },
    round: {
        flex: 1,
        flexDirection: "column" as "column",
        justifyContent: "space-around" as "center",
        // borderWidth: 1,
    },
wrapper: {
  },
  slide1: {
    flex: 1,
    justifyContent: "center" as "center",
    alignItems: "center" as FlexAlignType,
    backgroundColor: '#9DD6EB',
  },
  slide2: {
    flex: 1,
    justifyContent: "center" as "center",
    alignItems: "center" as FlexAlignType,
    backgroundColor: '#97CAE5',
  },
  slide3: {
    flex: 1,
    justifyContent: "center" as "center",
    alignItems: "center" as FlexAlignType,
    backgroundColor: '#92BBD9',
  },
  text: {
    color: 'black',
    fontSize: 20,
    // fontWeight: 'bold' as 'bold'
  },
  textLinethrough: {
    color: 'black',
    fontSize: 20,
    // fontWeight: 'bold' as 'bold',
    textDecorationLine: "line-through"
  },

  teamContainer: {
    marginLeft: 15,
    marginRight: 15,
    marginBottom: 5
  },
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


export default styles;

