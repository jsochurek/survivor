declare module "react-native-vector-icons" {
    import {TextProperties} from "react-native";
    interface IconProperties extends TextProperties   {
      name: string;
      size: number;
      color: string;
    }
    interface IconStatic extends React.ComponentClass<IconProperties>  {
     
    }
    export function createIconSetFromIcoMoon(iconSet: any): IconStatic;
  }