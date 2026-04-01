async function getNarrativeSignals(){

const signals = [

{ narrative:"AI", chain:"Base", score:Math.floor(Math.random()*100) },
{ narrative:"Memecoin", chain:"Arbitrum", score:Math.floor(Math.random()*100) },
{ narrative:"DeFi", chain:"Polygon", score:Math.floor(Math.random()*100) }

]

return signals.sort((a,b)=>b.score-a.score)

}

module.exports = { getNarrativeSignals }