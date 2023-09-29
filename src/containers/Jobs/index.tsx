import {ConfigProvider, Form, Input, Menu, MenuProps } from "antd"
import { Icon } from "@iconify/react/dist/iconify.js";
import { useState, useEffect } from "react"
import JobCard from "./components/JobCard";
import CategoryMenu from "./components/CategoryMenu";
const JobsContainer = () => {
    const [jobs, setJobs] = useState<IJob[]>([] as IJob[]);
    
    useEffect(() => {
        setJobs([{
            id: 1,
            name: 'UX Technical Lead and Designer',
            link: '/en/job/492603/ux-technical-lead-and-designer',
            type: 'Infocomm Technology',
            closing: '2023-10-31T09:30:00Z',
            description: 'Possess a degree in any discipline. 2 years of UX design experience. Preference will be given to candidates who have experience designing large and complex systems. Expertise in designing tools like Sketch, InVision, Adobe Photoshop, Adobe Illustrator Understands the UX development lifecycle from supporting product conceptualisation to information architecture and user usability research to wireframing and eventual delivery Awareness of user experience trade-offs and interactions optimisation to translate conceptual requirements to sustainable designs Excellent communication, stakeholder management and presentation skills Candidates with prior domain experience in logistics or shipping related applications will have an added advantage Familiarity with the following front-end development technologies is a plus  HTML5 & CSS  JavaScript (JQuery, D3, Angular/Angular2)  Springboot development framework  Mobile development with Android or iOS and related UX design considerations'
        }])
    }, []);
    return (
        <div className="flex flex-col items-center">
                <div className="w-full">
                    <ConfigProvider theme={{
                        components: {
                            Input: {
                                colorBgContainer: 'transparent',
                                colorText: 'white',
                                colorTextPlaceholder: 'rgba(225, 225, 225, 0.7)'
                            },
                        }
                    }}>
                        <Form>
                            <Form.Item name="search">
                                <Input
                                    allowClear
                                    autoComplete="off"
                                    prefix={<Icon icon="iconamoon:search-fill" className="text-primary-100"/>}
                                    size="large"
                                    className="h-12 text-lg"
                                    placeholder="Find suitable candidate for ...."
                                />
                            </Form.Item>
                        </Form>
                    </ConfigProvider>
                </div>
                <div className="w-full">
                    <div className="flex gap-10">
                        <div className="grow-0">
                            <CategoryMenu setJobs={setJobs}/>
                        </div>
                        <div className="flex flex-col grow">
                            {
                                jobs.map((job: IJob) => 
                                    <JobCard 
                                        key={job.id}
                                        id={job.id}
                                        name={job.name} 
                                        type={job.type}
                                        link={job.link}
                                        description={job.description}
                                        closing={job.closing}
                                    />
                                )
                            }
                        </div>
                    </div>
                </div>
            </div>
    )
};
export default JobsContainer;