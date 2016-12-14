declare namespace __LassieSDK {
  type _Campus = {
    new: () => void;
    constructor: () => void;
    SearchForPOI: (request: any) => any;
    SearchForService: (request: any) => any;
    SearchForSuite: (request: any) => any;
    GetDataPOI: (id: string) => any;
    GetDataArea: (id: string) => any;
    GetDataPOIType: (id: string) => any;
    GetDataService: (id: string) => any;
    GetDataSuite: (id: string) => any;
    ListSuiteID: () => any;
  };
  type _SearchRequest = any;
  namespace Facility {
    type Campus = _Campus;
    type SearchRequest =_SearchRequest;
  }
  interface Facility {
    Campus: _Campus
    SearchRequest: _SearchRequest;
  }
  var Facility: Facility;

  type _Atlas = {
    
  };
  type _Point2D = any;
  namespace Mapping {
    type Atlas = _Atlas;
    type Point2D = _Point2D;
  }
  interface Mapping {
    Atlas: _Atlas;
    Point2D: _Point2D;
  }
  var Mapping: Mapping;


  type _ParseJSON = any;

  namespace InitializeGraph {
    type ParseJSON = _ParseJSON;
  }
  interface InitializeGraph {
    ParseJSON: _ParseJSON;
  }
  var InitializeGraph: InitializeGraph;
}

declare module "lassie-sdk-js" {
  export default __LassieSDK;
}