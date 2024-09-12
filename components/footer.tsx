"use client"

import { FaPen } from "react-icons/fa";
import { FaBookOpen } from "react-icons/fa";
import { FaRegUserCircle } from "react-icons/fa";
import { SlCalender } from "react-icons/sl";
import Link from "next/link"

import { usePathname } from 'next/navigation';

export const Footer = () => {
    const pathname = usePathname();

    const displayFooter = (path:string) => {
        return pathname.includes(path) ? "hidden" : "fixed bottom-0 flex w-full justify-center items-center gap-x-16 shadow-2xl py-5 bg-white";
    }

    // 현재 경로에 따라 활성화된 아이콘에 스타일 적용
    const getIconStyle = (path:string) => {
    
        return pathname === path ? "flex flex-col items-center gap-y-1 text-primary text-lg border-b-[3px] border-primary" : "flex flex-col items-center gap-y-1 text-gray-500 text-lg";
    };
    
    return (
        <footer className={displayFooter("/auth")}>
            <Link href={"/"}>
                <div className={getIconStyle("/")}>
                    <FaBookOpen />
                    <span>수업</span>
                </div>
            </Link>
            <Link href={"/todo"}>
                <div className={getIconStyle("/todo")}>
                    <FaPen/>
                    <span>할일</span>
                </div>
            </Link>
            <Link href={"/calender"}>
                <div className={getIconStyle("/calender")}>
                    <SlCalender/>
                    <span>일정</span>
                </div>
            </Link>
            <Link href={"/profile"}>
                <div className={getIconStyle("/profile")}>
                    <FaRegUserCircle/>
                    <span >프로필</span>
                </div>
            </Link>
        </footer>
    );    
}
