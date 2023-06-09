import { ChangeEvent } from "react";
import * as XLSX from "xlsx";

export const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
  let sheetData: Array<any> = [];
  if (e.target.files) {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (evt: ProgressEvent<FileReader>) => {
      if (evt.target) {
        const bstr = evt.target.result as string;
        const wb = XLSX.read(bstr, { type: "binary" });
        const wsname = wb.SheetNames[0];
        const ws = wb.Sheets[wsname];

        sheetData = XLSX.utils.sheet_to_json(ws, { header: 1 });
        console.log(typeof sheetData);
      }
    };

    reader.readAsBinaryString(file);
    return sheetData;
  }
};
