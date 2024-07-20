"use client";
import { useParams } from "next/navigation";
import React from "react";
import RequestHandleForm from "../_components/form";
import useDynamicRequest from "@hooks/useDynamicRequest";
import { ColumnsType } from "@db/model";
import { getDataSourceById } from "@utils/helper";
import { LoadingOverlay } from "@mantine/core";

const Page = () => {
  const id = useParams()["id"] as string;
  const { data, isLoading, isFetching, refetch } = useDynamicRequest<
    ColumnsType<"fleetRequest"> | undefined
  >({
    ...getDataSourceById("fleetRequest", id),
    placeholder: undefined,
  });
  return (
    <div className="relative min-h-screen">
      <LoadingOverlay visible={isLoading || isFetching} />
      {data && !isLoading && (
        <RequestHandleForm
          name="Handle Request"
          rootPath={`/handle-requests/fleet`}
          initValue={data}
          refresh={refetch}
        />
      )}
    </div>
  );
};

export default Page;
