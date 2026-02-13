import express from "express";
import { ReadlineParser, SerialPort } from "serialport";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const app = express();
const port = new SerialPort({ path: "/dev/ttyUSB0", baudRate: 9600 });
const parser = port.pipe(new ReadlineParser({ delimiter: "\n" }));
const __dirname = dirname(fileURLToPath(import.meta.url));

parser.on("data", console.log);

app.get("/led/:state", (req, res) => {
  const state = req.params.state.toUpperCase();
  if (state === "ON" || state === "OFF") {
    port.write(state + `\n`);
    res.send(`LED turned ${state}`);
  } else {
    res.send(400).send("invalid state");
  }
});

app.get("/", (req, res) => {
  res.sendFile(join(__dirname, "/index.html"));
});

app.listen(3000, () => console.log("Server running on http://localhost:3000"));
