import * as React from "react";
import {View, Text, Image} from "react-native";
import styles from "./styles";
const pkg = require("../../../package.json");

type DrawerProps = {
  children?: any
};

export default class CustomDrawer extends React.Component<DrawerProps, {} > {
  render() {
    return(
      <View style={styles.wrapper}>
        <View style={styles.menu}>
          {this.props.children}
        </View>
        <View style={styles.version}>
            <Text style={styles.versionText}>Version: {pkg.version}</Text>
        </View>
      </View>
    );
  }
}