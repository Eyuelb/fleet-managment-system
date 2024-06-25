"use client";
import { FormBuilder } from "../../lib/form-builder";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div>
        <FormBuilder
          fields={[
            { name: "name", type: "text", label: "Name" },
            {
              name: "email",
              type: "text",
              label: "Email",
            },
            {
              name: "password",
              type: "password",
              label: "Password",
            },
          ]}
          onSubmit={console.log}
          buttonProps={{
            bg: "var(--mantine-primary-color-filled)",
            color: "white",
            children: "Submit",
          }}
          buttonWrapperProps={{
            className: "flex w-full justify-end",
          }}
        />
      </div>
    </main>
  );
}
