"use client";
import { vehicles } from "@db/schema";
import { EntityProvider } from "@lib/entity/provider";
import { getSchemaColumns } from "@utils/helper";
import { capitalizeTxt } from "@utils/text";
import React from "react";

const resource = "groups";
const EntityLayout: React.FC = () => {
  return (
    <EntityProvider
      actions={{
        isCreate: true,
        isList: true,
        isUpdate: true,
        isView: true,
        isDelete: true,
      }}
      state={{
        resource,
      }}
      dataProviders={{
        list: {
          url: () => `/api/v1/${resource}`,
          dataType: "un-paginated",
          method: "GET",
        },
        create: {
          url: () => `/api/v1/${resource}`,
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
        columns: getSchemaColumns(resource, [
          "name",
          "description"
        ]),
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
            name: "description",
            label: "Description",
            type: "textarea",
            condition: ["required"],
          },
        ],
      }}
    />
  );
};

export default EntityLayout;
