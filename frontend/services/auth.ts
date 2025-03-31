import config from "../config/config";
import {UserInfoType} from "../src/types/user-info.type";
import {RefreshResponse} from "../src/types/refresh-response.type";

export class Auth {
    public static accessTokenKey:string = 'accessToken'
    private static refreshTokenKey:string = 'refreshToken'
    private static userInfoKey:string = 'userInfo'

    public static async processUnauthorizedResponse():Promise<boolean> {
        const refreshToken:string | null = localStorage.getItem(this.refreshTokenKey);
        if (refreshToken) {
            const response:Response = await fetch(config.host +"/refresh", {
                method: 'POST',
                headers:{
                    'Content-type': "application/json",
                    'Accept': 'application/json',
                },
                body: JSON.stringify({refreshToken: refreshToken}),
            })
            if (response && response.status === 200) {
                const result:RefreshResponse | null = await response.json();
                if (result && !result.error && result.accessToken && result.refreshToken) {
                    this.setTokens(result.accessToken,result.refreshToken);
                    return true;
                }
            }
        }
        this.removeTokens();
        location.href ='#/'
        return false;
    }

    public static async logout():Promise<boolean> {
        const refreshToken = localStorage.getItem(this.refreshTokenKey);
        if (refreshToken) {
            const response = await fetch(config.host +"/logout", {
                method: 'POST',
                headers:{
                    'Content-type': "application/json",
                    'Accept': 'application/json',
                },
                body: JSON.stringify({refreshToken: refreshToken}),
            })
            if (response && response.status === 200) {
                const result = await response.json();
                if (result && !result.error) {
                    Auth.removeTokens();
                    localStorage.removeItem(Auth.userInfoKey);
                    return true;
                }
            }
        }
        return false;
    }

    public static setTokens(accessToken:string, refreshToken:string):void {
        localStorage.setItem(this.accessTokenKey, accessToken);
        localStorage.setItem(this.refreshTokenKey, refreshToken);
    }
    private static removeTokens():void {
        localStorage.removeItem(this.accessTokenKey);
        localStorage.removeItem(this.refreshTokenKey);
    }

    public static setUserInfo(info: UserInfoType):void {
        localStorage.setItem(this.userInfoKey, JSON.stringify(info));
    }

    public static getUserInfo(): UserInfoType | null {
        const userInfo:string | null = localStorage.getItem(this.userInfoKey);
        if (userInfo) {
            return JSON.parse(userInfo);
        }
        return null;
    }
}