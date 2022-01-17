import { json } from "../custom_types/json";
import { Model } from "./Model";
import { v4 as uuidv4 } from 'uuid';

class User implements Model {
    private id: string;
    private email: string;
    private firstName: string;
    private lastName: string;
    private dateCreated: number;

    constructor(email: string, firstName: string, lastName: string, id?: string, dateCreated?: number) {
        this.id = id === undefined ? uuidv4().toString() : id;
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
        this.dateCreated = dateCreated === undefined ? new Date().getTime() : dateCreated;
    }

    public getId(): string {
        return this.id;
    }
    public getEmail(): string {
        return this.email;
    }
    public setEmail(value: string) {
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
    public setDateCreated(value: number) {
        this.dateCreated = value;
    }

    public toJson(): json {
        let obj: json = {};
        for(const [key, value] of Object.entries(this)) {
            obj[key] = value;
        }
        return obj;
    }
}

export { User };