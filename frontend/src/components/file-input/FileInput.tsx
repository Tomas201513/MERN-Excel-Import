import React, { useCallback, useContext, useState } from "react";
import { useDropzone } from "react-dropzone";
import * as XLSX from "xlsx";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import ExcellContext from "../../context/ExcelContext";
interface FileInputProps {
  onChange: (data: any[][]) => void;
}

const FileInput: React.FC<FileInputProps> = ({ onChange }) => {
  const { data, setData } = useContext(ExcellContext);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    const reader = new FileReader();
    reader.onload = (evt: ProgressEvent<FileReader>) => {
      if (evt.target) {
        const bstr = evt.target.result as string;
        const wb = XLSX.read(bstr, { type: "binary" });
        const wsname = wb.SheetNames[0];
        const ws = wb.Sheets[wsname];

        const sheetData = XLSX.utils.sheet_to_json(ws, { header: 1 });

        console.log(sheetData);
        setData(sheetData as any[][]);
        console.log("dataaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
        console.log(data);
      }
    };
    reader.readAsBinaryString(file);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: [
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", // .xlsx
      "application/vnd.ms-excel", // .xls
    ],
    multiple: false,
  });

  return (
    <>
      <Box
        {...getRootProps()}
        sx={{ border: "1px dashed", padding: 5, backgroundColor: "#d6f4fe" }}
      >
        <input {...getInputProps()} />
        <Typography align="center">
          {isDragActive
            ? "Drop the file here"
            : "Drag and drop a file here or click to select a file"}
        </Typography>
      </Box>
      {/* {data} */}
    </>
  );
};

export default FileInput;
