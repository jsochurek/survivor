import Realm from "realm";
import { User, StringObject } from './schema';
export default class RealmDB {
    // constructor(year: number) {
    constructor() {
        this.addUser = (user) => {
            console.log("adding user", user);
            let dbObjects = this.realm.objects("User").filtered("name = $0", user.name);
            if (dbObjects.length > 0) {
                console.log("user already exists");
            }
            else {
                console.log("creating new user");
                try {
                    this.realm.write(() => {
                        this.realm.create("User", {
                            name: user.name,
                            picks: user.picks
                        });
                    });
                }
                catch (e) {
                    console.log("error while writing User: " + e);
                }
            }
        };
        this.getUser = (userID) => {
            let user = null;
            let dbObjects = this.realm.objects("User").filtered("name = $0", userID);
            if (dbObjects.length > 0) {
                user = {
                    name: dbObjects[0].name,
                    picks: this.convertPicks(dbObjects[0])
                };
            }
            console.log("getUser", user);
            return user;
        };
        this.convertPicks = (dbObject) => {
            let picks = [];
            for (let i = 0; i < dbObject.picks.length; i++) {
                picks.push(dbObject.picks[i].value);
            }
            return picks;
        };
        this.getUsers = () => {
            let users = [];
            let dbObjects = this.realm.objects("User");
            for (let i = 0; i < dbObjects.length; i++) {
                let user = {
                    name: dbObjects[i].name,
                    picks: this.convertPicks(dbObjects[i])
                };
                users.push(user);
            }
            return users;
        };
        this.clearAllUsers = () => {
            this.realm.write(() => {
                let allUsers = this.realm.objects("User");
                this.realm.delete(allUsers);
            });
        };
        this.addPickToUser = (name, pick) => {
            try {
                this.realm.write(() => {
                    let dbObjects = this.realm.objects("User").filtered("name = $0", name);
                    if (dbObjects.length > 0) {
                        dbObjects[0].picks.push({ value: pick });
                    }
                });
            }
            catch (e) {
                console.log("error while adding pick " + pick + "to User: " + name + "---" + e);
            }
        };
        this.updateUserPicks = (user) => {
            try {
                this.realm.write(() => {
                    console.log("user", user);
                    let picks = [];
                    for (let i = 0; i < user.picks.length; i++) {
                        picks.push({ value: user.picks[i] });
                    }
                    this.realm.create("User", { name: user.name, picks }, true);
                });
            }
            catch (e) {
                console.log("error while updating picks " + user.picks + "to User: " + user.name + "---" + e);
            }
        };
        this.realm = new Realm({
            // path: `yr${year}.realm`,
            path: `yr2016.realm`,
            schema: [User, StringObject],
            schemaVersion: 2
        });
    }
}
//# sourceMappingURL=index.js.map