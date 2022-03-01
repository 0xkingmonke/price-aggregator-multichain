BASE_URL = "https://api.1inch.io/v4.0/"

chainID ={
    "ethereum": "1",
    "binance-smart-chain": "56",
    "polygon-pos": "137",
    "optimistic-ethereum": "10",
    "arbitrum-one": "42161",
    "avalanche": "43114"
}

tokenDecimal = {   //self-curated list of tokens with different decimal
    "USD Coin":6,
    "Tether":6,
    "Dogecoin":8,
    "Cronos":8,
    "Wrapped Bitcoin": 8,
    "cETH":8,
    "cDAI":8,
    "KuCoin Token":6
}

function checkPlatforms(tokenA, tokenB) {
    commonPlatforms = []
    for (let itemA in tokenJson[tokenA]['platforms']) {
        for (let itemB in tokenJson[tokenB]['platforms']) {
            if (itemA == itemB) commonPlatforms.push(itemA) 
        }
    }
    return commonPlatforms
}


function checkQuotes(tokenA, tokenB, amount) {
    commonPlatforms = checkPlatforms(tokenA, tokenB)
    for(let chainName of commonPlatforms) {
        chainAddress = chainID[chainName]
        addressTokenA = tokenJson[tokenA]['platforms'][chainName]
        addressTokenB = tokenJson[tokenB]['platforms'][chainName]

        console.log(`${chainName} tokenA: ${addressTokenA}, tokenB: ${addressTokenB}`)
    }
}