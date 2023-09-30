import { Http } from "../Http";

export const AuthService = {
    login: async (payload: any): Promise<IAuthResponse | any> => {
        try {
            let res: IAuthResponse;
            res = await Http.Request<IAuthResponse>('POST', '/login', null, payload);
            localStorage.setItem('jwt-token', res.message);
            return res;
        } catch (err) {
            console.log(err);
            return err;
        }
    },
    signup: async (payload: any): Promise<Omit<IAuthResponse, 'authorization'> | any> => {
        try {
            let res: IAuthResponse;
            res = await Http.Request('POST', '/signUp', null, payload);
            return res;
        } catch (err) {
            console.log(err);
            return err;
        }
    },
}