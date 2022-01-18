import { json } from "../custom_types/json";
const bcrypt = require ('bcrypt');
const jwt = require("jsonwebtoken");

class AuthService {
    public static async hashPassword(plainTextPwd: string): Promise<string> {
        return await bcrypt.hash(plainTextPwd, 10);
    }
    public static async validatePassword(expected: string, actual: string): Promise<boolean> {
        return await bcrypt.compare(actual, expected);
    }
    public static decodeAccessToken(accessToken: string): string {
        try {
            var ca: string = accessToken;
            var base64Url: string = ca.split('.')[1];
            let payload: json = JSON.parse(Buffer.from(base64Url, 'base64').toString());
            return payload.id === undefined ? "" : payload.id;
        }
        catch(error: any) {
            return "";
        }
    }
    public static validateAccessToken(accessToken: string): boolean {
        try {
          return jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
        }
        catch(error: any) {
          return false;
        }
    }   
    public static generateAccessToken(userId: string): string {
        return jwt.sign({id: userId}, process.env.ACCESS_TOKEN_SECRET, {expiresIn: "30m"});
    }
}

export { AuthService };