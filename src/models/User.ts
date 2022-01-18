import { json } from "../custom_types/json";
import { Model } from "./Model";
import { v4 as uuidv4 } from 'uuid';

class User implements Model<User> {
    private id: string;
    private email: string;
    private firstName: string;
    private lastName: string;
    private dateCreated: number;

    constructor(email: string, firstName: string, lastName: string, id?: string, dateCreated?: number) {
        this.id = id === undefined ? uuidv4().toString() : id;
        this.setEmail(email);
        this.setFirstName(firstName);
        this.setLastName(lastName);
        this.dateCreated = dateCreated === undefined ? new Date().getTime() : dateCreated;
    }

    public getId(): string {
        return this.id;
    }
    public getEmail(): string {
        return this.email;
    }
    public setEmail(value: string) {
        if(!this.isEmailValid(value)) {
            throw new Error(value + " is not a validly formatted email address");
        }
        this.email = value;
    }
    public getFirstName(): string {
        return this.firstName;
    }
    public setFirstName(value: string) {
        this.firstName = value;
    }
    public getLastName(): string {
        return this.lastName;
    }
    public setLastName(value: string) {
        this.lastName = value;
    }
    public getDateCreated(): number {
        return this.dateCreated;
    }
    public toJson(exclude?: string[]): json {
        let obj: json = {};
        for(const [key, value] of Object.entries(this)) {
            obj[key] = value;
        }
        if(exclude !== undefined) {
            for(var i: number = 0; i < exclude.length; i++) {
                let fieldToExclude: string = exclude[i];
                delete obj[fieldToExclude];
            }
        }
        return obj;
    }
    public fromJson(data: json): User {
        return User.fromJson(data);
    }
    public static fromJson(data: json): User {
        for(const [key, value] of Object.entries(this)) {
            if(data[key] === undefined || typeof data[key] !== typeof value) {
                throw new Error("Cannot construct User object from the JSON data provided.");
            }
        }
        return new User(
            data.email,
            data.firstName,
            data.lastName,
            data.id,
            data.dateCreated
        );
    }

    private isEmailValid(email: string): boolean {
        var emailRe = /\S+@\S+\.\S+/;
        return emailRe.test(email);
    }
}

export { User };