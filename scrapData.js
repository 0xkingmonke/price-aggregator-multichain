const axios = require('axios')
const { Console } = require('console')
const fs = require('fs')

let tokenJson = {
    weth:'',
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

const fecthData = async () => {
    let writeData
    data = fs.readFileSync('tokenWithPlatform.json')
    data = JSON.parse(data)
    for( let item of Object.keys(tokenJson)) {
        for( let j of data) {
            if (j.id == item) {
                tokenJson[item] = j
            }
        }
    }
    console.log(tokenJson)
    fs.writeFileSync('./token.json', JSON.stringify(tokenJson) )
}

fecthData()
