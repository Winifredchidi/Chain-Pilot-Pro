const { getNarrativeSignals } = require("./signals");
const { decideAction } = require("./strategy");
const { getQuote } = require("./lifi");

async function runAgent() {
  const currentChain = "base";

  console.log("ChainPilot Agent Running...\n");

  const signals = await getNarrativeSignals();

  console.log("Scanning narratives...\n");

  signals.forEach((s) => {
    console.log(`${s.narrative} narrative score: ${s.score} on ${s.chain}`);
  });

  const decision = decideAction(currentChain, signals);

  console.log("\nAgent Decision:", decision);

  if (decision.move) {
    const targetChain = decision.target.toLowerCase();

    console.log(`\nChosen chain: ${decision.target}`);
    console.log(`Moving capital from ${currentChain} to ${targetChain}`);
    console.log("\nFetching route from LI.FI...\n");

    try {
      const route = await getQuote(currentChain, targetChain);

      console.log("Route received from LI.FI");
      console.log("From chain:", route.action.fromChainId);
      console.log("To chain:", route.action.toChainId);
      console.log("From token:", route.action.fromToken.symbol);
      console.log("To token:", route.action.toToken.symbol);
      console.log("Estimated to amount:", route.estimate.toAmount);
      console.log("Tool:", route.tool);
      console.log("Transaction ready:", !!route.transactionRequest);
    } catch (error) {
      console.log("LI.FI quote request failed.");
      console.log("Reason:", error.message);
      console.log("Agent decision logic still completed successfully.");
    }
  } else {
    console.log("No better chain found");
  }
}

runAgent();