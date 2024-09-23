import Image from 'next/image'
import { Input } from "@/components/ui/input"
import { CiSearch } from "react-icons/ci";
import {Button} from "@/components/ui/button";
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
            <div className={"flex flex-col justify-between items-center w-full"}>
                <div className={"flex-col "}>
                    <span>진행중인 코스</span>
                    <Link href={"/course"}>
                        <Button
                        variant={"link"}
                        className={"text-primary"}
                        >모두 보기</Button>
                    </Link>
                </div>
                <div>
                    <img src={"yoga-class.png"} alt={"toga-class"}/>
                    <div>

                    </div>
                </div>
            </div>
        </div>
    </main>
  )
}
