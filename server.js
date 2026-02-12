const { SerialPort } = require('serialport');
const { ReadlineParser } = require('@serialport/parser-readline');
const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Temporary in-memory storage
let latestSensorData = {
  gas: 0,
  dust: 0,
  airQuality: "UNKNOWN",
  timestamp: new Date()
};
const port = new SerialPort({
  path: 'COM4', // ⚠️ CHANGE if your ESP32 uses different COM
  baudRate: 115200
});

const parser = port.pipe(new ReadlineParser({ delimiter: '\n' }));

parser.on('data', (line) => {
  try {
    const data = JSON.parse(line.trim());
    latestSensorData = {
      ...data,
      timestamp: new Date()
    };
    console.log("Received from ESP32:", latestSensorData);
  } catch (err) {
    console.log("Invalid serial data:", line);
  }
});


// Receive sensor data
app.post("/api/sensor-data", (req, res) => {
  const { gas, dust, airQuality } = req.body;

  if (gas === undefined || dust === undefined || !airQuality) {
    return res.status(400).json({ message: "Invalid data" });
  }

  latestSensorData = {
    gas,
    dust,
    airQuality,
    timestamp: new Date()
  };

  console.log("Received Sensor Data:", latestSensorData);
  res.json({ message: "Data received successfully" });
});

// Send latest data to frontend
app.get("/api/latest", (req, res) => {
  res.json(latestSensorData);
});

app.listen(PORT, () => {
  console.log(`Backend running at http://localhost:${PORT}`);
});
