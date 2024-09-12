import Link from "next/link";
import { Button } from "../ui/button"

interface BackButtonProps{
    label: string,
    href: string,
}

export const BackButton = ({label, href}: BackButtonProps) => {
    return(
        <Button
        variant= "link"
        className="font-normal w-full text-lg"
        size="sm"
        asChild
        >
            <Link href={href} className=" text-[#808080]">
                {label} 
                <span className="text-[#F4AC47]">&nbsp;&nbsp;회원가입</span>
            </Link>
        </Button>
    );
}