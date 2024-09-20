import Link from "next/link";
import { Button } from "../ui/button"
import { usePathname } from "next/navigation";

interface BackButtonProps{
    label: string,
    href: string,
}

export const BackButton = ({label, href}: BackButtonProps) => {
    const pathname = usePathname();
    if (pathname) {
        const isLoginOrRegister = () => {
            if (pathname.includes("/auth/register")) {
                return "로그인"
            }
            return "회원가입"
        }


        return (
            <Button
                variant="link"
                className="font-normal w-full text-lg"
                size="sm"
                asChild
            >
                <Link href={href} className=" text-[#808080]">
                    {label}
                    <span className="text-[#F4AC47]">&nbsp;&nbsp;{isLoginOrRegister()}</span>
                </Link>
            </Button>
        );
    }
}