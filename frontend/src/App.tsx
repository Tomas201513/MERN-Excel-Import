import React, { ChangeEvent, useState } from "react";
import "./App.css";
import * as XLSX from "xlsx";
import {
  Typography,
  Box,
  Input,
  Button,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

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
      <Typography variant="h4" gutterBottom>
        Import Excel
      </Typography>
      <Box sx={{ display: "flex", JustifyContent: "center", Space: 2 }}>
        <Input type="file" onChange={handleFileUpload} />
        <Box sx={{ flexGrow: 1 }} />
        <Button variant="contained" color="primary" sx={{ ml: 2 }}>
          Commit to DB
        </Button>
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Item No</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Subcategory</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Unit</TableCell>
              <TableCell>Qty</TableCell>
              <TableCell>Rate</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((item, index) => (
              <TableRow key={index}>
                <TableCell>{item["Item No"]}</TableCell>
                <TableCell>{item["Description"]["catagory"]}</TableCell>
                <TableCell>{item["Description"]["subcatagory"]}</TableCell>
                <TableCell>{item["Description"]["description"]}</TableCell>
                <TableCell>{item["Unit"]}</TableCell>
                <TableCell>{item["Qty"]}</TableCell>
                <TableCell>{item["Rate"]}</TableCell>
                <TableCell>{item["Amount"]}</TableCell>
                <TableCell sx={{ display: "flex" }}>
                  <IconButton color="primary">
                    <EditIcon />
                  </IconButton>
                  <IconButton color="error">
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default App;
