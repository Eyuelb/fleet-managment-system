"use client";
import { EntityProvider } from "@lib/entity/provider";
import { getSchemaColumns } from "@utils/helper";
import React from "react";

const resource = "vehicles";
const EntityLayout: React.FC = () => {
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
          "model",
          "licensePlate",
          "status",
          "year",
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
            name: "model",
            label: "Model",
            type: "text",
            condition: ["required"],
          },
          {
            name: "licensePlate",
            label: "License Plate",
            type: "text",
            condition: ["required"],
          },
          {
            name: "year",
            label: "Year",
            type: "number",
            condition: ["number"],
          },
        ],
      }}
    />
  );
};

export default EntityLayout;
