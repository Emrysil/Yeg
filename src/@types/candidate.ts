interface ICandidate {
    id: number;
    name: string;
    gender: string;
    birthYear: string;
    education: string;
    skillSet: string;
    matchingScore: number;
};

interface ICandidateResponse {
    success: string;
    message?: string;
    data: ICandidate[];
}