interface IJob {
    id: number;
    name: string;
    link: string;
    description: string;
    type: string;
    closing: string;
}

interface IJobsResponse {
    success: boolean,
    message: string,
    data: IJob[],
}