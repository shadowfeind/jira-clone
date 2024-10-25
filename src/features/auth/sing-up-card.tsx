"use client";

import { DottedSeperator } from "@/components/dotted-seperator";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import Link from "next/link";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

const signUpSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email(),
  password: z.string().min(8, "Minimum 8 characters"),
});

export const SingUpCard = () => {
  const form = useForm({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const handleSubmit = (values: z.infer<typeof signUpSchema>) => {
    console.log(values);
  };
  return (
    <Card className="w-full h-full md:w-[487px] border-none shadow-none">
      <CardHeader className="flex items-center justify-center text-center p-7">
        <CardTitle className="text-2xl">Sign Up</CardTitle>
      </CardHeader>
      <CardDescription className="p-7 text-center">
        By signing up, you agree to our{" "}
        <Link href={"/privacy-policy"}>
          <span className="text-blue-700">Privacy Policy</span>
        </Link>{" "}
        and{" "}
        <Link href={"/terms"}>
          <span className="text-blue-700">Terms of service</span>
        </Link>
      </CardDescription>
      <div className="px-7">
        <DottedSeperator />
      </div>
      <CardContent className="p-7">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-7"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="Enter your name"
                      disabled={false}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="Enter your email"
                      disabled={false}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="Enter your password"
                      type="password"
                      disabled={false}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              size={"lg"}
              type="submit"
              className="w-full"
              disabled={false}
            >
              Sign Up
            </Button>
          </form>
        </Form>
      </CardContent>
      <div className="px-7">
        <DottedSeperator />
      </div>
      <CardContent className="flex flex-col p-7 gap-y-4">
        <Button
          size={"lg"}
          className="w-full"
          disabled={false}
          variant={"secondary"}
        >
          <FcGoogle className="mr-2 size-5" />
          Login with google
        </Button>
        <Button
          size={"lg"}
          className="w-full"
          disabled={false}
          variant={"secondary"}
        >
          <FaGithub className="mr-2 size-5" />
          Login with Github
        </Button>
      </CardContent>
      <div className="px-7">
        <DottedSeperator />
      </div>
      <CardContent className="p-7 flex items-center justify-center">
        <p>
          Already have an account?
          <Link href={"/sign-in"}>
            {" "}
            <span className="text-blue-700">Sign In</span>
          </Link>
        </p>
      </CardContent>
    </Card>
  );
};
