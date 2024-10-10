"use client";

import { useState } from "react";
import { CardWrapper } from "./card-wrapper";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form";
import { RegisterSchemaStepOne, RegisterSchemaStepTwo} from "@/schemas";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

export const RegisterForm = () => {
    const [step, setStep] = useState(1); // 현재 폼 단계
    const router = useRouter();

    const formStepOne = useForm<z.infer<typeof RegisterSchemaStepOne>>({
        resolver: zodResolver(RegisterSchemaStepOne),
        defaultValues: {
            email: "",
            password: "",
            confirmPassword: "",
        }
    });

    const formStepTwo = useForm<z.infer<typeof RegisterSchemaStepTwo>>({
        resolver: zodResolver(RegisterSchemaStepTwo),
        defaultValues: {
            name: ""
        }
    });

    const onSubmitStepOne = async (values: any) => {
        try {
            const res = await fetch("/api/user/check-email", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email: values.email }),
            });

            const data = await res.json();

            if (res.status === 409) {
                return formStepOne.setError("email", {
                    type: "manual",
                    message: data.message,
                });
            } else if (res.status === 200) {
                console.log("이메일이 중복되지 않습니다. 다음으로 넘어갑니다.")
            }

            setStep(2); // Step 1 성공시 2단계로 이동
        } catch (error) {
            console.error("An error occurred:", error);
        }
    };

    const onSubmitStepTwo = async (values: z.infer<typeof RegisterSchemaStepTwo>) => {
        const finalValues = { ...formStepOne.getValues(), ...values }; // Step 1과 Step 2 값 병합

        try {
            const res = await fetch("/api/user/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(finalValues)
            });

            const data = await res.json();

            if (res.status === 201) {
                console.log("회원가입에 성공했습니다. 관심사 페이지로 이동합니다.", finalValues)
                localStorage.setItem("token", data.token);
                router.push("/auth/interest");
            }
        } catch (error) {
            console.error("An error occurred:", error);
        }
    };


    return (
        <CardWrapper
            headerLabelFirst={step === 1 ? "새로운 가족" : "추가 정보"}
            headerLabelSecond={step === 1 ? "만나서 반가워요!" : "회원 정보 입력"}
            backButtonLabel={"계정이 이미 존재하십니까?"}
            backButtonHref={"/auth/login"}
            showSocial
        >
            {step === 1 && (
                <Form {...formStepOne}>
                    <form onSubmit={formStepOne.handleSubmit(onSubmitStepOne)} className="space-y-6">
                        <div className="space-y-4">
                            <FormField
                                control={formStepOne.control}
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
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={formStepOne.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>비밀번호</FormLabel>
                                        <FormControl>
                                            <Input className="h-14" {...field} placeholder="******" type="password" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={formStepOne.control}
                                name="confirmPassword"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>비밀번호 확인</FormLabel>
                                        <FormControl>
                                            <Input className="h-14" {...field} placeholder="******" type="password" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <Button type="submit" className="w-full h-14 text-xl">
                            다음
                        </Button>
                    </form>
                </Form>
            )}

            {step === 2 && (
                <Form {...formStepTwo}>
                    <form onSubmit={formStepTwo.handleSubmit(onSubmitStepTwo)} className="space-y-6 animate-slide-in-x">
                        <div className="space-y-4">
                            <FormField
                                control={formStepTwo.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>회원명</FormLabel>
                                        <FormControl>
                                            <Input
                                                className="h-14"
                                                {...field}
                                                placeholder="user01"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <Button type="submit" className="w-full h-14 text-xl">
                            회원가입
                        </Button>
                    </form>
                </Form>
            )}
        </CardWrapper>
    );
};
