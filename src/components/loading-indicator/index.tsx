import * as React from "react";
import {ActivityIndicator, View} from "react-native";
import styles from "./styles";
import * as GlobalStyles from "../../util/styles";

type Props = {
    show: boolean,
    type?: "overlay" | "full-screen"
};


export default class LoadingIndicator extends React.Component<Props, {}> {
    static defaultProps = {
        type: "full-screen"
    };
    render() {
        if (this.props.type === "overlay" && !this.props.show) {
            return (<View />);
        }
        else {
            return (
                <View style={[styles.container, this.props.type === "overlay" && styles.overlay]}>
                    <ActivityIndicator
                        animating={this.props.show}
                        style={styles.indicator}
                        size="large"
                        color={GlobalStyles.Colors.red}
                    />
                </View>
            );
        }
    }
}