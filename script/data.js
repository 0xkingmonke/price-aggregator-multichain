let tokenJson;
let tokenList;

async function getLocalJsonData() {
    tokenJson = await axios.get('./topTokenWithPlatform.json').then(res=>res.data)
    tokenList = Object.keys(tokenJson)
}

// tokenJson =  "Ethereum": {
//     "id": "ethereum",
//     "symbol": "eth",
//     "image": "https://assets.coingecko.com/coins/images/279/large/ethereum.png?1595348880",
//     "platforms": {
//         "ethereum": "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
//         "optimistic-ethereum": "0x4200000000000000000000000000000000000006",
//         "arbitrum-one": "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
//         "avalanche": "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
//         "binance-smart-chain": "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
//         "polygon-pos": "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee"
//     }