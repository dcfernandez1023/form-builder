import { EmailService } from "./EmailService";
import { AuthService } from "./AuthService";
import { UserDao } from "../dao/UserDao";

class UserService {
    public static async sendRegistrationEmail(email: string): Promise<void> {
        let userDao: UserDao = new UserDao();
        if(await userDao.getUserIdByEmail(email) !== null) {
            throw new Error("User with email: " + email + " already exists");
        }
        let token: string = AuthService.generateAccessToken(email);
        await EmailService.sendEmail([email], "Registration Token", "", "<p><b>Token: </b>" + token + "</p>");
    }

    public static async validateRegistrationToken(email: string, registrationToken: string): Promise<boolean> {
        if(AuthService.decodeAccessToken(registrationToken) === email && AuthService.validateAccessToken(registrationToken)) {
            return true;
        }
        return false;
    }

    public static async sendForgotPasswordEmail(email: string): Promise<void> {
        let userDao: UserDao = new UserDao();
        if(await userDao.getUserIdByEmail(email) === null) {
            throw new Error("No user with email: " + email);
        }
        let token: string = AuthService.generateAccessToken(email);
        await EmailService.sendEmail([email], "Forgot Password", "", "<p><b>Token: </b>" + token + "</p>");
    }

    public static async resetPassword(email: string, token: string, newPassword: string): Promise<void> {
        if(AuthService.decodeAccessToken(token) === email && AuthService.validateAccessToken(token)) {
            let userDao: UserDao = new UserDao();
            await userDao.changePassword(email, newPassword);
        }
        else {
            throw new Error("The registration token provided is invalid");
        }
    }
}

export { UserService };