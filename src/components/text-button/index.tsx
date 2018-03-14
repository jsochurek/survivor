import * as React from "react";
import {TouchableOpacity, ViewStyle, TextStyle, Text} from "react-native";
import styles from "./styles";

type Props = {
    onPress: () => void,
    style?: ViewStyle,
    title: string,
    titleStyle?: TextStyle,
    disabled?: boolean
};

const TextButton = (props: Props) => {
    return (
        <TouchableOpacity disabled={props.disabled} onPress={props.onPress} style={[styles.button, props.style]}>
            <Text style={[styles.label, props.titleStyle]}>{props.title}</Text>
        </TouchableOpacity>
    );
};

export default TextButton;