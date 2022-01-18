import { json } from "../custom_types/json";

interface Model<T> {
    toJson(exclude?: string[]): json;
    fromJson(data: json): T;
}

export { Model };