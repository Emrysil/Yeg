import {Button, ConfigProvider, Form, Input, Card, Empty} from "antd"
import { Icon } from "@iconify/react/dist/iconify.js";
import { useState, useEffect } from "react"
import JobCard from "./components/JobCard";
import { JobService } from "@/services/Restful/jobs";
import CategoryMenu from "./components/CategoryMenu";
import _ from "lodash";
const JobsContainer = () => {
    const [jobs, setJobs] = useState<IJob[] | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const defaultParams: IJobSearchParams = {
        category: "",
        search: "",
        sorted: "",
    };
    const [params, setParams] = useState<IJobSearchParams>(defaultParams);
    const handleGetJobs = async (params: IJobSearchParams) => {
        try {
            setLoading(true);
            const res = await JobService.getJobs(params);
            setJobs(res);
            setLoading(false);
        } catch (err) {
            setJobs(null);
        }
    };

    const handleSearch = (val: any) => {
        setParams(prev => ({...prev, ...val}));
        console.log(params);
    }

    const handleSort = (val: IJobSearchParams['sorted']) => {
        setParams(prev => ({...prev, sorted: val}));
    }

    const handleResetFilter = () => {
        setParams(defaultParams);
    }
    useEffect(() => {
        handleGetJobs(params);
    }, [params]);

    useEffect(() => {
        handleGetJobs(defaultParams);
    }, []);
    return (
        <div className="flex flex-col items-center gap-5">
            <div className="w-full">
                <div className="flex gap-2 flex-wrap">
                    <ConfigProvider theme={{
                        components: {
                            Input: {
                                colorBgContainer: 'transparent',
                                colorText: 'white',
                                colorTextPlaceholder: 'rgba(225, 225, 225, 0.7)'
                            },
                        }
                    }}>
                        <Form onFinish={handleSearch} layout="inline" className="grow">
                            <Form.Item name="search" className="w-full">
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
                    <div className="flex gap-2">
                        <div>
                            <Button className="h-full" onClick={() => handleSort('ASC')} >
                                <Icon icon="bi:sort-up" className="text-primary-100 text-[24px]"/>
                            </Button>
                        </div>
                        <div>
                            <Button className="h-full" onClick={() => handleSort('DESC')} >
                                <Icon icon="bi:sort-down" className="text-primary-100 text-[24px]"/>
                            </Button>
                        </div>
                        <div>
                            <Button className="h-full" onClick={handleResetFilter} >
                                <div className="flex items-center gap-1">
                                    <Icon icon="grommet-icons:clear" className="text-primary-100 text-[24px]"/>
                                    <span className="text-primary-100 text-[14px] font-rowdis">Clear Filter</span>
                                </div>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-full">
                <div className="flex sm:flex-row flex-col gap-10">
                    <div className="grow-0">
                        <CategoryMenu setCategory={(cat: string) => setParams(prev => ({...prev, category: cat}))} />
                    </div>
                    <div className="flex flex-col grow gap-4">
                        {
                            !loading 
                            ? (
                                jobs 
                                ? (
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
                                    ) : (
                                        <div className="w-full p-10 rounded-lg" style={{backgroundColor: 'rgba(225, 225, 225, 0.7)'}}>
                                            <Empty className="text-lg  font-rowdis"/>
                                        </div>
                                    )
                                ) : (
                                    _.fill(Array(5), 1).map((x, index) => 
                                        <Card key={index} style={{width: '100%'}} loading/>
                                )
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
    )
};
export default JobsContainer;