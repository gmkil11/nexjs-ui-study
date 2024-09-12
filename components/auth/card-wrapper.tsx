import { CustomCard, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import React from "react";
import { Header } from "./header";
import { Social } from "./social";
import { BackButton } from "./back-button";

interface cardWrapperProps {
    children: React.ReactNode;
    headerLabelFirst: string;
    headerLabelSecond: string;
    backButtonLabel: string;
    backButtonHref: string;
    showSocial?: boolean;
}

export const CardWrapper = ({ 
    children, 
    headerLabelFirst,
    headerLabelSecond,
    backButtonLabel,
    backButtonHref, 
    showSocial,
} : cardWrapperProps) => {
    return (
        <CustomCard>
            <CardHeader>
                <Header labelFirst={headerLabelFirst} labelSecond={headerLabelSecond}/>
            </CardHeader>
            <CardContent>
                {children}
            </CardContent>
            {showSocial && (         
            <CardFooter>
                <Social/>
            </CardFooter>
            )}
            <CardFooter>
                <BackButton
                    label={backButtonLabel}
                    href={backButtonHref}
                />
            </CardFooter>
        </CustomCard>
    );
}