BASE_URL = "https://api.1inch.io/v4.0/"

// https://api.1inch.io/v4.0/1/quote?fromTokenAddress=&toTokenAddress=&amount=
chainID ={
    "ethereum": "1",
    "binance-smart-chain": "56",
    "polygon-pos": "137",
    "optimistic-ethereum": "10",
    "arbitrum-one": "42161",
    "avalanche": "43114"
}

specialTokenDecimal = {   //self-curated list of tokens with different decimal
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
    console.log(commonPlatforms)
    return commonPlatforms
}

function convertAmountToDecimals(token,amount) {
    if (specialTokenDecimal.hasOwnProperty(token)){
        decimalString = '0'.repeat(specialTokenDecimal[token])
    } else {
        decimalString = '0'.repeat(18)
    }
    amountInString = `${amount}${decimalString}`
    return amountInString
}

async function getDataByChain(chainAddress, addressTokenA, addressTokenB, amountInString) {
    data = await axios.get(`${BASE_URL}${chainAddress}/quote?fromTokenAddress=${addressTokenA}&toTokenAddress=${addressTokenB}&amount=${amountInString}`).then(res => res.data)
    return data
}

async function checkQuotes(tokenA, tokenB, amount) {
    commonPlatforms = checkPlatforms(tokenA, tokenB)
    promiseList = []
    for(let chainName of commonPlatforms) {
        chainAddress = chainID[chainName]
        addressTokenA = tokenJson[tokenA]['platforms'][chainName]
        addressTokenB = tokenJson[tokenB]['platforms'][chainName]
        amountInString = convertAmountToDecimals(tokenA,amount)
        promiseList.push(getDataByChain(chainAddress, addressTokenA, addressTokenB, amountInString))
    }
    routeList = await Promise.all(promiseList).then(values => values)
    for (route of routeList) {
        childElement = document.createElement('div')
        childElement.innerHTML = `${JSON.stringify(route)}`
        document.querySelector('#show-routes').appendChild(childElement)
    }
}