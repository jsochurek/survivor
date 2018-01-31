import Realm from "realm";
import { User, StringObject, Pick } from './schema';

export default class RealmDB {
    realm: Realm;
    // constructor(year: number) {
    constructor() {
        this.realm = new Realm({
            // path: `yr${year}.realm`,
            path: `yr2016.realm`,
            schema: [User, StringObject, Pick],
            schemaVersion: 3
        });
    }

    addUser = (user: User) => {
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

    getUser = (userID: string): User => {
        let user: User = null;
        let dbObjects = this.realm.objects("User").filtered("name = $0", userID);
        if (dbObjects.length > 0) {
            user = {
                name: dbObjects[0]["name"],
                picks: this.convertPicks(dbObjects[0])
            };
        }
        console.log("getUser", user);
        return user;
    }

    convertPicks = (dbObject: any): {team: string, date: Date}[] => {
        let picks: {team: string, date: Date}[] = [];
        for (let i = 0; i < dbObject["picks"].length; i++) {
            let team: string = dbObject["picks"][i]["team"];
            let date: Date = new Date(dbObject["picks"][i]["date"]);
            picks.push({team, date});
        }
        return picks;
    }

    getUsers = (): User[] => {
        let users: User[] = [];
        let dbObjects = this.realm.objects("User");
        for (let i = 0; i < dbObjects.length; i++) {
            let user = {
                name: dbObjects[i]["name"],
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

    addPickToUser = (name: string, pick: string, date: Date) => {
        try {
            this.realm.write( () => {
                let dbObjects = this.realm.objects("User").filtered("name = $0", name);
                if (dbObjects.length > 0) {
                    dbObjects[0]["picks"].push({team: pick, date: date.toISOString()});
                }
            });
        }
        catch (e) {
            console.log("error while adding pick " + pick + "to User: " + name + "---" + e);
        }
    }

    updateUserPicks = (user: User) => {
        try {
            this.realm.write( () => {
                let picks: {team: string, date: string}[] = [];
                for (let i = 0; i < user.picks.length; i++) {
                    picks.push({team: user.picks[i].team, date: user.picks[i].date.toISOString()});
                }
                this.realm.create("User", {name: user.name, picks}, true);
            });
        }
        catch (e) {
            console.log("error while updating picks " + user.picks + "to User: " + user.name + "---" + e);
        }
    }


}
