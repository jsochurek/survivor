declare module "react-native-vector-icons/MaterialIcons" {
    import {TextProperties} from "react-native";
    interface IconProperties extends TextProperties  {
      name: string;
      size: number;
      color?: string;
    }
    interface IconStatic extends React.ComponentClass<IconProperties>  {
      
    }
    let Icon: IconStatic;
    type Icon = IconStatic;
    export default Icon;
  }