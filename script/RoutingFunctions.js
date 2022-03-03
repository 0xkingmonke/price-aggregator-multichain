BASE_URL = "https://api.1inch.io/v4.0/"

// https://api.1inch.io/v4.0/1/quote?fromTokenAddress=&toTokenAddress=&amount=
chainID = {
    "ethereum": "1",
    "binance-smart-chain": "56",
    "polygon-pos": "137",
    "optimistic-ethereum": "10",
    "arbitrum-one": "42161",
    "avalanche": "43114"
}

specialTokenDecimal = {   //self-curated list of tokens with different decimal
    "USD Coin": 6,
    "Tether": 6,
    "Dogecoin": 8,
    "Cronos": 8,
    "Wrapped Bitcoin": 8,
    "cETH": 8,
    "cDAI": 8,
    "KuCoin Token": 6
}

function checkPlatforms(tokenA, tokenB) {
    console.log(tokenJson['USD Coin'])
    console.log(tokenA)
    console.log(tokenJson[tokenA])
    console.log(tokenB)
    console.log(tokenJson[tokenB])
    commonPlatforms = []
    for (let itemA in tokenJson[tokenA]['platforms']) {
        for (let itemB in tokenJson[tokenB]['platforms']) {

            if (itemA == itemB && chainID.hasOwnProperty(itemA)) commonPlatforms.push(itemA)
        }
    }
    console.log(`common Platforms : ${commonPlatforms}`)
    return commonPlatforms
}

function convertAmountToDecimals(token, amount) {

    if (specialTokenDecimal.hasOwnProperty(token)) {
        decimalString = '0'.repeat(specialTokenDecimal[token])
    } else {
        decimalString = '0'.repeat(18)
    }

    amountInString = `${amount}${decimalString}`
    return amountInString
}

function convertDecimalsToAmount(token, amount) {
    amount = amount + ''

    if (specialTokenDecimal.hasOwnProperty(token)) {
        amountInString = `${amount.slice(0, amount.length - specialTokenDecimal[token])}.${amount.slice(amount.length - specialTokenDecimal[token],)}`
    } else {
        amountInString = `${amount.slice(0, amount.length - 18)}.${amount.slice(amount.length - 18,)}`
    }
    return amountInString
}

async function getDataByChain(chainAddress, addressTokenA, addressTokenB, amountInString) {
    data = await axios.get(`${BASE_URL}${chainAddress}/quote?fromTokenAddress=${addressTokenA}&toTokenAddress=${addressTokenB}&amount=${amountInString}`).then(res => res.data)
    return data
}

function firstSmallerThanSecond(a, b) {
    if (a.length > b.length) return false
    if (b.length > a.length) return true

    for (let index in a) {
        if (a.slice(index) > b.slice(index)) return false
        if (b.slice(index) > a.slice(index)) return true
    }

    return true //Extremely unlikely that both trades at the same price

}

function sortBigNumbers(list) {
    if (list.length <= 1) return list
    for (let index = 0; index < list.length - 1; index++) { // max list.length is 6
        for (let index2 = 0; index2 < list.length - 1; index2++)
            if (firstSmallerThanSecond(list[index2]['toTokenAmount'], list[index2 + 1]['toTokenAmount'])) {
                let temp = list[index2]
                list[index2] = list[index2 + 1]
                list[index2 + 1] = temp
            }
    }
    return list
}

async function displayPrice(list) {
    parentElement = document.querySelector('#show-price')
    parentElement.innerHTML = ''
    document.querySelector('#buy-amount').value = list[0]['toTokenAmount']
    updateEstimateBuyValue(list[0]['toTokenAmount'])
    for (let route of list) {
        childElement = document.createElement('div')
        childElement.innerHTML = `Output: ${route['toTokenAmount']} on ${route['chainName']}| Price:$${route['fromTokenAmount'] / route['toTokenAmount']}`
        parentElement.appendChild(childElement)
    }
}

function drawSubRoutes(dataList, nameList, divID) {
    var options = {
        series: [{
            data: dataList
        }],
        chart: {
            type: 'bar',
            height: '100%'
        },
        plotOptions: {
            bar: {
                borderRadius: 4,
                horizontal: true,
            }
        },
        dataLabels: {
            enabled: false
        },
        xaxis: {
            categories: nameList,
        }
    };
    console.log(`#${divID}`)
    return new ApexCharts(document.querySelector(`#${divID}`), options)
}

async function displayRoute(route) {  //#show-routes

    graphList = []
    grandParentElement = document.querySelector('#show-routes')
    grandParentElement.innerHTML = ''
    eachRouteIndex = 0
    for (let mainSubRouteIndex in route['protocols']) {
        parentElement = document.createElement('div')
        parentElement.className = 'mainSubRoute'

        parentElement.setAttribute("id", `mainSubRoute${mainSubRouteIndex}`)
        grandParentElement.appendChild(parentElement)
        parentElement.style.border = '5px solid yellow'

        dataList = []
        nameList = []

        for (let subRoute of route['protocols'][mainSubRouteIndex]) { //Added list of routes that subroute took
            for (let eachRoute of subRoute) {
                dataList.push(eachRoute['part'])
                nameList.push(eachRoute['name'])
            }
            kidElement = document.createElement('div')
            kidElement.className = 'eachRoute'
            kidElement.setAttribute("id", `eachRoute${eachRouteIndex}`)
            parentElement.appendChild(kidElement)

            drawRouteObject = drawSubRoutes(dataList, nameList, `eachRoute${eachRouteIndex}`)
            graphList.push(drawRouteObject)
            eachRouteIndex++
        }
    }


    for (let item of graphList) {
        item.render()
    }

}



async function checkQuotes(tokenA, tokenB, amount) {
    commonPlatforms = checkPlatforms(tokenA, tokenB)
    promiseList = []
    priceList = []

    for (let chainName of commonPlatforms) {
        chainAddress = chainID[chainName]
        addressTokenA = tokenJson[tokenA]['platforms'][chainName]
        addressTokenB = tokenJson[tokenB]['platforms'][chainName]
        amountInString = convertAmountToDecimals(tokenA, amount)
        dataByChain = getDataByChain(chainAddress, addressTokenA, addressTokenB, amountInString).catch(()=> {return })
        promiseList.push(dataByChain)
    }   

    routeList = await Promise.all(promiseList).then(values => values)
    routeList = Object.keys(routeList).map(obj => routeList[obj])

    lengthRouteList = routeList.length
    for (let index =0; index<lengthRouteList; index++) { // Add chainName into the route
        if (routeList[index] === undefined) {
            routeList.splice(index,1)     
            commonPlatforms.splice(index,1)
        }
    }

    console.log(`Final : routeList: ${routeList}\ncommonPlatforms:${commonPlatforms}`)
    for(let index in routeList) {
        routeList[index]['chainName'] = commonPlatforms[index]
    }

    routeList = sortBigNumbers(routeList) // token amount is > 2^32, have to built own function to sort
    routeList.map(value => {
        value['fromTokenAmount'] = convertDecimalsToAmount(tokenA, value['fromTokenAmount'])
        value['toTokenAmount'] = convertDecimalsToAmount(tokenB, value['toTokenAmount'])
    })
    displayPrice(routeList)
    displayRoute(routeList[0])
}


