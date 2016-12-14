declare module "react-native-vector-icons" {
  interface IconProperties extends React.TextProperties {
    name: string;
    size: number;
    color: string;
  }
  interface IconStatic extends React.ComponentClass<IconProperties> {

  }
  export function createIconSetFromIcoMoon(iconSet: any): IconStatic;
}