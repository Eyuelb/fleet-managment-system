"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { notifications } from "@mantine/notifications";
import { Login, loginSchema } from "@app/(auth)/auth/_actions/auth.schema";
import { Button, PasswordInput, Stack, TextInput } from "@mantine/core";
import { signIn } from "@app/(auth)/auth/_actions/auth.action";
import { redirect } from "next/navigation";
import supabase from "@lib/supabase/client";

export const LoginForm = () => {
  const [error, setError] = useState("");
  const [isPending, startTransition] = useTransition();

  const methods = useForm<Login>({
    resolver: zodResolver(loginSchema),
  });

  const {
    reset,
    handleSubmit,
    register,
    formState: { errors },
  } = methods;

  const onSubmitHandler: SubmitHandler<Login> = async (values) => {
    startTransition(async () => {
      const response = await signIn(values);
      console.log({response})
      const { error, data } = response;
      if (error) {
        notifications.show({
          color: "red",
          message: `Failed to sign in: ${error}`,
        });
        console.log("Error message", error);
        reset({ password: "" });
        return;
      }
      if(response.data){
        await supabase.auth.refreshSession(response.data)
        setError("");
        notifications.show({
          color: "teal",
          message: "successfully logged in",
        });
        redirect('/')
      }

    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmitHandler)}>
      {error && (
        <p className="text-center bg-red-300 py-4 mb-6 rounded">{error}</p>
      )}
      <Stack>
        <TextInput
          label="Email"
          type="email"
          placeholder="Email address"
          {...register("email")}
          error={errors.email ? errors.email.message?.toString() : ""}
        />
        <PasswordInput
          label="Password"
          placeholder="Enter your password"
          required
          {...register("password")}
          error={errors.password ? errors.password.message?.toString() : ""}
        />
        <Button
          type="submit"
          fullWidth
          loading={isPending}
          disabled={isPending}
        >
          {isPending ? "loading..." : "Sign In"}
        </Button>
      </Stack>
    </form>
  );
};
