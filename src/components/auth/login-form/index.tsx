"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { notifications } from "@mantine/notifications";
import { Login, loginSchema } from "@app/(auth)/auth/_actions/auth.schema";
import {
  Button,
  LoadingOverlay,
  PasswordInput,
  Stack,
  TextInput,
} from "@mantine/core";
import {  useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/lib/auth/auth.hooks";
import { useAuthRequester } from "@lib/auth/auth.query";

export const LoginForm = () => {
  const router = useRouter().push;
  const { setSession } = useAuth();
  const callbackUrl = useSearchParams().get("callback");

  const { isLoading, mutate: login } = useAuthRequester<any, any>({
    key: "login",
    type: "mutation",
  });

  const [isPending, startTransition] = useTransition();

  const methods = useForm<Login>({
    resolver: zodResolver(loginSchema),
  });

  const {
    reset,
    handleSubmit,
    register,
    setError,
    formState: { errors },
  } = methods;

  const onSubmitHandler: SubmitHandler<Login> = async (values) => {
    await login({
      payload: values,
    })
      .then(async (res) => {
        console.log(res)
        if (res?.token?.access_token) {
          setSession({
            ...res,
          });
          router("/");
        }
      })
      .catch((res) => {
        if (res?.message) {
          setError("root", res);
          notifications.show({
            color: "red",
            message: `Failed to sign in: ${res?.message}`,
          });
        } else {
          setError("root", {
            message: "Failed to sign",
          });

          notifications.show({
            color: "red",
            message: `Failed to sign in`,
          });
        }

        console.error(res);
      });
    // startTransition(async () => {
    //   const response = await login({
    //     payload:values
    //   });
    //   console.log({response})
    //   const { error, data } = response;
    //   if (error) {
    //     notifications.show({
    //       color: "red",
    //       message: `Failed to sign in: ${error}`,
    //     });
    //     console.log("Error message", error);
    //     reset({ password: "" });
    //     return;
    //   }
    //   if(response.data){
    //     await supabase.auth.refreshSession(response.data)
    //     setError("");
    //     notifications.show({
    //       color: "teal",
    //       message: "successfully logged in",
    //     });
    //     redirect('/')
    //   }

    // });
  };

  return (
    <form onSubmit={handleSubmit(onSubmitHandler)}>
      <LoadingOverlay visible={isLoading} />
      {errors.root && (
        <p className="text-center py-4 mb-6 rounded text-red-700">
          {errors?.root.message}
        </p>
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
