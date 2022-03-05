let covalentApiKey = 'ckey_7c27f45f0eba40a490ac5d4affc'
let tableList;

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


function getAge(dateString) {
    rightNow = Date.now()
    birthDate = new Date(dateString)
    timeDifference = rightNow - birthDate.getTime()
    oneDay = 24*60*60*1000
    days = timeDifference / oneDay
    return Math.floor(days)
}

async function getTable() {
    result = await callCovalentApi(`https://api.covalenthq.com/v1/1/nft_market/?key=${covalentApiKey}`)
    tableObject = result['data']['items']
    tableList = Object.keys(tableObject).map( x => tableObject[x] )
    return
}

async function drawTable(tableList) {
    parentElement = document.querySelector('#table-body')
    parentElement.innerHTML = ''
    console.log(tableList)
    for (let item of tableList) {
        parentElement.innerHTML += `
        <tr>  
        <th scope="row">${tableList.indexOf(item) +1}</th>
        <td> <img src="${item['first_nft_image']}" style="height:4em"> ${item['collection_name']}</td>
        <td>${item['volume_quote_24h']}</td>
        <td>${item['avg_volume_quote_24h']}</td>
        <td>${item['transaction_count_alltime']}</td>
        <td>${item['unique_wallet_purchase_count_alltime']}</td>
        <td>${getAge(item['contract_deployment_at'])} days</td>
      </tr>`
    }
} 
async function initializeTable() {
    await getTable()
    drawTable(tableList)
}

initializeTable()

