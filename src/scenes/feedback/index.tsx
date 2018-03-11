import * as React from "react";
import * as PropTypes from "prop-types";
import {ScrollView, Text, Alert} from "react-native";
import * as GlobalStyles from "../../util/styles";
import IconButton from "../../components/icon-button";
import TextInput from "../../components/text-input";
import TextButton from "../../components/text-button";
import styles from "./styles";

type Props = {
    navigation: any
};

type State = {
    impressions?: string,
    likes?: string,
    issues?: string,
    features?: string,
    submitDisabled?: boolean
};

type Context = {
    user: any
};

export class Feedback extends React.Component<Props, State> {
    context: Context;
    static contextTypes = {
        user: PropTypes.any
    };
    static navigationOptions = ({navigation})  => ({
        title: "Feedback",
        headerStyle: GlobalStyles.Styles.defaultHeader,
        headerTitleStyle: GlobalStyles.Styles.defaultHeaderTitle,
        headerTintColor: GlobalStyles.Colors.red,
        headerLeft: <IconButton onPress={() => navigation.goBack()} icon="ios-arrow-back" iconColor={GlobalStyles.Colors.white} />,
        headerRight: null
    })
    constructor(props: Props) {
        super(props);
        this.state = {
            impressions: "",
            likes: "",
            issues: "",
            features: "",
            submitDisabled: false
        };
    }
    handleInputChange = (value: string, id: string) => {
        this.setState({[id]: value});
    }
    submit = () => {
        let {email, displayName} = this.context.user;
        let {impressions, likes, issues, features} = this.state;
        let formData = {
            email,
            name: displayName,
            impressions,
            likes,
            issues,
            features
        };
        fetch("https://us-central1-dragtuner-de058.cloudfunctions.net/sendFeedback", {
            method: "POST",
            body: JSON.stringify(formData)
        }).then( data => {
            Alert.alert("Feedback Submitted", "Thanks for your feedback, your opinion matters to us!", [
                {text: "Ok", onPress: () => this.props.navigation.goBack()}
            ]);
        }).catch(err => {
            Alert.alert("Feedback Error", "There was an error submitting your feedback, if the problem persists, email us direct at support@dragtuner.com", [
                {text: "Ok", onPress: () => this.props.navigation.goBack()}
            ]);
        });
    }
    render() {
        return (
            <ScrollView style={GlobalStyles.Styles.screenContainer}>
                <Text>We would love to hear you feedback in order to improve Dragtuner.</Text>
                <TextInput id="impressions" label="What are your overall impressions of the app?" value={this.state.impressions} multiLine={true} onChangeText={this.handleInputChange}/>
                <TextInput id="likes" label="What are some things you like?" value={this.state.likes} multiLine={true} onChangeText={this.handleInputChange}/>
                <TextInput id="issues" label="What are the issues you have experienced?" value={this.state.issues} multiLine={true} onChangeText={this.handleInputChange}/>
                <TextInput id="features" label="What features would you like to see added?" value={this.state.features} multiLine={true} onChangeText={this.handleInputChange}/>
                <TextButton title="Submit" onPress={this.submit} style={styles.button} titleStyle={styles.buttonText} />
            </ScrollView>
        );
    }
}