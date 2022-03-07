let covalentApiKey = 'ckey_7c27f45f0eba40a490ac5d4affc'
let tableList;
let useTableList;
let slug;


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
    oneDay = 24 * 60 * 60 * 1000
    days = timeDifference / oneDay
    return Math.floor(days)
}

async function getTable() {
    result = await callCovalentApi(`https://api.covalenthq.com/v1/1/nft_market/?key=${covalentApiKey}`)
    tableObject = result['data']['items']
    tableList = Object.keys(tableObject).map(x => tableObject[x])
    useTableList = tableList
    return
}



async function drawTable(tableList) {
    parentElement = document.querySelector('#table-body')
    parentElement.innerHTML = ''

    for (let item of tableList) {
        childElement = document.createElement('tr') // Creates row
        parentElement.appendChild(childElement)
        childElement.setAttribute('id', `${item['collection_address']}`) // childElementId = collection address


        async function updateCard(event) { // Event listener to update search
            document.querySelector('#card-title').innerHTML = `<img src="${item['first_nft_image']}" style="height:3em; border-radius:10px">  ${item['collection_name']}`
            contractInfo = await axios(
                {
                    method: 'GET',
                    url: `https://api.opensea.io/api/v1/asset_contract/${event.target.parentElement.id}`,
                    headers: {
                        'X-API-KEY': '01b3549192b24412a66ad25190e04bf2'
                    }
                }).then(res => res.data).catch(err => console.log(err))


            document.querySelector('.cardPicture').innerHTML = `<img src= "${contractInfo['collection']['banner_image_url']}">`

            slug = contractInfo['collection']['slug'] // Will be used for Opensea Api

            collectionStats = await axios(
                {
                    method: 'GET',
                    url: `https://api.opensea.io/api/v1/collection/${slug}/stats`,
                    headers: {
                        'X-API-KEY': '01b3549192b24412a66ad25190e04bf2',
                        'Accept': 'application/json'
                    }
                }).then(res => res.data['stats'])

            console.log(collectionStats)

            numberOfDays = ['one','seven','thirty']
            function precise(number) {
                return number.toPrecision(4)
            }
            parentElement = document.querySelector('#card-info')
            parentElement.innerText = ''
            for(let day of numberOfDays) {
                childElement = document.createElement('div')
                childElement.innerHTML = `<h3>${day} day</h3>`
                key1 = `${day}_day_average_price`
                console.log(`key1 ${key1} == one_day_average_price`)
                console.log(key1== 'one_day_average_price')
                childElement.innerHTML += `<p>Average price: ${precise(collectionStats[key1])}</p>`
                key2 = `${day}_day_change`
                childElement.innerHTML += `<p>Change: ${precise(collectionStats[key2])}</p>`
                key3 = `${day}_day_sales`
                childElement.innerHTML += `<p>Sales: ${precise(collectionStats[key3])}</p>`
                key4 = `${day}_day_volume`
                childElement.innerHTML += `<p>Volume: ${precise(collectionStats[key4])}</p>`
                parentElement.appendChild(childElement)
            }
            childElement = document.createElement('div')
            childElement.innerHTML += `<h3>Real-time</h3>`
            childElement.innerHTML += `<p>Average price: ${precise(collectionStats['average_price'])}</p>`
            childElement.innerHTML += `<p>Total supply: ${precise(collectionStats['count'])}</p>`
            childElement.innerHTML += `<p>Floor price : ${precise(collectionStats['floor_price'])}</p>`
            childElement.innerHTML += `<p>Number of owners : ${precise(collectionStats['num_owners'])}</p>`
            parentElement.appendChild(childElement)

            bottomCardElement = document.querySelector('#card-info')
            bottomCardElement.contractAddress = item['collection_address']
            
        }

 
        childElement.addEventListener('click', updateCard)

        childElement.innerHTML += ` 
        <th scope="row" >${tableList.indexOf(item) + 1}</th>
        <td> <img src="${item['first_nft_image']}" style="height:4em; border-radius:10px"><br> ${item['collection_name']}</td>`

        childElement.innerHTML+= `<td>${item['transaction_count_alltime']}</td>
        <td>${item['unique_wallet_purchase_count_alltime']}</td>
        <td>${getAge(item['contract_deployment_at'])} days</td>
        <td></td>`
    }
}
async function initializeTable() {
    await getTable()
    drawTable(tableList)
}

function filterByName(string) {
    useTableList = []
    string = string.toLowerCase()
    for (let item of tableList) {
        itemName = item['collection_name'].toLowerCase()
        if (itemName.substring(0, string.length) === string) useTableList.push(item)
    }
    useTableList = useTableList.sort()
    drawTable(useTableList)
}

initializeTable()



function addSortEventListener() {
    document.querySelector('#name-searchbar').addEventListener('input', (event) => {
        filterByName(event.target.value)
    })
    document.querySelector('#sort-transaction-desc').addEventListener('click', () => {
        useTableList.sort((x, y) => {
            return y["transaction_count_alltime"] - x["transaction_count_alltime"]
        })
        drawTable(useTableList)
    })

    document.querySelector('#sort-transaction-asc').addEventListener('click', () => {
        useTableList.sort((x, y) => {
            return x["transaction_count_alltime"] - y["transaction_count_alltime"]
        })
        drawTable(useTableList)
    })

    document.querySelector('#sort-unique-desc').addEventListener('click', () => {
        useTableList.sort((x, y) => {
            return y["unique_wallet_purchase_count_alltime"] - x["unique_wallet_purchase_count_alltime"]
        })
        drawTable(useTableList)
    })

    document.querySelector('#sort-unique-asc').addEventListener('click', () => {
        useTableList.sort((x, y) => {
            return x["unique_wallet_purchase_count_alltime"] - y["unique_wallet_purchase_count_alltime"]
        })
        drawTable(useTableList)
    })

    document.querySelector('#sort-age-desc').addEventListener('click', () => {
        useTableList.sort((x, y) => {
            y = new Date(y["contract_deployment_at"])
            x = new Date(x["contract_deployment_at"])
            return y.getTime() - x.getTime()
        })
        drawTable(useTableList)
    })

    document.querySelector('#sort-age-asc').addEventListener('click', () => {
        useTableList.sort((x, y) => {
            y = new Date(y["contract_deployment_at"])
            x = new Date(x["contract_deployment_at"])
            return x.getTime() - y.getTime()
        })
        drawTable(useTableList)
    })
}
