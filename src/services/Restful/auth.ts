import { Http } from "../Http";

export const AuthService = {
    login: async (payload: any): Promise<IAuthResponse | void> => {
        try {
            let res: IAuthResponse;
            res = await Http.Request<IAuthResponse>('POST', '/login', null, payload);
            localStorage.setItem('jwt-token', res.authorization);
            return res;
        } catch (err) {
            console.log(err);
            return;
        }
    },
    signup: async (payload: any): Promise<Omit<IAuthResponse, 'authorization'> | void> => {
        try {
            let res: IAuthResponse;
            res = await Http.Request('POST', '/signUp', null, payload);
            return res;
        } catch (err) {
            console.log(err);
            return;
        }
    },
}