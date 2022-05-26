import React from "react";
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";
import { Button } from "react-bootstrap";
import "../../src/projects.css";

const ProductExport = ({ apiData }: any) => {
  const handleExportData = () => {
    const dataList = apiData.map((item: any) => [
      item?.attributes?.productTitle,
      item?.attributes?.description,
      item?.attributes?.qty,
      item?.attributes?.price,
      item?.attributes?.category?.data?.attributes?.title,
      item?.attributes?.isActive ? "Active" : "inActive",
    ]);

    let header = [
      "productTitle",
      "description",
      "qty",
      "price",
      "category",
      "Status",
    ];
    const ws = XLSX.utils.book_new();
    XLSX.utils.sheet_add_aoa(ws, [header]);
    XLSX.utils.sheet_add_json(ws, dataList, { origin: "A2", skipHeader: true });
    const wb = { Sheets: { dataList: ws }, SheetNames: ["dataList"] };
    const excelBuffer = XLSX.write(wb, {
      bookType: "xlsx",
      type: "array",
      cellStyles: true,
    });
    const finalData = new Blob([excelBuffer], { type: "object" });
    FileSaver.saveAs(finalData, "Data.xlsx");
  };
  return (
    <Button
      className="export mr-2"
      variant="primary"
      onClick={handleExportData}
      size="lg"
      active
      disabled={apiData.length === 0}
    >
      Export
    </Button>
  );
};

export default ProductExport;
