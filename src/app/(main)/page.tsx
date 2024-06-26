"use client";
import { DataTable } from "../../lib/data-table";
import { DataTableProvider } from "../../lib/data-table/contexts/table";
import { FormBuilder } from "../../lib/form-builder";
interface ReturnType {
  id: any;
  label: string;
  type: any;
}

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <DataTableProvider>
        <DataTable
          columns={[
            { header: "Description", accessorKey: "description" },
            { header: "Amount", accessorKey: "commissionAmount" },
            { header: "Type", accessorKey: "commissionType" },
          ]}
          isLoading={false}
        />
      </DataTableProvider>
    </main>
  );
}
