import {
  Grid,
  TextField,
  Button,
  Card,
  CardContent,
  Typography,
} from "@mui/material";
import axios from "../axios";
import { useEffect, useState } from "react";

function Form(props) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [hobby, setHobby] = useState("");

  const { setList, list, add, setAdd, update, setUpdate, value } = props.data;

  useEffect(() => {
    if (update) {
      setName(value.username);
      setPhone(value.phone);
      setEmail(value.email);
      setHobby(value.hobbies);
    }
  }, [update, value]);

  const saveValue = async (e) => {
    e.preventDefault();

    const config = {
      headers: {
        contentType: "application/json",
      },
    };

    try {
      if (add) {
        const { data } = await axios.post(
          "/api/data/addelement",
          { username: name, phone: phone, email: email, hobbies: hobby },
          config
        );
        setList(list.concat(data));
        setAdd(!add);
      } else {
        await axios.post(
          `api/data/editelement/${value._id}`,
          { username: name, phone: phone, email: email, hobbies: hobby },
          config
        );
        const index = list.findIndex((element) => element._id === value._id);
        list[index].element = {
          username: name,
          phone: phone,
          email: email,
          hobbies: hobby,
        };
        setList(list);
        setUpdate(!update);
      }
    } catch (error) {
      if (add) {
        console.log(error);
        console.log("Can't add the element");
      } else {
        console.log("Can't update the element");
      }
    }
  };

  return (
    <div>
      <Grid>
        <Card style={{ maxWidth: 450, padding: "20px 5px", margin: "0 auto" }}>
          <CardContent>
            <Typography gutterBottom variant="h5">
              Form
            </Typography>
            <Typography
              variant="body2"
              color="textSecondary"
              component="p"
              gutterBottom
            >
              Please kindly fill the details of the user
            </Typography>
            <form onSubmit={saveValue}>
              <Grid container spacing={1}>
                <Grid xs={12} item>
                  <TextField
                    placeholder="Enter first name"
                    label="UserName"
                    variant="outlined"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    fullWidth
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    type="email"
                    placeholder="Enter email"
                    label="Email"
                    variant="outlined"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    fullWidth
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    type="number"
                    placeholder="Enter phone number"
                    label="Phone"
                    variant="outlined"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    fullWidth
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Hobby"
                    multiline
                    minRows={4}
                    placeholder="Type your hobbies here"
                    variant="outlined"
                    value={hobby}
                    onChange={(e) => setHobby(e.target.value)}
                    fullWidth
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                  >
                    {add ? "Add" : "Update"}
                  </Button>
                </Grid>
              </Grid>
            </form>
          </CardContent>
        </Card>
      </Grid>
    </div>
  );
}

export default Form;
