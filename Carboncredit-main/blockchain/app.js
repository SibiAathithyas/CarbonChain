require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { ethers } = require("ethers");
const abi = require("./abi/abi.json");

const app = express();
app.use(cors());
app.use(express.json());

/* ============================================================
   🔗 BLOCKCHAIN CONFIG
   ============================================================ */

const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS;

const provider = new ethers.JsonRpcProvider(
  process.env.RPC_URL
);

const wallet = new ethers.Wallet(
  process.env.PRIVATE_KEY,
  provider
);

const contract = new ethers.Contract(
  CONTRACT_ADDRESS,
  abi,
  wallet
);

/* ============================================================
   🧪 HEALTH CHECK
   ============================================================ */

app.get("/", (req, res) => {
  res.send("CarbonChain Blockchain API Running ✅");
});

/* ============================================================
   ⛓️ STORE SENSOR DATA ON BLOCKCHAIN
   ============================================================ */

app.post("/store", async (req, res) => {
  try {
    const { gas, dust, status } = req.body;

    console.log("⛓️ Writing to blockchain...");

    const tx = await contract.addRecord(
      Number(gas),
      Number(dust),
      String(status)
    );

    await tx.wait();

    console.log("✅ Stored:", tx.hash);

    res.json({
      success: true,
      hash: tx.hash
    });

  } catch (error) {
    console.error("❌ Blockchain write error:", error);

    res.status(500).json({
      error: error.reason || error.message
    });
  }
});

/* ============================================================
   📊 GET TOTAL RECORD COUNT
   ============================================================ */

app.get("/count", async (req, res) => {
  try {
    const count = await contract.getRecordCount();

    res.json({
      count: Number(count)
    });

  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
});

/* ============================================================
   📖 READ SINGLE RECORD (SAFE)
   ============================================================ */

app.get("/records/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);

    const total = await contract.getRecordCount();

    if (id >= total) {
      return res.status(404).json({
        error: "Record does not exist"
      });
    }

    const record = await contract.getRecord(id);

    res.json({
      timestamp: Number(record.timestamp),
      gas: Number(record.gas),
      dust: Number(record.dust),
      status: record.status
    });

  } catch (error) {
    console.error("❌ Read error:", error);

    res.status(500).json({
      error: error.reason || error.message
    });
  }
});

/* ============================================================
   📚 READ ALL RECORDS (LEDGER FEED)
   ============================================================ */

app.get("/ledger", async (req, res) => {
  try {
    const total = await contract.getRecordCount();

    const records = [];

    for (let i = 0; i < total; i++) {
      const r = await contract.getRecord(i);

      records.push({
        id: i,
        timestamp: Number(r.timestamp),
        gas: Number(r.gas),
        dust: Number(r.dust),
        status: r.status
      });
    }

    res.json(records);

  } catch (error) {
    console.error("❌ Ledger fetch error:", error);

    res.status(500).json({
      error: error.reason || error.message
    });
  }
});

/* ============================================================
   🚀 START SERVER
   ============================================================ */

const PORT = 6000;

app.listen(PORT, () => {
  console.log(
    `🚀 Blockchain service running → http://localhost:${PORT}`
  );
});
