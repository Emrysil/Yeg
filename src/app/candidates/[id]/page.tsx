'use client'
import { useEffect, useState } from "react";
import { JobService } from "@/services/Restful/jobs";
import { CandidateService } from "@/services/Restful/candidates";
import CandidateContainer from "@/containers/Candidates";
const CandidatePage = ({params}: {params: {id: number}}) => {
    const [job, setJob] = useState<IJob | null>(null);
    const [candidates, setCandidates] = useState<ICandidate[] | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const getJob = async (id: number) => {
        try {
            setLoading(true);
            const res = await JobService.getJob({id: id});
            setJob(res as IJob);
            setLoading(false);
        } catch (err) {
            setJob(null);
        }
    };
    const getCandidates = async (id: number) => {
        try {
            setLoading(true);
            const res = await CandidateService.getMatchingCandidates({id: id});
            setCandidates(res as ICandidate[]);
            setLoading(false);
        } catch (err) {
            setCandidates(null);
        }
    }
    useEffect(() => {
        
        getJob(params.id);
        getCandidates(params.id);
    }, [params.id]);

    return (
        <div className="w-full relative z-10">
            <CandidateContainer candidates={candidates} job={job} loading={loading}/>
        </div>
    )
};

export default CandidatePage;