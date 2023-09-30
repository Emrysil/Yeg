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
    message?: string,
    length?: number,
    data: IJob[],
}

interface IJobSearchParams {
    category?: string;
    search?: string;
    sorted?: 'ASC' | 'DESC' | "";
}

interface IJobDetailRequest {
    id: number;
}

interface IJobDetailResponse {
    success: boolean,
    message?: string,
    data: IJob;
}