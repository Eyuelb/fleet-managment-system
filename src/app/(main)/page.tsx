"use client";
import { FormBuilder } from "../../lib/form-builder";
interface ReturnType {
  id: any;
  label: string;
  type: any;
}

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
              condition: ["email"],
            },
            {
              name: "password",
              type: "password",
              label: "Password",
              condition: ["password"],
            },
            {
              name: "confirmPassword",
              type: "password",
              label: "Confirm",
              condition: ["confirmPassword"],
            },
            {
              name: "fullName",
              type: "text",
              label: "Full Name",
              onWatchFields: {
                fields: ["name"],
                formatter: (val) => val.map((field) => field.value).join(","),
              },
            },
            {
              name: "calendar",
              type: "date",
              label: "Calendar",
            },
            {
              name: "select2",
              type: "select",
              label: "Select",
              dataSource: {
                key: "address-data",
                valueKey: "address",
                labelKey: "address",
              },
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
