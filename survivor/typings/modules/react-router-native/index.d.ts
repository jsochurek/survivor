declare module "react-router-native" {
    import * as React from "react";
    type Component = React.ReactType;

    interface RouterInterface {
      pop(): void,
      push(route: string): void,
      replace(route: string): void
    }
    
    let Route: any;
    let StackRoute: any;
    let TabsRoute: any;
    let Router: any;
    let nativeHistory: any;
    let Link: any;
    let Pop: any;
    let IndexRoute: any;
    let withRouter: any;
    let NativeRouter: any;

  export {
    Route,
    StackRoute,
    TabsRoute,
    Router,
    nativeHistory,
    Link,
    Pop,
    IndexRoute,
    withRouter,
    NativeRouter,
    RouterInterface
  }
}
