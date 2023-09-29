'use client'
import AuthContainer from "@/containers/Auth"
import { RoughNotation } from "react-rough-notation";
import { motion } from "framer-motion";
export default function Home() {
  return (
      <div className='flex flex-col items-center gap-10'>
        <RoughNotation 
          type="underline" 
          color="white" 
          animationDelay={800} 
          animationDuration={2000}
          strokeWidth={3}
          iterations={4} 
          show>
          <div className="flex flex-col items-center gap-2">
            <motion.div 
              initial={{ y: -20 }}
              animate={{ y: 5 }}
              transition={{ duration: 1 }}
              exit={{ y: 10 }}
              className='text-4xl font-rowdis'>
              WELCOME ONBOARD
            </motion.div>
            <div className="text-2xl font-rowdis">
              TO THE AI-POWERED TALENT DISCOVERY JOURNEY
            </div>
          </div>
        </RoughNotation>
        <AuthContainer />
      </div>
  )
}
