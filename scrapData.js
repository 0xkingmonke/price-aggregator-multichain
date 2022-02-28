const axios = require('axios')
const fs = require('fs')




const fetchTopTokens = async () => { // 1. Fetch data for top 100 tokens
    let requestUrl = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false'
    topTokens = await axios.get(requestUrl).then(res => res.data)
    fs.writeFileSync('topTokens.json', JSON.stringify(topTokens))
    newJson = {}
    for(let item of topTokens) {
        let {id, symbol, image} = item
        newJson[item.name] = {id, symbol, image}
    }
    fs.writeFileSync('newData.json' ,JSON.stringify(newJson))
    platformData = fs.readFileSync('tokenWithPlatform.json')
}

const fetchTokenPlatform = async() => {
    tokenPlatformData = JSON.parse(fs.readFileSync('tokenWithPlatform.json'))
    newData = JSON.parse(fs.readFileSync("newData.json"))
    // console.log(tokenPlatformData)
//   console.log(newData)
    for(let item of tokenPlatformData){
        if(Object.keys(newData).includes(item['name'])){
            newData[item.name]['platforms']= item.platforms
        }
    }
    fs.writeFileSync('topTokenWithPlatform.json', JSON.stringify(newData))
}
//fetchTopTokens()
fetchTokenPlatform()