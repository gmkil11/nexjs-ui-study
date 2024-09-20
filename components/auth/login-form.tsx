"use client";

import {CardWrapper} from "./card-wrapper";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form";
import {loginSchema} from "@/schemas";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import * as z from "zod";
import {Input} from "@/components/ui/input";
import {Button, buttonVariants} from "../ui/button";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export const LoginForm = () => {

    const router = useRouter();
    const isProduction = process.env.NODE_ENV === 'production';

    const form = useForm < z.infer < typeof loginSchema >> ({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: ""
        }
    });

    async function onSubmit(values: z.infer<typeof loginSchema>) {
        try {
            const res = await fetch("/api/user/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(values)
            })

            const data = await res.json();

            if (res.status === 200) {
                // 로그인 성공, 토큰 저장 및 리다이렉트
                localStorage.setItem("token", data.token);  // JWT 토큰을 저장
                console.log(data.message)
                router.push("/");  // 로그인 후 대시보드로 이동
            }
        } catch (error) {
            console.error("An error occurred:", error);
        }
    }

    return (
    <CardWrapper
        headerLabelFirst={"어서오세요!"}
        headerLabelSecond={"돌아오신 것을 환영합니다."}
        backButtonLabel={"계정이 없으십니까?"}
        backButtonHref={"/auth/register"}
        showSocial>
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="space-y-4">
                    <FormField
                        control={form.control}
                        name="email"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>이메일</FormLabel>
                                <FormControl>
                                    <Input
                                        className="h-14"
                                        {...field}
                                        placeholder="user01@example.com"
                                        type="email"/>
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}/>
                    <FormField
                        control={form.control}
                        name="password"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>비밀번호</FormLabel>
                                <FormControl>
                                    <Input className="h-14" {...field} placeholder="******" type="password"/>
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}/>
                </div>
                <Button
                    variant="link"
                    className="text-base w-full flex justify-end text-[#13430F]"
                    size="sm">
                    <Link href={"/find"}>
                        비밀번호를 잊으셨습니까?
                    </Link>
                </Button>

                <Button type="submit" className="w-full h-14 text-xl">
                    로그인
                </Button>
            </form>
        </Form>

    </CardWrapper>

    );
}