import React, { ChangeEvent, useState } from "react";
import "./App.css";
import * as XLSX from "xlsx";

interface Item {
  [key: string]: string | number;
}

interface SubCategory {
  subCategory: string;
  items: Item[];
}

interface Category {
  category: string;
  subCategories: SubCategory[];
}

const App: React.FC = () => {
  const [data, setData] = useState<Category[]>([]);

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
          const jsonData: Category[] = [];
          let currentCategory = "";
          let currentSubCategory = "";
          let headers: string[] = [];
          console.log(sheetData);
          console.log("sheetData");

          for (let i = 0; i < sheetData.length; i++) {
            console.log(sheetData[i]);
            // console.log("sheetData[i]");
            const row: (string | number)[] = sheetData[i];

            if (
              row[1] &&
              ((row[1] as string)?.startsWith("A.") ||
                (row[1] as string)?.startsWith("B."))
            ) {
              currentCategory = row[0] as string;
              jsonData.push({ category: currentCategory, subCategories: [] });
            } else if (row[1]) {
              currentSubCategory = row[1] as string;

              // Check if the last element in jsonData exists before pushing to its subCategories
              if (jsonData[jsonData.length - 1]) {
                jsonData[jsonData.length - 1].subCategories.push({
                  subCategory: currentSubCategory,
                  items: [],
                });
              }

              headers = row.slice(2) as string[]; // Store headers for items
            } else if (row[2]) {
              const item: Item = {};
              headers.forEach((header, index) => {
                item[header] = row[index + 2];
              });

              // Check if the last element in jsonData and its subCategories exist before pushing the item
              if (
                jsonData[jsonData.length - 1] &&
                jsonData[jsonData.length - 1].subCategories[
                  jsonData[jsonData.length - 1].subCategories.length - 1
                ]
              ) {
                jsonData[jsonData.length - 1].subCategories[
                  jsonData[jsonData.length - 1].subCategories.length - 1
                ].items.push(item);
              }
            }
            console.log("jsonData");

            console.log(jsonData);
            console.log("ooooooooo");
          }

          setData(jsonData);
          // console.log(jsonData);
        }
      };
      reader.readAsBinaryString(file);
    }
  };

  return (
    <>
      <input type="file" onChange={handleFileUpload} />
    </>
  );
};

export default App;



1 

1.1 

1.1.1 

1.1.2 

1.1.3

1.2

1.2.1

1.2.2

1.2.3
