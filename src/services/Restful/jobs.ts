import { Http } from "../Http"
export const JobService = {
    getJobs: async (params: any): Promise<IJob[]> => {
        try {
            let res: IJobsResponse;
            params.authorization = localStorage.getItem('jwt-token');
            res = await Http.Request<IJobsResponse>('GET', '/listJobs', params, null);
            return res.data;
        } catch (err) {
            console.log(err);
            return [];
        }
    }
}