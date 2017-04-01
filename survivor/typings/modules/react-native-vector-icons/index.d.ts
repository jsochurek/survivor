declare module "react-native-vector-icons" {
  import * as React from "react";
  interface IconProperties extends React.TextProperties {
    name: string;
    size: number;
    color: string;
  }
  interface IconStatic extends React.ComponentClass<IconProperties> {

  }
  export function createIconSetFromIcoMoon(iconSet: any): IconStatic;
}