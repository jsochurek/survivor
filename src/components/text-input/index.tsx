import * as React from "react";
import {TextInput, View, Text, ViewStyle, TextStyle, KeyboardType, ReturnKeyType, TextInputStatic} from "react-native";
import styles from "./styles";
import * as GlobalStyles from "../../util/styles";
import {TextField} from "react-native-material-textfield";

type Props = {
    label: string,
    value: string,
    onChangeText: (value: string, id: string) => void,
    style?: ViewStyle | ViewStyle[],
    labelStyle?: TextStyle | TextStyle[],
    inputStyle?: ViewStyle | ViewStyle[],
    placeholder?: string,
    id: string,
    keyboardType?: KeyboardType,
    returnKey?: ReturnKeyType,
    multiLine?: boolean,
    secureTextEntry?: boolean,
    autoCapitalize?: "none" | "sentences" | "words" | "characters",
    onSubmitEditing?: () => void,
    autoFocus?: boolean
};

type State = {

};

export default class CustomTextInput extends React.Component<Props, State> {
    input: TextInputStatic;
    handleSubmit = () => {
        this.input.blur();
        if (this.props.onSubmitEditing) {
            this.props.onSubmitEditing();
        }
    }
    focus = () => {
        this.input.focus();
    }
    handleChangeText = (value: string) => {
        this.props.onChangeText(value, this.props.id);
    }
    render() {
        return (
                <TextField
                    {...this.props}
                    ref={ref => this.input = ref}
                    label={this.props.label}
                    value={this.props.value}
                    onChangeText={this.handleChangeText}
                    autoCorrect={false}
                    autoCapitalize={this.props.autoCapitalize}
                    multiline={this.props.multiLine}
                    keyboardType={this.props.keyboardType}
                    onSubmitEditing={this.handleSubmit}
                    tintColor={GlobalStyles.Colors.basketballOrange}
                    style={this.props.inputStyle}
                    autoFocus={this.props.autoFocus}
                />
        );
    }
}