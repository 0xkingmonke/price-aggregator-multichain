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




const main = async () => {
    rawData = await axios(options2).then(res => res.data)
    fs.writeFileSync('test1.json', JSON.stringify(rawData))
    console.log(rawData)
}


const mainCo = async () => { // useful data, can use it to build database. NFTmarket global view
    let rawData;
    option = {
        method: "GET",
        url: "https://api.covalenthq.com/v1/1/nft_market/?key=ckey_7c27f45f0eba40a490ac5d4affc",
        headers: {
            Accept: 'application/json'
        }
    }

    do{  //backend queue is full and cannot accept request
        rawData = await axios(option).then(res => res.data).catch(() => console.log('err'))
    }
    while (rawData == undefined) {
        setInterval(()=>{}, 2000)
        rawData = await axios(option).then(res => res.data).catch(() => console.log('err'))
    }
    return rawData
}

async function apiCall(url) {
    option = {
        method: "GET",
        url,
        headers: {
            Accept: 'application/json'
        }
    }
    result = await axios(option).then(res => res.data)
    console.log(result)
}

// apiCall('https://api.covalenthq.com/v1/1/tokens/0xe4605d46fd0b3f8329d936a8b258d69276cba264/nft_transactions/123/?key=ckey_7c27f45f0eba40a490ac5d4affc')
// main()
(async () => {
    console.log(await mainCo())
})()
