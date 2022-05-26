import React from "react";
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";
import { Button } from "react-bootstrap";

export const ExportToExcel = ({ apiData, fileName }: any) => {
  const fileExtension = ".xlsx";

  const exportToCSV = (apiData: any, fileName: any) => {
    const dataList = apiData.map((item: any) => [
      item?.username,
      item?.email,
      item?.createdAt,
    ]);

    let header = ["username", "email", "createdAt"];
    const ws = XLSX.utils.book_new();
    XLSX.utils.sheet_add_aoa(ws, [header]);
    XLSX.utils.sheet_add_json(ws, dataList, { origin: "A2", skipHeader: true });
    const wb = { Sheets: { dataList: ws }, SheetNames: ["dataList"] };
    const excelBuffer = XLSX.write(wb, {
      bookType: "xlsx",
      type: "array",
      cellStyles: true,
    });
    const data = new Blob([excelBuffer], { type: "object" });
    FileSaver.saveAs(data, fileName + fileExtension);
  };
  return (
    <Button
      className="export mr-3"
      variant="primary"
      size="lg"
      active
      disabled={apiData?.length === 0}
      onClick={() => exportToCSV(apiData, fileName)}
    >
      Export
    </Button>
  );
};
