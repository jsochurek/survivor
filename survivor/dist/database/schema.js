export const StringObject = {
    name: "StringObject",
    properties: { value: "string" }
};
export const User = {
    name: "User",
    primaryKey: "name",
    properties: {
        name: "string",
        picks: { type: "list", objectType: "Pick" }
    }
};
export const Pick = {
    name: "Pick",
    properties: {
        team: "string",
        date: "string"
    }
};
// export const Map = {
//     name: "Map",
//     primaryKey: "facilityID",
//     properties: {
//         facilityID: "string",
//         maps: "string"
//     }
// }
//# sourceMappingURL=schema.js.map