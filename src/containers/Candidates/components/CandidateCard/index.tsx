import { Card, Collapse, Badge } from "antd";
import { useMemo } from "react";
const CandidateCard: React.FC<{candidate: ICandidate}> = ({candidate}) => {
    const {birthYear, education, gender, name, skillSet, matchingScore} = candidate;
    const age = new Date().getFullYear() - parseInt(birthYear);
    const skills = skillSet.split(".");
    const sex = gender.toLocaleLowerCase() === 'f'? 'Female': 'Male';
    const ribbonOptions = useMemo(() => {
        let color = "";
        let text = ""
        if (matchingScore >= 80) {
            color = "red";
            text = "Perfect";
        } else if (matchingScore >= 60) {
            color = "orange";
            text = "High";
        } else if (matchingScore >= 40) {
            color = "green";
            text = "Moderate";
        } else {
            color = "cyan";
            text = "Low"
        }
        return {color, text}
    }, [matchingScore]);
    return (
        <Badge.Ribbon text={ribbonOptions.text} color={ribbonOptions.color}>
            <Card title={<span className="font-rowdis">{name}</span>}>
                <div className="flex flex-col font-rowdis gap-2">
                    <div>
                        Age: <span className="font-mono">{age}</span>
                    </div>
                    <div>
                        Education Background: <span className="font-mono">{education}</span>
                    </div>
                    <div>
                        Gender: <span className="font-mono">{sex}</span>
                    </div>
                    <div>
                        <Collapse items={[{
                            key: 1, 
                            label: <span className="font-rowdis">Candidate Skill Set</span>, 
                            children: 
                                <ul className="px-5">
                                    {skills.map(skill => 
                                        <li className="list-disc font-mono" key={skill[0]}>{skill}</li>
                                    )}
                                </ul>
                        }]}/>
                    </div>
                    <div>

                    </div>
                </div>
            </Card>
        </Badge.Ribbon>
    );
};

export default CandidateCard;
