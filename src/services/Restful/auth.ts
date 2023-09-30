import { Http } from "../Http";

export const AuthService = {
    login: async (payload: any): Promise<IAuthResponse> => {
        try {
            let res: IAuthResponse;
            res = await Http.Request<IAuthResponse>('POST', '/login', null, payload);
            localStorage.setItem('jwt-token', res.message);
            return res;
        } catch (err) {
            console.log(err);
            throw new Error();
        }
    },
    signup: async (payload: any): Promise<Omit<IAuthResponse, 'authorization'>> => {
        try {
            let res: IAuthResponse;
            res = await Http.Request('POST', '/signUp', null, payload);
            return res;
        } catch (err) {
            console.log(err);
            throw new Error();
        }
    },
}