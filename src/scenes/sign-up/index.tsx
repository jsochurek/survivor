import * as React from "react";
import * as PropTypes from "prop-types";
import {View, Text, KeyboardAvoidingView, Alert, FlexAlignType, ScrollView, StatusBar, Platform} from "react-native";
import * as GlobalStyles from "../../util/styles";
import TextInput from "../../components/text-input";
import TextButton from "../../components/text-button";
import styles from "./styles";
import ResponsiveImage from "react-native-responsive-image";
import LoadingIndicator from "../../components/loading-indicator";

type Props = {
    navigation: any
};

type State = {
    email?: string,
    name?: string,
    password?: string,
    passwordConfirm?: string,
    signedUp?: boolean,
    loading?: boolean
};

type Context = {
    firebaseApp: any,
    firebaseDB: any,
    logout: () => void
};

export class SignUp extends React.Component<Props, State> {
    email: TextInput | any;
    name: TextInput | any;
    password: TextInput | any;
    passwordConfirm: TextInput | any;
    context: Context;
    state = {
        name: "",
        email: "",
        password: "",
        passwordConfirm: "",
        signedUp: false,
        loading: false
    };
    static contextTypes = {
        firebaseApp: PropTypes.any,
        firebaseDB: PropTypes.any,
        logout: PropTypes.func
    };
    handleChangeEmail = (value: string) => {
        this.setState({email: value});
    }
    handleChangeName = (value: string) => {
        this.setState({name: value});
    }
    handleChangePassword = (value: string) => {
        this.setState({password: value});
    }
    handleChangePasswordConfirm = (value: string) => {
        this.setState({passwordConfirm: value});
    }
    toggleLoading = (loading: boolean) => {
        if (Platform.OS === "ios") { StatusBar.setNetworkActivityIndicatorVisible(loading); }
        this.setState({loading});
    }
    submit = () => {
        this.toggleLoading(true);
        const {name} = this.state;
        this.context.firebaseApp.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
            .then(user => {
                this.addUserToDatabase(user);
                user.sendEmailVerification();
                user.updateProfile({displayName: name});
                this.handleSuccessAccountCreation();
                this.toggleLoading(false);
            })
            .then(() => {
                this.context.logout();
            })
            .catch(error => {
                this.toggleLoading(false);
                if (error) Alert.alert("Error Creating Account", error.message);
            });
    }
    addUserToDatabase = (user: any) => {
        this.context.firebaseDB.post(`users/${user.uid}`, {
            data: {
                id: user.uid,
                name: this.state.name,
                subscribed: false,
                email: user.email,
                emailVerified: user.emailVerified,
                creationTime: user.metadata.creationTime,
                lastSignInTime: user.metadata.lastSignInTime
            }
        });
    }
    handleSuccessAccountCreation = () => {
        this.setState({signedUp: true});
        Alert.alert("Account Created", "We have sent you an email verification to the email address provided. Please verify your email before logging in.", [
            {text: "OK", onPress: null}
        ]);
    }
    requestSignIn = () => {
        this.props.navigation.goBack();
    }
    handleSubmitEditing = (field: string) => {
        switch (field) {
            case "name":
                this.email.focus();
                break;
            case "email":
                this.password.focus();
                break;
            case "password":
                this.passwordConfirm.focus();
                break;
            case "passwordConfirm":
                this.submit();
                break;
            default:
                // Do Nothing
        }
    }
    handleGoToLogin = () => {
        this.setState({signedUp: false}, () => this.props.navigation.goBack());
    }
    render() {
        console.log("render sign-up");
        if (!this.state.signedUp) {
            return (
                <View style={{flex: 1}}>
                    <ScrollView style={GlobalStyles.Styles.screenContainer} contentContainerStyle={{flex: 1}}>
                        <KeyboardAvoidingView keyboardVerticalOffset={Platform.OS === "ios" ? 0 : -500} contentContainerStyle={null} behavior={Platform.OS === "ios" ? "padding" : "padding"} style={{flex: 1, alignItems: "center" as FlexAlignType, justifyContent: "center" as "center"}}>
                            {/* <ResponsiveImage source={require("../../../assets/images/dt-logo.png")} initHeight={125} initWidth={92}/> */}
                            <View style={styles.signUpContainer}>
                                <TextInput id="name" ref={ref => this.name = ref} inputStyle={styles.input} style={styles.inputContainer} onChangeText={this.handleChangeName} value={this.state.name} label="Name" labelStyle={styles.labelStyle} placeholder="Enter Your Full Name" autoCapitalize="words" onSubmitEditing={() => this.handleSubmitEditing("name")} returnKey="next" autoFocus={true}/>
                                <TextInput id="email" ref={ref => this.email = ref } inputStyle={styles.input} style={styles.inputContainer} onChangeText={this.handleChangeEmail} value={this.state.email} label="Email Address" keyboardType="email-address" labelStyle={styles.labelStyle} placeholder="Enter Your Email Address" autoCapitalize="none" onSubmitEditing={() => this.handleSubmitEditing("email")} returnKey="next"/>
                                <TextInput id="password" ref={ref => this.password = ref} inputStyle={styles.input} style={styles.inputContainer} onChangeText={this.handleChangePassword} value={this.state.password} label="Password" secureTextEntry labelStyle={styles.labelStyle} placeholder="Choose a Password" onSubmitEditing={() => this.handleSubmitEditing("password")} returnKey="next" autoCapitalize="none"/>
                                <TextInput id="passwordConfirm" ref={ref => this.passwordConfirm = ref} inputStyle={styles.input} style={styles.inputContainer} onChangeText={this.handleChangePasswordConfirm} value={this.state.passwordConfirm} label="Confirm Password" secureTextEntry labelStyle={styles.labelStyle} placeholder="Confirm Your Password" onSubmitEditing={() => this.handleSubmitEditing("passwordConfirm")} returnKey="done" autoCapitalize="none"/>
                                <View style={styles.submitContainer}>
                                    <TextButton onPress={this.submit} title="Sign Up" style={styles.buttonStyle} titleStyle={styles.buttonTitleStyle}/>
                                </View>
                                <View style={styles.haveAccountContainer}>
                                    <Text style={styles.haveAccountText}>Already have an account?</Text>
                                    <TextButton title="Sign In" style={styles.signInButton} titleStyle={styles.signInButtonText} onPress={this.handleGoToLogin}/>
                                </View>
                            </View>
                        </KeyboardAvoidingView>
                    </ScrollView>
                    <LoadingIndicator show={this.state.loading} type="overlay"/>
                </View>
            );
        }
        else {
            return (
                <ScrollView style={GlobalStyles.Styles.screenContainer} contentContainerStyle={{flex: 1}}>
                    <View style={{flex: 1, alignItems: "center" as FlexAlignType, justifyContent: "space-around" as "space-around", paddingTop: 16}}>
                        {/* <ResponsiveImage source={require("../../../assets/images/dt-logo.png")} initHeight={250} initWidth={184}/> */}
                        <View style={styles.accountSuccessContainer}>
                            <Text style={styles.accountSuccessText}>Your account has been created.</Text>
                            <Text style={[styles.accountSuccessText, {marginTop: 24}]}>Please check your email for a verificiation email before logging in.</Text>
                        </View>
                        <TextButton title="Go to Login" style={styles.buttonStyle} titleStyle={styles.buttonTitleStyle} onPress={this.requestSignIn}/>
                    </View>
                </ScrollView>
            );
        }
    }
}