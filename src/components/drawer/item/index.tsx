import * as React from "react";
import {View, Text, TouchableHighlight} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import styles from "./styles";
import * as GlobalStyles from "../../../util/styles/index";

type Props = {
    onPress: () => void,
    route: any
};

export default class DrawerItem extends React.Component<Props, {}> {
    handlePress = () => {
        this.props.onPress();
    }
    render() {
        let icon: string;
        switch (this.props.route.routeName) {
            case "Home":
                icon = "ios-home-outline";
                break;
            case "Feedback":
                icon = "ios-chatbubbles-outline";
                break;
            case "Logout":
                icon = "ios-exit-outline";
                break;
            default:
                icon = "";
        }
        return(
            <TouchableHighlight
                onPress={this.handlePress}
                style={styles.container}
                underlayColor={GlobalStyles.Colors.white}
            >
            <View style={styles.content}>
              <Icon name={icon} size={30} color={GlobalStyles.Colors.red}/>
              <Text style={styles.text}>{this.props.route.routeName}</Text>
            </View>
            </TouchableHighlight>
        );
    }
}