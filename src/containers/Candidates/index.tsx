import { RoughNotation } from "react-rough-notation";
import CandidateCard from "./components/CandidateCard";
import { Skeleton, Empty } from "antd";
import _ from "lodash";
interface ICandidates {
    candidates: ICandidate[] | null;
    job: IJob | null;
    loading: boolean;
}
const CandidateContainer: React.FC<ICandidates> = ({candidates, job, loading}) => {
    const desc = job?.description?.split(".");
    return (
        <div className="flex flex-col relative items-center justify-center font-rowdis gap-5">
            {
                !loading
                ? (
                    <>
                        {
                            !_.isEmpty(job) && !_.isEmpty(candidates)
                            ? (
                                <>
                                    <RoughNotation show type="highlight" color="black" animationDuration={800} animationDelay={200} iterations={4}>
                                        <div className="text-[40px] px-5 py-2">{job?.name}</div>
                                        <div className="text-center py-2">Closing Date: {job?.closing}</div>
                                    </RoughNotation>
                                    <div className="p-5 rounded-lg text-primary-400 font-sans" style={{backgroundColor: 'rgba(225, 225, 225, 0.7)'}}>
                                        <div className="font-mono">
                                            {desc?.map((d, index) => <li key={index}>{d}</li>)}
                                        </div>
                                    </div>
                                    <div className="w-full flex flex-col gap-4">
                                        {
                                            candidates?.map(c => <CandidateCard key={c.id} candidate={c}/>)
                                        }
                                    </div>
                                </>
                            ) : (
                                <div className="w-full p-10 rounded-lg absolute top-1/2 translate-y-1/2" style={{backgroundColor: 'rgba(225, 225, 225, 0.7)'}}>
                                    <Empty className="text-lg  font-rowdis"/>
                                </div>
                            )
                        }
                    </>
                ) : (                    
                    <div className="w-full p-10 rounded-lg" style={{backgroundColor: 'rgba(225, 225, 225, 0.7)'}}>
                        <Skeleton active paragraph={{rows: 40}} />
                    </div>
                )
            }
        </div>
    )
};

export default CandidateContainer;