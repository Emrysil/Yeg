import { Badge, Card, Collapse } from "antd"
import Link from "next/link";
import categories from "@/data/jobCategories.json"
import { Icon } from "@iconify/react/dist/iconify.js";
const JobCard: React.FC<IJob> = ({id, name, link, description, type, closing}) => {
    const ribbonColor = categories.find(cat => cat.label === type)?.color;
    const requirementProcessed: string[] = description.split('.');
    return (
        <Badge.Ribbon text={type} color={ribbonColor}>
            <Card title={<span className="font-rowdis">{name}</span>}>
                <div className="flex flex-col gap-4">
                    <Collapse 
                        items={[
                            {
                                key: link, 
                                label: <span className="font-rowdis">Expand to see job requirements</span>,
                                children: <ul className="pl-5 font-mono">{
                                    requirementProcessed.map((req) => 
                                        <li key={req[0]} className="list-disc">{req}</li>
                                    )
                                    }</ul>
                            }]}
                    />
                    <div className="flex items-center gap-2">
                        <span className="font-rowdis">Job Closing Date: </span> 
                        <span className="font-mono">{closing}</span>
                    </div>
                    <Link href={`https://psacareers.singaporepsa.com/cw/${link}`} target="_blank" className="font-rowdis text-secondary-100">
                        <div className="flex items-center gap-2">
                            <span>Go To PSA Website For Detail</span>
                            <Icon icon="formkit:fastforward"/>
                        </div>
                    </Link>
                    <Link href={`/candidates/${id}`} className="font-rowdis text-secondary-100">
                        <div className="flex items-center gap-2">
                            <span>Check Out Matching Candidates</span>
                            <Icon icon="formkit:fastforward"/>
                        </div>
                    </Link>
                </div>
            </Card>
        </Badge.Ribbon>
    )
};
export default JobCard;