
ChainPilot is an autonomous cross-chain agent built using the LI.FI API. It scans narrative signals across multiple blockchain ecosystems, decides where capital should move, and uses LI.FI to fetch the optimal cross-chain execution route.

This project explores how autonomous agents can act as decision engines for coordinating capital movement across blockchain networks.

---

# Overview

Liquidity and opportunities in Web3 are fragmented across different chains. Users often need to manually bridge assets and search for opportunities across ecosystems.

ChainPilot demonstrates a simple approach to solving this problem using an autonomous agent that:

1. Scans narrative signals across multiple chains
2. Evaluates which chain currently has the strongest opportunity
3. Makes a decision on where capital should move
4. Uses LI.FI to fetch the cross-chain route required for execution

---

# How It Works

The agent follows a simple execution loop:

```
Scan signals → Evaluate opportunities → Decide target chain → Fetch route via LI.FI
```

Example flow:

1. The agent scans signals across:

   * Base
   * Arbitrum
   * Polygon

2. Each narrative receives a score.

3. The agent selects the strongest opportunity.

4. The LI.FI API is called to fetch the cross-chain execution route.

5. LI.FI returns the routing details and transaction request required to perform the transfer.

---

# Project Structure

```
chain-pilot
│
├ agent.js        # Main agent execution loop
├ signals.js      # Generates narrative signals
├ strategy.js     # Decision logic for choosing target chain
├ lifi.js         # LI.FI API integration
├ config.js       # Chain configuration
├ wallet.js       # Transaction execution placeholder
├ package.json
└ README.md
```

---

# Installation

Clone the repository:

```
git clone https://github.com/winichidi/chain-pilot.git
cd chain-pilot
```

Install dependencies:

```
npm install
```

# Running the Agent

Start the agent with:

```
node agent.js
```

Example output:

```
Scanning narratives...

Memecoin narrative score: 99 on Arbitrum
AI narrative score: 59 on Base
DeFi narrative score: 45 on Polygon

Agent Decision: { move: true, target: 'Arbitrum' }

Fetching route from LI.FI...

Route received from LI.FI
```

# LI.FI Integration

ChainPilot integrates with the LI.FI API to retrieve cross-chain routing information.

The agent sends a quote request to LI.FI including:

* source chain
* destination chain
* token addresses
* transfer amount

LI.FI returns:

the optimal route
bridge/tool used
estimated output amount
transaction request required for execution

# Future Improvements

Possible future extensions include:

Real-time market data feeds
Automated transaction signing
Scheduled execution cycles
Portfolio management strategies
Web dashboard for monitoring the agent

# Demo

This project was built as a prototype demonstrating how autonomous agents can use LI.FI as an execution layer for cross-chain strategies.


# Tech Stack

Node.js
LI.FI API
Axios


# License

MIT License

