import React, { PropsWithChildren } from "react";
import useEntity from "../../../../hooks/useEntity";
import { useCreate, useUpdate, useView } from "../../../../hooks/useRequest";
import { useForm } from "../../../../hooks/useForm";
import { FormBuilder } from "@lib/form-builder";
import { LoadingOverlay, Text } from "@mantine/core";
import { useForceUpdate } from "@lib/form-builder/hooks/useForceUpdate";
import useQueryRequest from "@hooks/useQueryRequest";
import useMutationRequest from "@hooks/useMutationRequest";
import { useCustomPage } from "@lib/entity/hooks/useCustomPage";

const FormPage = () => {
  const [key, resetForm] = useForceUpdate();
  const { entityId, resource, operation } = useEntity();
  const viewQuery = useView();
  const createQuery = useCreate();
  const updateQuery = useUpdate();

  const viewDataQuery = useQueryRequest<any>({
    url: viewQuery?.url({ id: entityId }) ?? "/",
    method: viewQuery?.method,
    queryKey: [resource, entityId],
    enabled: !!entityId && operation === "update",
  });

  const createMutation = useMutationRequest<any, any>({
    url: createQuery?.url() ?? "/",
    method: createQuery?.method,
    queryKey: [resource ?? ""],
    onSuccess: () => {
      console.log("Mutation-Created");
      resetForm();
    },
  });

  const updateMutation = useMutationRequest<any, any>({
    url: updateQuery?.url({ id: entityId }) ?? "/",
    method: updateQuery?.method,
    queryKey: [resource ?? ""],
  });

  const handleSubmit = (data: any) => {
    if (operation === "create") {
      createMutation.mutate(data);
    }
    if (operation === "update") {
      updateMutation.mutate({ ...viewDataQuery.data, ...data, id: entityId });
    }
  };
  const form = useForm();
  const defaultValues = form?.defaultValues ?? {};

  const title =
    form?.title && (operation === "create" || operation === "update")
      ? form?.title[operation]
      : "";

  return (
    <div className="min-h-[400px] w-full relative min-w-[300px] py-4">
      {viewDataQuery.isLoading ? (
        <div className="w-full max-w-[600px] flex justify-center">
          <LoadingOverlay visible />
        </div>
      ) : viewDataQuery.data ? (
        <FormBuilder
          key={key}
          className="form-wrapper bg-[var(--card)] border shadow-sm  p-8 py-10 rounded-lg max-w-[600px]"
          defaultValues={{ ...defaultValues, ...viewDataQuery.data }}
          onSubmit={handleSubmit}
          fields={form?.fields ?? []}
          isLoading={createMutation.isPending || updateMutation.isPending}
          title={
            <Text fz={20} fw={500}>
              {title}
            </Text>
          }
          buttonProps={{
            bg: "var(--mantine-primary-color-filled)",
            color: "white",
            children: "Submit",
          }}
          buttonWrapperProps={{
            className: "flex w-full justify-end",
          }}
        />
      ) : (
        <p>Error on Fetching Data</p>
      )}
    </div>
  );
};
export default function Render() {
  const pages = useCustomPage();

  if (pages?.create?.render) {
    return <div className="p-2">{pages?.create?.render()}</div>;
  }
  if (pages?.update?.render) {
    return <div className="p-2">{pages?.update?.render()}</div>;
  }
  return <FormPage/>;
}
