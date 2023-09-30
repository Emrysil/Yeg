import { Http } from "../Http"
export const CandidateService = {
    getMatchingCandidates: async (params: {id: number}): Promise<ICandidate[] | void> => {
        try {
            let res: ICandidateResponse;
            res = await Http.Request('GET', '/match', params, null);
            return res.data;
        } catch (err) {
            console.log(err);
            return;
        }
    }
}