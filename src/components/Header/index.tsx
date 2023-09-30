'use client'
import Image from "next/image";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useRouter } from "next/navigation";
const Header = () => {
    const isLogged = localStorage.getItem('jwt-token') !== null;
    const router = useRouter();
    const handleLogout = () => {
        localStorage.removeItem('jwt-token');
        router.replace("/jobs");
    };
    return (
        <div className="h-32 w-full bg-background-100 flex px-10 fixed top-0 z-50">
            <div className="w-full max-w-[1392px] m-auto">
                <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                        <div className="flex items-start">
                            <Image 
                                src="/assets/images/logo.jpg" 
                                alt="logo"
                                width={90}
                                height={90}
                                className="rounded-full"
                                />
                        </div>
                        <div className="font-rowdis text-2xl font-bold">
                            PSA-YEG Talent Acquisition System
                        </div>
                    </div>
                    {isLogged && <div 
                    className="flex items-center gap-2 cursor-pointer hover:text-secondary-100"
                    onClick={handleLogout}
                    >
                        <div className="font-rowdis text-[20px] ">
                            Logout
                        </div>
                        <Icon 
                            icon="material-symbols:logout" 
                            className="text-[40px]"
                        />
                    </div>}
                </div>
            </div>
        </div>
    )
};

export default Header;