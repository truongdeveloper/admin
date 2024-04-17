"use client";
import { Button, Card, Input } from "@nextui-org/react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { getSession, signIn } from "next-auth/react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

type FormData = {
  username: string;
  password: string;
};

const LoginBody = () => {
  const router = useRouter();
  const [disabled, setDisabled] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);
  const schema = yup
    .object({
      username: yup
        .string()
        .required("Trường này không được để trống")
        .min(6, "Tài khoản phải có 6 ký tự trở lên")
        .label("Tài khoản"),
      password: yup
        .string()
        .required("Trường này không được để trống")
        .min(6, "Mật khẩu phải có 6 ký tự trở lên")
        .label("Mật khẩu"),
    })
    .required();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: { username: "", password: "" },
    resolver: yupResolver<any>(schema),
  });
  const onSubmit = async (data: FormData) => {
    const res = await signIn("credentials", {
      email: data.username,
      password: data.password,
      redirect: false,
    });
    if (!res?.ok) {
      toast("Sai tên đăng nhâp hoặc mật khẩu", {
        type: "warning",
      });
    } else {
      const session = await getSession();
      toast(
        `Đã đăng nhập tài khoản có quyền ${session?.user.quyen[0].authority}`,
        {
          type: "success",
        }
      );
      if (session?.user.quyen[0].authority !== "Người dùng") {
        router.push("/dashboard");
      }
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center w-full dark:bg-gray-950">
      <div
        className="bg-white box-shadow-sm dark:bg-gray-900 rounded-lg px-8 py-6 max-w-md"
        style={{
          width: "30rem",
        }}
      >
        <h1 className="text-2xl font-bold text-center mb-4 dark:text-gray-200">
          Đăng nhâp để vào hệ thống
        </h1>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              Tên tài khoản
            </label>
            <input
              type="username"
              id="email"
              className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="your@email.com"
              {...register("username")}
            />
            {errors.username && (
              <p className="text-red-500 text-md mt-1 ml-2">
                {errors.username.message}
              </p>
            )}
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              Mật khẩu
            </label>
            <input
              type="password"
              id="password"
              className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter your password"
              {...register("password")}
            />
            {errors.password && (
              <p className="text-red-500 text-md mt-1 ml-2">
                {errors.password.message}
              </p>
            )}
            {/* <a
              href="#"
              className="text-xs text-gray-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Forgot Password?
            </a> */}
          </div>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="remember"
                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 focus:outline-none"
              />
              <label className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                Remember me
              </label>
            </div>
          </div>
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginBody;
