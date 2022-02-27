let tokenJson = {
    ethereum:'',
    tether:'',
    'usd-coin':'',
    dai:'',
    nusd:'',
    'liquity-usd':'',
    binancecoin:'',
    'avalanche-2':'',
    'shiba-inu':'',
    'wrapped-bitcoin':'',
    "matic-network":'',
    'pancakeswap-token':'',
}

let tokenList = Object.keys(tokenJson).sort()

getTokenId = async () => {
    let requestUrl = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false'
    rawData = await axios.get(requestUrl).then(res => res.data)
    rawData = rawData.map(res => res.id)
}

getTokenId()