import { Dao } from "./Dao";
import { fda as db } from "../dal/FirestoreDataAccess";
import { User } from "../models/User";
import { firestoreQueryObj } from "../custom_types/queryObj";
import { FirestoreQueryObjHelper as QueryHelper } from "../util/FirestoreQueryObjHelper";
import { json } from "../custom_types/json";
import { credentials } from "../custom_types/credentials";
import { AuthService } from "../services/AuthService";

class UserDao extends Dao {
    private static USER_COLLECTION: string = "users";
    private static CRED_COLLECTION: string = "creds";

    constructor() {
        super();
        super.protectedFields = [
            "id",
            "email",
            "dateCreated"
        ];
    }

    public async create(email: string, firstName: string, lastName: string, password: string): Promise<User> {
        // Check if user exists 
        if(await this.getUserIdByEmail(email) !== null) {
            throw new Error("A user with email " + email + " already exists");
        }
        // Create user 
        let user: User = new User(email, firstName, lastName);
        let query: firestoreQueryObj = QueryHelper.getQueryObj();
        query.identifier = user.getId();
        query.collection = UserDao.USER_COLLECTION;
        query.record = user.toJson();
        let queryStr: string = JSON.stringify(query);
        await db.insert(queryStr);
        // Register user 
        query.collection = UserDao.CRED_COLLECTION;
        let hashedPwd: string = await AuthService.hashPassword(password);
        let creds: credentials = {id: user.getId(), password: hashedPwd};
        query.record = creds;
        queryStr = JSON.stringify(query);
        db.insert(queryStr);
        return user;
    }
    public async get(id: string): Promise<User> {
        let query: firestoreQueryObj = QueryHelper.getQueryObj();
        query.identifier = id;
        query.collection = UserDao.USER_COLLECTION;
        query.filterKeys = ["id"];
        query.filterConditions = ["=="];
        query.filterValues = [id];
        let queryStr: string = JSON.stringify(query);
        let result: json[] = await db.get(queryStr);
        // Throw error if we get multiple users
        if(result.length != 1) {
            throw new Error("An unexpected error occurred. Could not get user.");
        }
        let userJson: json = result[0];
        return User.fromJson(userJson);
    }
    public async update(id: string, data: json): Promise<User> {
        // Load User model with data to ensure data is valid
        let user: User = User.fromJson(data);
        // Build query 
        let query: firestoreQueryObj = QueryHelper.getQueryObj();
        query.identifier = id;
        query.collection = UserDao.USER_COLLECTION;
        query.filterKeys = ["id"];
        query.filterConditions = ["=="];
        query.filterValues = [id];
        query.record = user.toJson(this.protectedFields); // Exclude protected fields in update
        let queryStr: string = JSON.stringify(query);
        // Perform update
        await db.update(queryStr);
        return user;
    }
    public async delete(id: string): Promise<string> {
        let query: firestoreQueryObj = QueryHelper.getQueryObj();
        query.identifier = id;
        query.collection = UserDao.USER_COLLECTION;
        let queryStr: string = JSON.stringify(query);
        // Delete User object
        await db.delete(queryStr);
        query.collection = UserDao.CRED_COLLECTION;
        queryStr = JSON.stringify(query);
        // Delete User credentials
        return await db.delete(queryStr);
    }
    public async login(email: string, password: string): Promise<boolean> {
        let userId: string | null = await this.getUserIdByEmail(email);
        if(userId === null) {
            return false;
        }
        let query: firestoreQueryObj = QueryHelper.getQueryObj();
        query.identifier = userId;
        query.collection = UserDao.CRED_COLLECTION;
        query.filterKeys = ["id"];
        query.filterConditions = ["=="];
        query.filterValues = [userId];
        let queryStr: string = JSON.stringify(query);
        let result: json[] = await db.get(queryStr);    
        // Throw error if we get multiple users
        if(result.length != 1) {
            throw new Error("An unexpected error occurred. Could not get user.");
        }
        let cred: json = result[0];
        return await AuthService.validatePassword(cred.password, password);
    }


    protected initDataAccess(): void {
        super.db = db;
    }

    private async getUserIdByEmail(email: string): Promise<string | null> {
        let query: firestoreQueryObj = QueryHelper.getQueryObj();
        query.collection = UserDao.USER_COLLECTION;
        query.filterKeys = ["email"];
        query.filterConditions = ["=="];
        query.filterValues = [email];
        let queryStr: string = JSON.stringify(query);
        let userData: json[] = await db.get(queryStr);
        return userData.length == 1 ? userData[0].id : null;
    }

}

export { UserDao };