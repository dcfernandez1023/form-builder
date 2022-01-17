import { json } from "../custom_types/json";

interface Model {
    toJson(): json;
}

export { Model };