import React, { useEffect } from "react";
import { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import axios from "../axios";

function Tables(props) {
  const { updateButton, deleteElement, list, addButton } = props.data;
  const [checkedState, setCheckedState] = useState(new Array(10).fill(false));
  const [dataToSend, setDataToSend] = useState([]);

  useEffect(() => {
    console.log(dataToSend);
  }, [dataToSend]);

  const sendEmail = async () => {
    const config = {
      headers: {
        contentType: "application/json",
      },
    };

    try {
      const { data } = await axios.post(
        `api/data/sendemail`,
        dataToSend,
        config
      );
      console.log(data);
    } catch (error) {
      console.log("Can't send the mail");
    }
  };

  const handleOnChange = (position) => {
    const updatedCheckedState = checkedState.map((item, index) =>
      index === position ? !item : item
    );

    setCheckedState(updatedCheckedState);

    const DemoDataToSend = [];
    for (var i = 0; i < list.length; i++) {
      if (updatedCheckedState[i]) {
        DemoDataToSend.push(list[i]);
      }
    }
    setDataToSend(DemoDataToSend);
  };

  return (
    <div>
      <Button
        variant="outlined"
        onClick={() => {
          addButton();
        }}
      >
        Add Item
      </Button>
      <Button
        variant="outlined"
        onClick={() => {
          sendEmail();
        }}
      >
        Send Email
      </Button>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Select Row</TableCell>
              <TableCell>Username</TableCell>
              <TableCell align="right">Email</TableCell>
              <TableCell align="right">Phone No.</TableCell>
              <TableCell align="right">Hobbies</TableCell>
              <TableCell align="right">Update</TableCell>
              <TableCell align="right">Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {list.map((row, index) => (
              <TableRow
                key={index}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell>
                  <input
                    type="checkbox"
                    id={`custom-checkbox-${index}`}
                    checked={checkedState[index]}
                    onChange={() => handleOnChange(index)}
                  />
                </TableCell>
                <TableCell align="left">{row.username}</TableCell>
                <TableCell align="right">{row.email}</TableCell>
                <TableCell align="right">{row.phone}</TableCell>
                <TableCell align="right">{row.hobbies}</TableCell>
                <TableCell align="right">
                  <Button variant="outlined" onClick={() => updateButton(row)}>
                    Update
                  </Button>
                </TableCell>
                <TableCell align="right">
                  <Button
                    variant="outlined"
                    onClick={() => deleteElement(row._id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default Tables;
