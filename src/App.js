import React, { useState, useEffect } from "react";
import { Paper, Grid, TextField, Button } from "@material-ui/core";
import { SendRounded } from "@material-ui/icons";
import io from "socket.io-client";
import "./App.css";
const { REACT_APP_NOT_SOCKET_CONNECTION_URL } = process.env
const socket = io.connect(REACT_APP_NOT_SOCKET_CONNECTION_URL);

function App() {
  const [name] = useState("najish");
  const [chat, setChat] = useState([]);
  const [message, setMessage] = useState("");
  const renderChat = () => {
    return chat.map(({ name, message }, index) => (
      <div key={index}>
        <h3>
          {name}: {message}
        </h3>
      </div>
    ));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    socket.emit("message", { name, message });
  };
  useEffect(() => {
    socket.on("message", ({ name, message }) => {
      setChat([...chat, { name, message }]);
    });
  });
  return (
    <Grid
      container
      direction="column"
      justify="center"
      alignItems="center"
      style={{ height: "100vh" }}
    >
      <Paper elevation={3} style={{ padding: "20px", margin: "10px" }}>
        {renderChat()}
      </Paper>
      <Paper elevation={3} style={{ padding: "20px", margin: "10px" }}>
        <form onSubmit={handleSubmit} autoComplete="off">
          <TextField
            multiline
            rowsMax={4}
            varient="filled"
            label="Lets chat - type to chat"
            onChange={(e) => setMessage(e.target.value)}
          />
          <Button variant="contained" color="primary" type="submit">
            <SendRounded />
          </Button>
        </form>
      </Paper>
    </Grid>
  );
}

export default App;
