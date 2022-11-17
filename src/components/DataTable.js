import * as React from "react";
// import Button from "@material-ui/core/Button";
import Form from "./Form";
import Tables from "./Tables";
import axios from "../axios";

export default function DataTable() {
  const [list, setList] = React.useState([]);
  const [add, setAdd] = React.useState(false);
  const [update, setUpdate] = React.useState(false);
  const [value, setValue] = React.useState({});

  React.useEffect(() => {
    const fetchData = async () => {
      const config = {
        headers: {
          contentType: "application/json",
        },
      };

      try {
        const data = await axios.get("/api/data/getdata", config);
        setList(data.data);
      } catch (error) {
        console.log("Can't access the data");
      }
    };
    fetchData();
  }, [update, add]);

  const deleteElement = async (id) => {
    const config = {
      headers: {
        contentType: "application/json",
      },
    };
    try {
      await axios.post(`api/data/deleteelement/${id}`, config);
      const newList = list.filter((element) => {
        return element._id !== id;
      });
      setList(newList);
    } catch (error) {
      console.log("Can't delete this item");
    }
  };

  const addButton = async () => {
    setAdd(!add);
  };

  const updateButton = async (val) => {
    setValue(val);
    setUpdate(!update);
  };

  return (
    <div>
      {(add || update) && (
        <Form data={{ setList, list, add, setAdd, update, setUpdate, value }} />
      )}
      <Tables
        data={{ updateButton, deleteElement, list, setList, addButton }}
      />
    </div>
  );
}
