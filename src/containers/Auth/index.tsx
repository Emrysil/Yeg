import { useState, useMemo } from "react";
import Login from "./components/Login";
import Signup from "./components/Signup";
const AuthContainer = () => {
    const [step, setStep] = useState<'LOGIN' | 'REGISTER'>('LOGIN');
    const form = useMemo(() => {
        if (step === 'LOGIN') {
            return <Login toSignup={() => setStep('REGISTER')}/>
        } else {
            return <Signup toLogin={() => setStep('LOGIN')} />
        }
    }, [step])
  return (
    <div className="bg-background-100 rounded-lg px-10 py-10">
        <div className="flex flex-col items-center gap-10">
            {form}
        </div>
    </div>
  )
};

export default AuthContainer;