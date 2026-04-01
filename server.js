const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

/* =========================
   🤖 AGENT LOGIC
========================= */
function runAgentLogic() {
  const aiScore = Math.floor(Math.random() * 100);
  const defiScore = Math.floor(Math.random() * 100);
  const memecoinScore = Math.floor(Math.random() * 100);

  let decision = "Base";
  let reason = "AI narrative strongest";
  let confidence = aiScore;

  if (defiScore > aiScore && defiScore > memecoinScore) {
    decision = "Polygon";
    reason = "DeFi narrative strongest";
    confidence = defiScore;
  }

  if (memecoinScore > aiScore && memecoinScore > defiScore) {
    decision = "Arbitrum";
    reason = "Memecoin momentum high";
    confidence = memecoinScore;
  }

  return {
    aiScore,
    defiScore,
    memecoinScore,
    decision,
    reason,
    confidence,
    current: "Base"
  };
}

/* =========================
   🔗 LI.FI QUOTE (ETH VERSION — SAFE)
========================= */
let lastCallTime = 0;

async function getQuote(fromChain, toChain) {
  try {
    const now = Date.now();

    // 🛑 RATE LIMIT PROTECTION (10 seconds)
    if (now - lastCallTime < 10000) {
      throw new Error("Rate limit protection");
    }

    lastCallTime = now;

    const res = await axios.get("https://li.quest/v1/quote", {
      params: {
        fromChain,
        toChain,

        // ✅ USE NATIVE TOKEN (NO ADDRESS ISSUES)
        fromToken: "ETH",
        toToken: "ETH",

        fromAmount: "1000000000000000", // 0.001 ETH

        fromAddress: "0x000000000000000000000000000000000000dead",

        slippage: 0.005
      }
    });

    return res.data;
  } catch (err) {
    console.error("LI.FI ERROR:", err.response?.data || err.message);
    throw err;
  }
}

/* =========================
   🚀 MAIN API
========================= */
app.get("/agent-data", async (req, res) => {
  try {
    const agent = runAgentLogic();

    let route = null;

    try {
      const chainMap = {
        Base: 8453,
        Arbitrum: 42161,
        Polygon: 137
      };

      const fromChain = chainMap["Base"];
      const toChain = chainMap[agent.decision];

      const quote = await getQuote(fromChain, toChain);

      route = {
        from: "Base",
        to: agent.decision,
        expected: quote?.estimate?.toAmount || 0,
        tool: quote?.tool || "LI.FI",
        tx: quote?.transactionRequest || null
      };

    } catch (err) {
      console.log("⚠️ Using simulation mode");

      route = {
        from: "Base",
        to: agent.decision,
        expected: Math.floor(Math.random() * 1000000000000000),
        tool: "Simulation",
        tx: null
      };
    }

    res.json({
      ...agent,
      route
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* =========================
   🟢 START SERVER
========================= */
app.listen(PORT, () => {
  console.log(`Agent API running on http://localhost:${PORT}`);
});