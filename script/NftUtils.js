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


async function callTable() {
    result = await callCovalentApi('https://api.covalenthq.com/v1/1/nft_market/?key=ckey_7c27f45f0eba40a490ac5d4affc')
    result = result['data']['items']
}
callTable()