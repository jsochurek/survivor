/// <reference path="../../../typings/index.d.ts" />
import {StyleSheet, Dimensions} from "react-native";

let {width, height} = Dimensions.get("window");
const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 10,
        marginBottom: 10
    },
    firstTwoRounds: {
        flexDirection: "row" as "row",
        justifyContent: "center" as React.FlexJustifyType,
        flex: 1,
    },
    gameView: {
        marginLeft: 10,
        marginRight: 10
    },
    round: {
        flex: 1,
        flexDirection: "column" as "column",
        justifyContent: "space-around" as React.FlexJustifyType,
        // borderWidth: 1,
    },
wrapper: {
  },
  slide1: {
    flex: 1,
    justifyContent: 'center' as React.FlexJustifyType,
    alignItems: 'center' as React.FlexAlignType,
    backgroundColor: '#9DD6EB',
  },
  slide2: {
    flex: 1,
    justifyContent: 'center' as React.FlexJustifyType,
    alignItems: 'center' as React.FlexAlignType,
    backgroundColor: '#97CAE5',
  },
  slide3: {
    flex: 1,
    justifyContent: 'center' as React.FlexJustifyType,
    alignItems: 'center' as React.FlexAlignType,
    backgroundColor: '#92BBD9',
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold' as 'bold',
  }


});


export default styles;

