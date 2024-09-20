"use client";

import {InterestCards} from "@/components/auth/interest-cards";
import {Button} from "@/components/ui/button";
import { IoIosInformationCircleOutline } from "react-icons/io";
import {useEffect, useState} from "react";
import { useRouter } from "next/navigation";

export const InterestForm = () => {

    const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
    const router = useRouter();

    // 선택된 관심사를 설정하는 함수
    const handleSelectedInterests = (interests: string[]) => {
        setSelectedInterests(interests);
    };

    async function onSubmit(interests: string[], userId: string | undefined) {
        try {
            console.log(interests, userId)
            const res = await fetch("/api/interests/interests", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ interests, userId })  // 선택된 관심사를 배열과 함께 전송
            });

            const data = await res.json();

            if (res.status === 200) {
                console.log("관심사 저장 성공", data);
                router.push("/")
            }
        } catch (error) {
            console.error("에러 발생:", error);
        }
    }



    // 클라이언트 측에서 로그인한 사용자의 정보를 가져오는 코드
    const fetchUserProfile = async () => {
        const res = await fetch('/api/user/profile', {
            method: 'GET',
            credentials: 'include', // 쿠키를 포함하여 요청
        });

        const data = await res.json();
        if (res.ok) {
            return data.user;
        } else {
            throw new Error(data.message || 'Failed to fetch user info');
        }
    };

    const [userData, setUserData] = useState<{ id: string; name: string; email: string } | null>(null);

    useEffect(() => {
        fetchUserProfile()
            .then((data) => {
                setUserData(data);
            })
            .catch((error) => {
                console.error("Error fetching user data:", error);
            });
    }, []); // 컴포넌트 마운트 시 한 번만 실행



    return (
        <div className={" flex flex-col justify-center items-center w-full gap-y-5 animate-slide-in-y-o-1"}>
            <h1 className={"mb-2 font-normal text-primary"}>환영합니다!</h1>
            <h2 className={"font-normal"}>관심있는 주제를 선택해주세요</h2>
            <span className={"px-10 text-gray-500 font-light"}>Praesent eleifend malesuada velit consectetur bibendum. Donec varius nibh sed dolor iaculis, vitae semper ipsum maximus. Phasellus vitae tristique arcu.</span>
            <InterestCards
                onChange={handleSelectedInterests}
            />

            <Button type="submit" className="w-96 h-14 text-xl" onClick={() => onSubmit(selectedInterests, userData?.id)}>
                시작하기
            </Button>
            <div className={"flex justify-center items-center w-full gap-x-1"}>
                <IoIosInformationCircleOutline className={"text-primary"}/>
                <span className={"font-light"}>걱정마세요 언제든지 변경 가능합니다!</span>
            </div>
        </div>
    );
}