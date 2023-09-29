import { stringify } from "querystring"
const BaseUrl = "http://localhost"

export const Http = {
    Request: async <A>(
        methodType: string,
        url: string,
        params?: any,
        payload?: any,
    ): Promise<A> => {
        return new Promise((resolve, reject) => {
            const query: any = params ? `?${stringify({...params})}`: "";
            const options: any = {
                body: payload && JSON.stringify(payload),
                cache: "no-cache",
                method: methodType,
                headers: {
                    "Content-Type": "application/json"
                },
                mode: 'cors'
            }
            fetch(`${BaseUrl}${url}${query}`, {
                ...options
            }).then(async (res: any) => {
                if (res.status >= 200 && res.status <= 206) {
                    return res.status !== 204
                        ? res.json().then(resolve)
                        : resolve(res);
                }
                return res.json().then(reject);
            }).catch(async (e) => {
                console.log(e);
                return e;
            });
        });
    },
};