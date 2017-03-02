import Realm from "realm";
import { User, StringObject } from './schema';

export default class RealmDB {
    realm: Realm;
    // constructor(year: number) {
    constructor() {
        this.realm = new Realm({
            // path: `yr${year}.realm`,
            path: `yr2016.realm`,
            schema: [User, StringObject],
            schemaVersion: 2
        });
    }

    addUser = (user: {name: string, picks: string[]}) => {
        console.log("adding user", user);
        let dbObjects = this.realm.objects("User").filtered("name = $0", user.name);
        if (dbObjects.length > 0) {
            console.log("user already exists");
        }
        else {
            console.log("creating new user");
            try {
                this.realm.write( () => {
                    this.realm.create("User", {
                        name: user.name,
                        picks: user.picks
                    })
                });
            }
            catch (e) {
                console.log("error while writing User: " + e);
            }
        }
    }

    getUser = (userID: string): {name: string, picks: string[]} => {
        let user: {name: string, picks: string[]} = null;
        let dbObjects = this.realm.objects("User").filtered("name = $0", userID);
        if (dbObjects.length > 0) {
            user = {
                name: dbObjects[0].name,
                picks: this.convertPicks(dbObjects[0])
            };
        }
        console.log("getUser", user);
        return user;
    }

    convertPicks = (dbObject: any) => {
        let picks: string[] = [];
        for (let i = 0; i < dbObject.picks.length; i++) {
            picks.push(dbObject.picks[i].value);
        }
        return picks;
    }

    getUsers = (): {name: string, picks: string[]}[] => {
        let users: {name: string, picks: string[]}[] = [];
        let dbObjects = this.realm.objects("User");
        for (let i = 0; i < dbObjects.length; i++) {
            let user = {
                name: dbObjects[i].name,
                picks: this.convertPicks(dbObjects[i])
            };
            users.push(user);
        }
        return users;
    }

    clearAllUsers = () => {
        this.realm.write(() => {
            let allUsers = this.realm.objects("User");
            this.realm.delete(allUsers);
        });
    }

    addPickToUser = (name: string, pick: string) => {
        try {
            this.realm.write( () => {
                let dbObjects = this.realm.objects("User").filtered("name = $0", name);
                if (dbObjects.length > 0) {
                    dbObjects[0].picks.push({value: pick});
                }
            });
        }
        catch (e) {
            console.log("error while adding pick " + pick + "to User: " + name + "---" + e);
        }
    }

    updateUserPicks = (user: {name: string, picks: string[]}) => {
        try {
            this.realm.write( () => {
                console.log("user", user);
                let picks: {value: string}[] = [];
                for (let i = 0; i < user.picks.length; i++) {
                    picks.push({value: user.picks[i]});
                }
                this.realm.create("User", {name: user.name, picks}, true);
            });
        }
        catch (e) {
            console.log("error while updating picks " + user.picks + "to User: " + user.name + "---" + e);
        }
    }


}
