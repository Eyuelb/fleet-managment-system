"use client";
import { Button, PasswordInput, TextInput } from "@mantine/core";
import {
  IconBrandApple,
  IconBrandFacebook,
  IconBrandGoogle,
} from "@tabler/icons-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { NewUser, newUserSchema } from "@app/(auth)/auth/_actions/auth.schema";
import { notifications } from "@mantine/notifications";
import { signUp } from "@app/(auth)/auth/_actions/auth.action";

export default function SignupForm() {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const methods = useForm<NewUser>({
    resolver: zodResolver(newUserSchema),
  });

  const {
    reset,
    handleSubmit,
    register,
    formState: { errors },
  } = methods;
  const onSubmitHandler: SubmitHandler<NewUser> = (values) => {
    startTransition(async () => {
      const { data, error } = await signUp({
        data:values,
        emailRedirectTo: `${location.origin}/auth/callback`,
      });
      console.log(data)
      if (error) {
        console.log("Error message", error);
        notifications.show({
          color: "red",
          message: `Failed to Register: ${(error as any)}`,
        });
        console.log("Error message", error);
        reset({ password: "" });
        return;
      }
      notifications.show({
        color: "teal",
        message: "Registered logged in",
      });
      router.push("/auth/login");
    });
  };
  return (
    <form onSubmit={handleSubmit(onSubmitHandler)}>
    <div className="mb-4 flex">
      <TextInput
        label="Full Name"
        placeholder="Your name"
        required
        className="mr-2"
        {...register("name")}
        error={errors.name ? errors.name.message?.toString() : ""}
      />
    </div>
    <div className="mb-4">
      <TextInput
        label="Email"
        placeholder="Enter your email address"
        type="email"
        required
        {...register("email")}
        error={errors.email ? errors.email.message?.toString() : ""}
      />
    </div>
    <div className="mb-4">
      <PasswordInput
        label="Password"
        placeholder="Enter your password"
        type="password"
        required
        {...register("password")}
        error={errors.password ? errors.password.message?.toString() : ""}
      />
      <PasswordInput
        label="Confirm Password"
        placeholder="Enter previous password"
        type="password"
        required
        {...register("passwordConfirm")}
        error={
          errors.passwordConfirm
            ? errors.passwordConfirm.message?.toString()
            : ""
        }
      />
    </div>
    <div className="mb-4 flex items-center justify-between text-xs">
      <div>
        <label>
          <input type="checkbox" className="mr-2" />
          Keep me logged in
        </label>
      </div>
    </div>
    <Button
      type="submit"
      fullWidth
      loading={isPending}
      disabled={isPending}
    >
      {isPending ? "loading..." : "Sign up"}
    </Button>
  </form>
  );
}
