"use client";
import { post } from "@lib/http-request/services";
import showNotification from "@lib/notification";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
interface LoginFormProps {
  onLogin: () => void; // You can pass additional parameters for login if needed
}

interface LoginFormData {
  email: string;
  password: string;
}

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>();

  const { mutate, isPending } = useMutation({
    mutationFn: (data: LoginFormData) => post("/api/auth/login", data),
    onSuccess: () => {},
    onError: (error) => {
      console.error("Login failed:", error);
      showNotification({
        type:'error',
        message:"Login failed. Please check your credentials."
      });
    },
  });

  const onSubmit = (data: LoginFormData) => {
    mutate(data);
  };
  return (
    <div className="flex h-screen w-screen items-center justify-center bg-gray-50">
      <div className="z-10 w-full max-w-md overflow-hidden rounded-2xl border border-gray-100 shadow-xl">
        <div className="flex flex-col items-center justify-center space-y-3 border-b border-gray-200 bg-white px-4 py-6 pt-8 text-center sm:px-16">
          <h3 className="text-xl font-semibold">Sign In</h3>
          <p className="text-sm text-gray-500">
            Use your email and password to sign in
          </p>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col space-y-4 bg-gray-50 px-4 py-8 sm:px-16"
        >
          <div>
            <label
              className="block text-xs text-gray-600 uppercase"
              htmlFor="email"
            >
              Email:
            </label>
            <input
              type="text"
              id="email"
              className="mt-1 block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-black focus:outline-none focus:ring-black sm:text-sm"
              {...register("email", { required: true })}
            />
            {errors.email && <span>This field is required</span>}
          </div>
          <div>
            <label
              className="block text-xs text-gray-600 uppercase"
              htmlFor="password"
            >
              Password:
            </label>
            <input
              type="password"
              id="password"
              className="mt-1 block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-black focus:outline-none focus:ring-black sm:text-sm"
              {...register("password", { required: true })}
            />
            {errors.password && <span>This field is required</span>}
          </div>
          <button type="submit" disabled={isPending}>
            Login
          </button>
          {isPending && <div>Loading...</div>}
        </form>
      </div>
    </div>
  );
}
