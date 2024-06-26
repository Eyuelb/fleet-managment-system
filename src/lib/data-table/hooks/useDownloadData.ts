import { MRT_ColumnDef, MRT_Row, MRT_RowData } from "mantine-react-table";
import { mkConfig, generateCsv, download } from "export-to-csv"; //or use your library of choice here
import { jsPDF } from "jspdf"; //or use your library of choice here
import autoTable from "jspdf-autotable";
type Props<TData extends MRT_RowData> = {
  columns: MRT_ColumnDef<TData, unknown>[];
};
const csvConfig = mkConfig({
  fieldSeparator: ",",
  decimalSeparator: ".",
  useKeysAsHeaders: true,
});

export const useDownloadData = <T extends MRT_RowData>({
  columns,
}: Props<T>) => {
  const downloadAsCsv = (rows: MRT_Row<T>[]) => {
    const rowData = rows.map((row) => row.original);
    const csv = generateCsv(csvConfig)(rowData);
    download(csvConfig)(csv);
  };
  const downloadAsPdf = (rows: MRT_Row<T>[]) => {
    const doc = new jsPDF();
    const tableData = rows.map((row) => Object.values(row.original));
    const tableHeaders = columns.map((c) => c.header);
    autoTable(doc, {
      head: [tableHeaders],
      body: tableData,
    });
    doc.save("pdf-table.pdf");
  };

  return {
    downloadAsCsv,
    downloadAsPdf,
  };
};
