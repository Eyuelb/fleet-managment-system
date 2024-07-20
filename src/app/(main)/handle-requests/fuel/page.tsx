import React from "react";
import DataDisplay from "./_components/data-display";
import { DataTableProvider } from "@lib/data-table/contexts/table";

const Page = () => {
  return (
    <div>
      <DataTableProvider>
        <DataDisplay />
      </DataTableProvider>
    </div>
  );
};

export default Page;
