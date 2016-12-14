declare module "react-native-webview-bridge" {
    import React = __React;
    type Component = React.ReactType;
    class ReactNativeWebviewBridge extends React.Component< {}, {}> {
        props: any;
        sendToBridge(message: string): void;
        setState(): any;
        render(): any;
    }
    export default ReactNativeWebviewBridge;
}