import * as React from "react";
import * as PropTypes from "prop-types";
import {View, Text, TouchableOpacity, StatusBar, KeyboardAvoidingView, Alert, FlexAlignType, TextInput, ScrollView} from "react-native";
import ResponsiveImage from "react-native-responsive-image";
import * as GlobalStyles from "../../util/styles";
import TextButton from "../../components/text-button";
import Icon from "react-native-vector-icons/Ionicons";
import styles from "./styles";
import LoadingIndicator from "../../components/loading-indicator";
StatusBar.setBarStyle("default");

type Props = {
    navigation: any
};

type State = {
    email?: string,
    width?: number,
    height?: number,
    loading?: boolean,
    submitted?: boolean
};

type Context = {
    firebaseApp: any
};

export class ForgotPassword extends React.Component<Props, State> {
    email: TextInput | any;
    context: Context;
    static contextTypes = {
        firebaseApp: PropTypes.any
    };
    state = {
        email: "",
        height: 0,
        width: 0,
        loading: false,
        submitted: false
    };
    handleChangeEmail = (email: string) => {
        this.setState({email});
    }
    toggleLoading = (loading: boolean) => {
        StatusBar.setNetworkActivityIndicatorVisible(loading);
        this.setState({loading});
    }
    submit = () => {
        this.toggleLoading(true);
        this.context.firebaseApp.auth().sendPasswordResetEmail(this.state.email).then(() => {
            this.toggleLoading(false);
            this.setState({submitted: true});
        }).catch(error => {
            this.toggleLoading(false);
            Alert.alert("Error resetting password", error.message);
        });
    }
    handleLayout = (e: any) => {
        let {width, height} = e.nativeEvent.layout;
        this.setState({width, height});
    }
    requestGoBack = () => {
        this.props.navigation.goBack();
    }
    render() {
        return (
            <View style={{flex: 1}}>
                <ScrollView style={GlobalStyles.Styles.screenContainer} contentContainerStyle={{flex: 1}} onLayout={this.handleLayout}>
                    <KeyboardAvoidingView keyboardVerticalOffset={20} contentContainerStyle={null} behavior="padding" style={{flex: 1, alignItems: "center" as FlexAlignType, justifyContent: "center" as "center"}}>
                        {/* <ResponsiveImage source={require("../../../assets/images/dt-logo.png")} initHeight={225} initWidth={165}/> */}
                        {!this.state.submitted ?
                            <View style={[styles.forgotPasswordContainer, {width: 250}]}>
                                <View style={styles.textContainer}>
                                    <Text style={styles.heading}>Forgot your password?</Text>
                                    <Text style={styles.text}>Enter your email below to receive your password reset instructions.</Text>
                                </View>
                                <View style={styles.emailContainer}>
                                    <Icon name="ios-mail" color={GlobalStyles.Colors.gray} size={24}/>
                                    <View style={[styles.emailInputContainer]}>
                                        <TextInput
                                            ref={ref => this.email = ref }
                                            style={[styles.input]}
                                            onChangeText={this.handleChangeEmail}
                                            value={this.state.email}
                                            keyboardType="email-address"
                                            placeholder="Enter Your Email Address"
                                            autoCapitalize="none"
                                            underlineColorAndroid="transparent"
                                            autoCorrect={false}
                                            autoFocus={true}
                                        />
                                    </View>
                                </View>
                                <View style={styles.buttonContainer}>
                                    <TextButton title="Send Password" style={styles.button} onPress={this.submit}/>
                                </View>
                            </View>
                        :
                            <View style={[styles.forgotPasswordContainer, {width: 250}]}>
                                <View style={styles.textContainer}>
                                    <Text style={styles.heading}>Password Reset Requested</Text>
                                    <Text style={styles.text}>Please check your email for further password reset instructions.</Text>
                                </View>
                            </View>
                        }
                        <View style={styles.goBackContainer}>
                            <TextButton title={this.state.submitted ? "Go to Login" : "Go Back"} style={styles.goBackButton} titleStyle={styles.goBackButtonText} onPress={this.requestGoBack}/>
                        </View>
                    </KeyboardAvoidingView>
                </ScrollView>
                <LoadingIndicator show={this.state.loading} type="overlay"/>
            </View>
        );
    }
}