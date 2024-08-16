"use client";
import { ColumnsType } from "@db/model";
import useQueryRequest from "@hooks/useQueryRequest";
import { EntityProvider } from "@lib/entity/provider";
import { getDataSourceQuery } from "@utils/helper";
import React, { useCallback } from "react";

const resource = "users";
const EntityLayout: React.FC = () => {
  const { data } = useQueryRequest<ColumnsType<"roles">[]>({
    ...getDataSourceQuery("roles", ["all-list"]),
    dataType: "un-paginated",
    placeholder: [],
  });
  const getRoleNameById = useCallback(
    (id: string) => data?.find((r) => r.id === id)?.name,
    [data]
  );
  return (
    <EntityProvider
      actions={{
        isCreate: true,
        isList: true,
        isUpdate: true,
        isView: false,
        isDelete: true,
      }}
      state={{
        resource,
      }}
      dataProviders={{
        list: {
          url: () => `/api/v1/${resource}`,
          dataType: "paginated",
          method: "GET",
        },
        create: {
          url: () => `/api/auth/register`,
          method: "POST",
          massage: {
            success: "Data Created Successfully",
            error: "Error On Creating Data",
          },
        },
        update: {
          url: (data) => `/api/v1/${resource}/${data.id}`,
          method: "PUT",
          massage: {
            success: "Data Updated Successfully",
            error: "Error On Updating Data",
          },
        },
        delete: {
          url: (data) => `/api/v1/${resource}/${data.id}`,
          method: "DELETE",
          massage: {
            success: "Data Deleted Successfully",
            error: "Error On Deleting Data",
          },
        },
        view: {
          url: (data) => `/api/v1/${resource}/${data.id}`,
          method: "GET",
        },
      }}
      table={{
        accessorKey: "id",
        columns: [
          {
            accessorKey: "name",
            header: "Name",
          },
          {
            accessorKey: "email",
            header: "Email",
          },
          {
            accessorKey: "role",
            header: "Role",
            Cell: ({ cell }) => (
              <div>{getRoleNameById(cell.getValue() as string)}</div>
            ),
          },
        ],
      }}
      form={{
        title: {
          create: "Create",
          update: "Update",
        },
        defaultValues: {},
        fields: [
          {
            name: "name",
            label: "Name",
            type: "text",
            condition: ["required"],
          },
          {
            name: "email",
            label: "Email",
            type: "email",
            condition: ["required"],
          },
          {
            name: "role",
            label: "Role",
            type: "select",
            condition: ["required"],
            dataSource: {
              key: "roles",
              valueKey: "id",
              labelKey: "name",
            },
          },
        ],
      }}
    />
  );
};

export default EntityLayout;
