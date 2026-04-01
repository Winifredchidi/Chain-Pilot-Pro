function decideAction(currentChain,signals){

const best = signals[0]

if(best.chain.toLowerCase() !== currentChain){

return { move:true, target:best.chain }

}

return { move:false }

}

module.exports = { decideAction }