import * as React from "react";
import * as PropTypes from "prop-types";
import {TextInput, View, Text, TouchableOpacity, StatusBar, KeyboardAvoidingView, Alert, FlexAlignType, ScrollView, Platform} from "react-native";
// import ResponsiveImage from "react-native-responsive-image";
import Icon from "react-native-vector-icons/Ionicons";
import * as GlobalStyles from "../../util/styles";
import TextButton from "../../components/text-button";
import styles from "./styles";
StatusBar.setBarStyle("dark-content");
StatusBar.setBackgroundColor(GlobalStyles.Colors.white);
import LoadingIndicator from "../../components/loading-indicator";

type Props = {
    navigation: any,
    screenProps: any
};

type State = {
    username?: string,
    password?: string,
    loading?: boolean
};

type Context = {
    firebaseApp: any,
    logout: () => void,
    subscriptionValid: boolean
};

export class Login extends React.Component<Props, State> {
    email: TextInput | any;
    password: TextInput | any;
    context: Context;
    static contextTypes = {
        firebaseApp: PropTypes.any,
        logout: PropTypes.func,
        subscriptionValid: PropTypes.bool
    };
    constructor(props: Props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            loading: false
        };
    }
    handleChangeEmail = (username: string) => {
        this.setState({username});
    }
    handleChangePassword = (password: string) => {
        this.setState({password});
    }
    submit = () => {
        this.toggleLoading(true);
        this.context.firebaseApp.auth().signInWithEmailAndPassword(this.state.username, this.state.password)
        .then(firebaseUser => {
            this.toggleLoading(false);
            if (!firebaseUser.emailVerified) {
                Alert.alert("Login Error", "This email address has not been verified, please verify the email address before proceeding.", [
                    {text: "Cancel", onPress: null, style: "cancel"},
                    {text: "Resend Verification", onPress: () => {
                        firebaseUser.sendEmailVerification()
                            .then(() => {
                                console.log("Email verification resent successfully");
                                this.context.firebaseApp.auth().signOut();
                            })
                            .catch((err) => {
                                console.log("There was an error sending the verification: ", err);
                                this.context.firebaseApp.auth().signOut();
                            })
                    }}
                ]);
            }
            else {
                // this.props.navigation.navigate("Main");
                // console.log("User email not verified");
            }
        })
        .catch(error => {
            // Error Handling
            if (error) Alert.alert("Login Attempt Failed", error.message);
            this.setState({password: ""});
            this.toggleLoading(false);
        });
    }
    toggleLoading = (loading: boolean) => {
        if (Platform.OS === "ios") { StatusBar.setNetworkActivityIndicatorVisible(loading); }
        this.setState({loading});
    }
    requestSignUp = () => {
        this.props.navigation.navigate("SignUp");
    }
    requestForgotPassword = () => {
        this.props.navigation.navigate("ForgotPassword");
    }
    render() {
        console.log("Render login.tsx");
        return (
            <View style={{flex: 1}}>
                <ScrollView style={GlobalStyles.Styles.screenContainer} contentContainerStyle={{flex: 1}}>
                    <KeyboardAvoidingView keyboardVerticalOffset={0} contentContainerStyle={null} behavior="padding" style={{flex: 1, alignItems: "center" as FlexAlignType, justifyContent: "center" as "center"}}>
                        {/* <ResponsiveImage source={require("../../../assets/images/dt-logo.png")} initHeight={250} initWidth={184}/> */}
                        <View style={styles.loginContainer}>
                            <View style={styles.emailContainer}>
                                <Icon name="ios-person" color={GlobalStyles.Colors.gray} size={24}/>
                                <View style={styles.emailInputContainer}>
                                    <TextInput autoCapitalize="none" style={styles.input}  ref={ref => this.email = ref} onChangeText={this.handleChangeEmail} onSubmitEditing={() => this.password.focus()} value={this.state.username} keyboardType="email-address" placeholder="Email Address" autoCorrect={false} returnKeyType="next" underlineColorAndroid="transparent" autoFocus={false}/>
                                </View>
                            </View>
                            <View style={styles.passwordContainer}>
                                <Icon name="ios-lock" color={GlobalStyles.Colors.gray} size={24} />
                                <View style={styles.passwordInputContainer}>
                                    <TextInput style={styles.input} ref={ref => this.password = ref} onChangeText={this.handleChangePassword} onSubmitEditing={this.submit} value={this.state.password} secureTextEntry placeholder="********" returnKeyType="done" underlineColorAndroid="transparent"/>
                                </View>
                            </View>
                            <View style={styles.buttonContainer}>
                                <TextButton title="Log In" style={styles.button} onPress={this.submit}/>
                            </View>
                            <TouchableOpacity style={styles.forgotPasswordContainer} onPress={this.requestForgotPassword}>
                                <Text style={styles.forgotPasswordText}>Forgot your password?</Text>
                            </TouchableOpacity>
                            <View style={styles.noAccountContainer}>
                                <Text style={styles.noAccountText}>Don't have an account?</Text>
                                <TextButton title="Sign Up" style={styles.signUpButton} titleStyle={styles.signUpButtonText} onPress={this.requestSignUp}/>
                            </View>
                        </View>
                    </KeyboardAvoidingView>
                </ScrollView>
                <LoadingIndicator show={this.state.loading} type="overlay"/>
            </View>
        );
    }
}