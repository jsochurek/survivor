import * as React from "react";
import {TouchableOpacity, ViewStyle, TextStyle} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import styles from "./styles";

type Props = {
    onPress: () => void,
    style?: ViewStyle,
    icon: string,
    iconSize?: number,
    iconStyle?: TextStyle,
    iconColor?: string
};

const IconButton = (props: Props) => {
    return (
        <TouchableOpacity onPress={props.onPress} style={[styles.button, props.style]}>
            <Icon name={props.icon} size={props.iconSize ? props.iconSize : 24} style={[styles.icon, props.iconStyle]} color={props.iconColor ? props.iconColor : "#ffffff"}/>
        </TouchableOpacity>
    );
};

export default IconButton;