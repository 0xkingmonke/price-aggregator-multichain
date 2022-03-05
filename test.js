const { default: axios } = require("axios");
const fs = require('fs');
const { get } = require("http");

contractAddress = '0x59468516a8259058baD1cA5F8f4BFF190d30E066'
id = 1
const options1 = { //opensea api, can use it for search engine
    method: 'GET',
    url: `https://api.opensea.io/api/v1/asset/${contractAddress}/${id}/listings?limit=20`,
    headers: {
        Accept: 'application/json',
        'X-API-KEY': '01b3549192b24412a66ad25190e04bf2'
    }
};

const options2 = {
    method: 'GET',
    url: `https://api.opensea.io/api/v1/collections?offset=0&limit=300`,
    headers: {
        Accept: 'application/json',
        'X-API-KEY': '01b3549192b24412a66ad25190e04bf2'
    }
};








async function callCovalentApi(url) { // useful data, can use it to build database. NFTmarket global view
    let rawData;
    option = {
        method: "GET",
        url,
        headers: {
            Accept: 'application/json'
        }
    }

    do {  //backend queue is full and cannot accept request
        rawData = await axios(option).then(res => res.data).catch(() => console.log('err'))
    }
    while (rawData == undefined) {
        setInterval(() => { }, 2000)
        rawData = await axios(option).then(res => res.data).catch(() => console.log('err'))
    }
    return rawData
}

async function apiCall(url) {
    option = {
        method: "GET",
        url,
        headers: {
            Accept: 'application/json',
            'X-API-KEY': '01b3549192b24412a66ad25190e04bf2'
        }
    }
    result = await axios(option).then(res => res.data)
    console.log(result)
}

const main = async () => {
    promiseList = []
    for (let i = 0; i < 300; i++) {
        promiseList.push(apiCall('https://api.opensea.io/api/v1/collection/treeverse-plots/stats'))
    }
    const rawData = await Promise.all(promiseList).then(value => value)
    fs.writeFileSync('Opensea.json', JSON.stringify(rawData))

}


// async function callTable() {
//     result = await callCovalentApi('https://api.covalenthq.com/v1/1/nft_market/?quote-currency=USD&format=JSON&page-number=&page-size=&key=ckey_7c27f45f0eba40a490ac5d4affc')
//     // result = result['data']['items']
//     fs.writeFileSync('globalView.json', JSON.stringify(result))
// }


// async function getNftTransaction() {
//     result = await callCovalentApi('https://api.covalenthq.com/v1/1/tokens/0xb47e3cd837dDF8e4c57F05d70Ab865de6e193BBB/nft_transactions/5555/?quote-currency=USD&format=JSON&key=ckey_7c27f45f0eba40a490ac5d4affc')
//     fs.writeFileSync('nftTransactions.json', JSON.stringify(result))
// }
// callTable()

date1 = new Date('2021-07-31T15:52:37Z')
date2 =  Date.now()
console.log(date1.getTime())
timeDifference = date2 - date1.getTime()
oneDay = 24*60*60*1000
days = timeDifference / oneDay
console.log(Math.floor(days))
console.log( 5 > undefined)