"use client"

import React, { useState } from "react";
import { interestData } from "@/data/interest-data";
import { IconType } from "react-icons";
import {CardContent, CustomCard} from "@/components/ui/card";  // Import the IconType

interface InterestCardProps {
    title: string;
    icon: IconType;
    isActive: boolean;
    onClick: () => void;
}

interface InterestCardsProps {
    onChange: (interests: string[]) => void;
}

export const InterestCard = ({ title, icon: Icon, isActive, onClick }: InterestCardProps) => {
    return (
        <div
            onClick={onClick}
            className={`w-28 h-28 flex flex-col justify-center items-center cursor-pointer border-2 rounded-xl transition ${
                isActive ? "bg-green-800 text-white shadow-sm" : "bg-white text-gray-500"
            }`}
        >
            <div className={`transition p-3 rounded-lg ${isActive ? "bg-white text-green-800" : "bg-gray-200 text-gray-500"}`}>
                <Icon size={30} />  {/* Call the Icon as a component */}
            </div>
            <p>{title}</p>
        </div>
    );
};

export const InterestCards = ({ onChange }: InterestCardsProps) => {
    const [activeInterests, setActiveInterests] = useState<string[]>([]);

    const handleCardClick = (interest: string) => {
        let updatedInterests;
        if (activeInterests.includes(interest)) {
            updatedInterests = activeInterests.filter((i) => i !== interest);
        } else {
            updatedInterests = [...activeInterests, interest];
        }
        setActiveInterests(updatedInterests);
        onChange(updatedInterests);  // 부모 컴포넌트에 선택된 관심사를 전달
        console.log(updatedInterests)
    };

    return (
        <CustomCard>
            <CardContent>
                <div className="grid grid-cols-3 gap-4 p-4">
                    {interestData.map((interest) => (
                        <InterestCard
                            key={interest.title}
                            title={interest.title}
                            icon={interest.icon}
                            isActive={activeInterests.includes(interest.title)}
                            onClick={() => handleCardClick(interest.title)}
                        />
                    ))}
                </div>
            </CardContent>
        </CustomCard>
    );
};
