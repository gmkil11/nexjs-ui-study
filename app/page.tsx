import Image from 'next/image'
import { Input } from "@/components/ui/input"
import { CiSearch } from "react-icons/ci";
import {Button} from "@/components/ui/button";
import { FaPlay } from "react-icons/fa";
import Link from "next/link";

export default function Home() {
  return (
    <main className={"justify-center items-center flex flex-col"}>
        <div className={"flex justify-between items-center mx-5 my-5 gap-60"}>
          <span className={"text-xl font-bold"}>Acade.My</span>
          <div className={"rounded-full border border-gray-200 p-1"}>
            <img src={"vercel.svg"} alt="vercel" className={"w-10 h-10"}/>
          </div>
        </div>
        <div className={"w-4/5 flex flex-col justify-center item-center gap-10"}>
            <div className={"flex justify-center items-center bg-gray-200 w-full px-3 rounded-sm"}>
                <Input className={"justify-center border-0 shadow-none focus-visible:ring-transparent items-center m-auto h-14 bg-gray-200 text-[15px]"}
                    type={"text"}
                    placeholder={"search any course"}
                >
                </Input>
                <CiSearch className={"text-3xl"}/>
            </div>
            <div className={"w-full"}>
                <div className={"flex items-center justify-between w-full"}>
                    <span>진행중인 코스</span>
                    <Link href={"/course"}>
                        <Button
                        variant={"link"}
                        className={"text-primary"}
                        >모두 보기</Button>
                    </Link>
                </div>
                <div className={"bg-gray-200 w-80 flex relative"}>
                    <img src={"yoga-class.png"} alt={"yoga-class"} className={"w-80"}/>
                    <div className={"flex items-center justify-between absolute bg-gray-200 w-72 bottom-4 left-4 p-4 bg-opacity-70 rounded-sm"}   >

                    <div className={"flex flex-col gap-2 "}>
                            <span>요가 수업</span>
                            <span> 5개 중 3개 수강 완료</span>
                        </div>
                        <div className={"rounded-full bg-white p-3"}>
                            <FaPlay className={"text-primary"}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </main>
  )
}
