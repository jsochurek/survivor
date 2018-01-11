declare module "realm" {
  class _realm {
    constructor(m: any);
    write(a: any): any;
    delete(a: any): any;
    create(objectName: string, objectDetails: any, overwrite?: boolean): any;
    objects(objectName: string): any;
  }
  export default _realm;
}