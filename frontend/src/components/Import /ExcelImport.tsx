import React, { useCallback, useMemo, useState } from "react";
import { useDropzone } from "react-dropzone";
import * as XLSX from "xlsx";

interface FileInputProps {
  onChange: (data: any[][]) => void;
}

const FileInput: React.FC<FileInputProps> = ({ onChange }) => {
  const [data, setData] = useState<any[][]>([]);
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
        // setData(sheetData);
        // onChange(sheetData);
      }
    };
    reader.readAsBinaryString(file);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    //     accept:[
    //     "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", // .xlsx
    //     "application/vnd.ms-excel", // .xls
    //   ],
    multiple: false,
  });

  const hasData = useMemo(() => data.length > 0, [data]);

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      <p>
        {isDragActive
          ? "Drop the file here"
          : "Drag and drop a file here or click to select a file"}
      </p>
      {hasData && (
        <div>
          <h4>Uploaded Data:</h4>
          <ul>
            {data.map((row, idx) => (
              <li key={idx}>{row.join(", ")}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default FileInput;
