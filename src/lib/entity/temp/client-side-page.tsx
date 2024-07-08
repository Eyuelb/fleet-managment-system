"use client"
import { EntityProvider } from '@lib/entity/provider';
import React from 'react';
const EntityLayout: React.FC = () => {
  return (
    <EntityProvider
      actions={{
        isCreate: false,
        isList: true,
        isUpdate: false,
        isView: false,
        isDelete: false,
      }}
      state={{
        resource: 'test',
      }}
      dataProviders={{
        list: {
          url: () => '/_/get-_',
          dataType: 'paginated',
          method: 'GET',
        },
        create: {
          url: () => '/_/create',
          method: "POST",
          massage: {
            success: 'Data Created Successfully',
            error: 'Error On Creating Data',
          },
        },
        update: {
          url: () => '/_/update',
          method: "PUT",
          massage: {
            success: 'Data Updated Successfully',
            error: 'Error On Updating Data',
          },
        },
        delete: {
          url: data => `/_/delete/${data.uuid}`,
          method: "DELETE",
          massage: {
            success: "Data Deleted Successfully",
            error: "Error On Deleting Data",
          },
        },
        view: {
          url: data => `/_/get/${data.uuid}`,
          method: "GET",
        },
      }}
      table={{
        accessorKey: 'uuid',
        columns: [
          {
            accessorKey: 'uuid',
            header: 'Test',
          },
        ],
      }}
      form={{
        title: {
          create: 'Create',
          update: 'Update'
        },
        defaultValues: {
        },
        fields: [
        ],
      }}
    />
  );
};

export default EntityLayout;
