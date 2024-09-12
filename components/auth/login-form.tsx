"use client";

import { CardWrapper } from "./card-wrapper";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { loginSchema } from "@/schemas";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Input } from "@/components/ui/input";
import { Button, buttonVariants } from "../ui/button";
import { IoIosArrowBack } from "react-icons/io";
import Link from "next/link";


export const LoginForm = () => {

    const form = useForm<z.infer<typeof loginSchema>>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });


    function onSubmit(values: z.infer<typeof loginSchema>) {
        console.log(values)
    }


    return (
        <div className="w-full h-screen">
            <Link href="/" className={buttonVariants({ variant: "ghost", size:"icon"})}>
                <IoIosArrowBack className="h-8 w-8 text-white mt-5 ml-2"/>
            </Link>
            <div
                className="w-full h-[350px] bg-cover bg-center -mt-40"
                style={{
                    backgroundImage: "url('/top.svg')",
                }}
            ></div>
            <CardWrapper
                headerLabelFirst={"어서오세요!"}
                headerLabelSecond={"돌아오신 것을 환영합니다."}
                backButtonLabel={"계정이 없으십니까?"}
                backButtonHref={"/auth/register"}
                showSocial
            >
            <Form {...form}>
                <form
                 onSubmit={form.handleSubmit(onSubmit)}
                 className="space-y-6"
                >
                    <div className="space-y-4">
                        <FormField
                         control={form.control}
                         name="email"
                         render={({ field }) => (
                            <FormItem>
                                <FormLabel>이메일</FormLabel>
                                <FormControl>
                                    <Input
                                        className="h-14"
                                        {...field}
                                        placeholder="user01@example.com"
                                        type="email"
                                    />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                         )}
                        />
                        <FormField
                         control={form.control}
                         name="password"
                         render={({ field }) => (
                            <FormItem>
                                <FormLabel>비밀번호</FormLabel>
                                <FormControl>
                                    <Input
                                        className="h-14"
                                        {...field}
                                        placeholder="******"
                                        type="password"
                                    />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                         )}
                        />
                    </div>
                    <Button
                        variant= "link"
                        className="text-base w-full flex justify-end text-[#13430F]"
                        size="sm"
                        >
                            <Link href={"/find"}>
                                비밀번호를 잊으셨습니까?
                            </Link>
                    </Button>

                    <Button
                     type="submit"
                     className="w-full h-14 text-xl"

                    >
                        로그인
                    </Button>
                </form>
            </Form>


            </CardWrapper>
        </div>
    );
}