import {Button, ConfigProvider, Form, Input } from 'antd'
import _ from "lodash";
import { motion } from 'framer-motion';
import { Icon } from '@iconify/react/dist/iconify.js';
import { AuthService } from '@/services/Restful/auth';
interface ISignup {
    toLogin: () => void;
}
const Signup: React.FC<ISignup> = ({toLogin}) => {
    const handlSubmitForm = async (value: any) => {
        await AuthService.signup(value);
        toLogin();
      }
    return (
        <motion.div 
            initial={{ x: 10, opacity: 0}}
            animate={{ x: 0, opacity: 1}}
            transition={{ duration: 0.5 }}
            exit={{ x: 10, opacity: 0}}
            className='flex flex-col items-start justify-start gap-4'>
            <div className='text-xl font-rowdis'>
                SIGN UP
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
                            className='grow'>
                            <Input className='h-10'/>
                        </Form.Item>
                        <Form.Item 
                            label={<span className='font-vt'>Password </span>}
                            name="password" 
                            rules={[
                                {required: true, message: 'Please set a password for your account'}
                            ]} 
                            className='grow'>
                            <Input.Password className='h-10' />
                        </Form.Item>
                        <Form.Item 
                            label={<span className='font-vt'>Confirm Password </span>}
                            name="confirmPassword" 
                            className='grow'
                            rules={[
                                { required: true, message: 'Please enter your password again' },
                                ({ getFieldValue }) => ({
                                  validator(_, value) {
                                    if (value === getFieldValue('password')) {
                                      return Promise.resolve();
                                    }
                                    return Promise.reject(new Error('passwords do not match'));
                                  },
                                }),
                              ]}
                        >
                            <Input.Password className='h-10' />
                        </Form.Item>
                        <Form.Item className='grow'>
                            <Button className='text-primary-100 font-rowdis' size='large' htmlType='submit' block>
                                Sign Up
                            </Button>
                        </Form.Item>
                    </Form>
                </ConfigProvider>
            </div>
            <div onClick={toLogin} className='cursor-pointer font-rowdis hover:text-secondary-100 flex items-center gap-2'>
                <span className='text-[18px]'>Already have an account? <span className='hover:underline'>Login</span></span>
                <Icon icon="majesticons:arrow-right" className='text-lg'/>
            </div>
        </motion.div>
    )
};

export default Signup;