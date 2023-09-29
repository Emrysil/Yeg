import { Button, ConfigProvider, Form, Input } from 'antd'
import { Icon } from '@iconify/react';
import { motion } from 'framer-motion';
import { AuthService } from '@/services/Restful/auth';
import { useRouter } from 'next/router';
interface ILogin {
    toSignup: () => void;
}
const Login: React.FC<ILogin> = ({toSignup}) => {
    const router = useRouter();
    const handlSubmitForm = async (value: any) => {
        await AuthService.login(value);
        router.push("/jobs");
      }
    return (
        <motion.div 
            className='flex flex-col items-start gap-4'
            initial={{ x: 10, opacity: 0}}
            animate={{ x: 0, opacity: 1}}
            transition={{ duration: 0.5 }}
            exit={{ x:10, opacity: 0}}

        >
            <div className='text-xl font-rowdis'>
                LOGIN
            </div>
            <div className='w-full'>
                <ConfigProvider theme={{
                    components: {
                        Form: {
                            labelColor: '#FFF',
                            labelFontSize: 20,
                        }
                    }
                }}>
                    <Form 
                        layout='vertical'
                        autoComplete='off'
                        onFinish={handlSubmitForm}
                    >
                        <Form.Item 
                            label={<span className='font-vt'>Username</span>}
                            name="username" 
                            rules={[
                                {required: true, message: 'Please enter your username'}
                            ]}  
                            labelCol={{span: 24}}>
                            <Input className='h-10'/>
                        </Form.Item>
                        <Form.Item 
                            label={<span className='font-vt'>Password </span>}
                            name="password" 
                            rules={[
                                {required: true, message: 'Please enter your password'}
                            ]} 
                            labelCol={{span: 24}}>
                            <Input.Password className='h-10' />
                        </Form.Item>
                        <Form.Item>
                            <Button className='text-primary-100 font-rowdis' size='large' htmlType='submit' block>
                                Login
                            </Button>
                        </Form.Item>
                    </Form>
                </ConfigProvider>
            </div>
            <div className='flex items-center gap-2 cursor-pointer font-rowdis hover:text-secondary-100' onClick={toSignup}>
                <span className='text-[18px]'>No account yet? <span className='hover:underline'>Go Sign Up</span></span>
                <Icon icon="majesticons:arrow-right" className='text-lg'/>
            </div>
        </motion.div>
    )
};

export default Login;