import React, { ChangeEvent, useState } from "react";
import "./App.css";
import * as XLSX from "xlsx";

const App: React.FC = () => {
  const [data, setData] = useState<any[]>([]);

  const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (evt: ProgressEvent<FileReader>) => {
        if (evt.target) {
          const bstr = evt.target.result as string;
          const wb = XLSX.read(bstr, { type: "binary" });
          const wsname = wb.SheetNames[0];
          const ws = wb.Sheets[wsname];

          const sheetData = XLSX.utils.sheet_to_json(ws, { header: 1 });
          setData(sheetData);

          console.log(sheetData);
        }
      };

      reader.readAsBinaryString(file);
    }
  };

  return (
    <div className="App">
      <input type="file" onChange={handleFileUpload} />
      <table>
        {/* <thead>
          <tr>
            <th>Item No</th>
            <th>Item Name</th>
            <th>Item Description</th>
            <th>Item Price</th>
            <th>Item Image</th>
          </tr>
        </thead> */}
        <tbody>
          {data.map((row, index) => (
            <tr key={index}>
              <td>{row[0]}</td>
              <td>{row[1]}</td>
              <td>{row[2]}</td>
              <td>{row[3]}</td>
              <td>{row[4]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default App;
