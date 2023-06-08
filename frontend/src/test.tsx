import React, { ChangeEvent, useState } from "react";
import "./App.css";
import * as XLSX from "xlsx";

// interface Item {
//   [key: string]: string | number;
// }

// interface SubCategory {
//   subCategory: string;
//   items: Item[];
// }

// interface Category {
//   category: string;
//   subCategories: SubCategory[];
// }

interface Item {
  itemNo: string;
  description: string;
  unit: string;
  qty: string | number;
  rate: string | number;
  amount: string | number;
}

interface SubCategory {
  name: string;
  items: Item[];
}

interface Category {
  name: string;
  subCategories: SubCategory[];
}

const App: React.FC = () => {
  // const [data, setData] = useState<Category[]>([]);

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

          const categories: Category[] = [];
          let column: (string | number)[] = [];

          // let currentCategory: Category | null = null;
          // let currentSubCategory: SubCategory | null = null;

          for (const row of sheetData as (string | number)[][]) {
            // console.log(row);
            if (row.length === 0) {
              continue;
            }

            if (row[0] === "Item No ") {
              column = row;
              console.log(column);
              continue;
            }
            console.log(row[1]);
            if ((row[1] as string)?.startsWith("A." || " A.")) {
              const category: Category = {
                name: row[1] as string,
                subCategories: [],
              };
              categories.push(category);
              // console.log(category);
              continue;
            }
          }
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

// [1]
// [1.1]
// [1.1.1, a,b,c]
// [1.1.2, a,b,c]
// [1.1.3, a,b,c]

// [1]
// [1.1]
// [1.1.1, a,b,c]
// [1.1.2, a,b,c]
// [1.1.3, a,b,c]

// {
//   category: 1,
//   subCategories: [
//     {
//       subCategory: 1.1,
//       items: [
//         {
//           item: 1.1.1,
//           a: a,
//           b: b,
//           c: c
//         },
//         {
//           item: 1.1.2,
//           a: a,
//           b: b,
//           c: c
//         },
//         {
//           item: 1.1.3,
//           a: a,
//           b: b,
//           c: c

// }

// ['Item No ', 'Description', 'Unit ', 'Qty ', 'Rate ', 'Amount ']
// [empty, ' A. Substructure']
// [empty, '1. Excavation and Earth Works ']
// [1.1, 'Clearing of Ordinary Soil, Root and a made up Grou…average depth of 20 cm from natural ground level ', 'm2', 840, 18, 15120]
// [1.2, 'Bulk excavation in an ordinary soil  to a depth not exceeding  150 cm from  Cleared Level', 'm3', 1247.085, 122, 152144.37]
// [1.3, 'Ditto item No. 1.2.  but  exceeding 150 cm But not exceeding 300 cm from Cleared Level', 'm3', 1247.085, 122, 152144.37]
// [1.4, 'Ditto item No. 1.2.  but exceeding 300 cm but not exceeding 525 cm from cleared level', 'm3', 872.9594999999999, 218, 190305.17099999997]
// [1.5, 'Excavation in weathered rock with different depth', 'm3', '-', 701, '-']
// [1.6, 'Ditto but in a Strong Basaltic rock of different depth', 'm3', '-', 701, '-']
