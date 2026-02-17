const { SerialPort } = require("serialport");
const { ReadlineParser } = require("@serialport/parser-readline");

const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

/* ---------------------------------------
   In-Memory Sensor Store
---------------------------------------- */
let latestSensorData = {
  gas: 0,
  dust: 0,
  airQuality: "UNKNOWN",
  timestamp: new Date()
};

/* ---------------------------------------
   Air Quality Classifier
---------------------------------------- */
function classify(gas, dust) {

  if (gas < 200 && dust < 200) return "Normal";
  if (gas < 400 && dust < 400) return "Warning";
  return "Violation";
}

/* ---------------------------------------
   Serial Connection (Arduino)
---------------------------------------- */
const port = new SerialPort({
  path: "COM3",          // 🔁 Change if needed
  baudRate: 9600
});

const parser = port.pipe(
  new ReadlineParser({ delimiter: "\n" })
);

parser.on("data", (line) => {

  console.log("RAW:", line);

  try {
    const data = JSON.parse(line.trim());

    latestSensorData = {
      gas: data.gas || 0,
      dust: data.dust || 0,
      airQuality: classify(
        data.gas,
        data.dust
      ),
      timestamp: new Date()
    };

    console.log(
      "📡 Arduino Data:",
      latestSensorData
    );

  } catch {
    console.log("⚠️ Invalid JSON");
  }
});

port.on("error", err => {
  console.error("Serial Error:", err.message);
});

/* ---------------------------------------
   API Routes
---------------------------------------- */

// Health
app.get("/", (req, res) => {
  res.send("Arduino Backend Running ✅");
});

// Latest telemetry
app.get("/api/latest", (req, res) => {
  res.json(latestSensorData);
});

/* ---------------------------------------
   Start Server
---------------------------------------- */
app.listen(PORT, () => {
  console.log(
    `🚀 Server running → http://localhost:${PORT}`
  );
});
