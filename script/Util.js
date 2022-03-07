// tokenID, tokenList is curated from data.js
async function generateChart(ticker, numberOfDay, DivID) { //numberOfDay ={(1/7/14/30/90/180/365/max}
    ticker = tokenJson[ticker]['id']
    const chartData = async () => { // i.e. https://api.coingecko.com/api/v3/coins/bitcoin/ohlc?vs_currency=usd&days=1
        data = await axios.get(`https://api.coingecko.com/api/v3/coins/${ticker}/ohlc?vs_currency=usd&days=${numberOfDay}`).then(res => res.data)
        var options = {
            chart: {
                type: 'candlestick',
                width: '80%',
                height: '40%',
                toolbar: {
                    show: false,
                },
                id: 'id',
                group: 'candle'
            },
            series: [
                {
                    data: data
                }
            ],
            xaxis: {
                type: 'datetime',
            }
        }
        document.querySelector(DivID).innerHTML = ''
        var chart = new ApexCharts(document.querySelector(DivID), options)
        chart.render()
    }
    chartData()
}

async function generateTwoSeriesChart(tickerA, tickerB, numberOfDay) { // two series chart
    tickerA = tokenJson[tickerA]['id']
    tickerB = tokenJson[tickerB]['id']
    const chartData = async () => { // i.e. https://api.coingecko.com/api/v3/coins/bitcoin/ohlc?vs_currency=usd&days=1
        firstData = await axios.get(`https://api.coingecko.com/api/v3/coins/${tickerA}/market_chart?vs_currency=usd&days=7`).then(res => res.data)
        secondData = await axios.get(`https://api.coingecko.com/api/v3/coins/${tickerB}/market_chart?vs_currency=usd&days=7`).then(res => res.data)
        aTickerData = []
        bTickerData = []
        xAxisLabel = []
        for (let array of firstData['prices']) {
            for (let item in array) { // odd index is time, even index is price
                if (item % 2 == 0) {
                    date = new Date(array[item])
                    xAxisLabel.push(array[item])
                } else {
                    value = parseFloat(array[item].toPrecision(3))
                    aTickerData.push(value)
                }
            }
        }
        for (let array of secondData['prices']) {
            for (let item in array) { // odd index is time, even index is price
                if (item % 2 == 1) {
                    value = parseFloat(array[item].toPrecision(3))
                    bTickerData.push(value)
                }
            }
        }
        console.log(xAxisLabel)
        var options = {
            series: [
                {
                    name: tickerA,
                    data: aTickerData
                },
                {
                    name: tickerB,
                    data: bTickerData
                }
            ],
            chart: {
                height: 350,
                type: 'line',
                toolbar: {
                    show: false
                }
            },
            // colors: ['red', 'blue'],
            title: {
                text: 'Prices of both token',
                align: 'left'
            },
            xaxis: {
                type: 'datetime',
                categories: xAxisLabel,
            },
            yaxis: [
                {
                    title: {
                        text: tickerA
                    },
                    min: Math.min.apply(Math, aTickerData),
                    max: Math.max.apply(Math, aTickerData)
                },
                {
                    opposite: true,
                    title: {
                        text: tickerB
                    },
                    min: Math.min.apply(Math, bTickerData),
                    max: Math.max.apply(Math, bTickerData)
                }
            ],
        };

        document.querySelector('#sync-chart').innerHTML = ''
        var chart = new ApexCharts(document.querySelector('#sync-chart'), options)
        chart.render()
    }
    chartData()
}

async function updateEstimatePrice(ticker, divID) {
    ticker = tokenJson[ticker]['id']
    price = await axios.get(`https://api.coingecko.com/api/v3/simple/price?ids=${ticker}&vs_currencies=usd`).then(res => res.data[ticker])
    document.querySelector(divID).innerHTML = price['usd']
}

function updateSellDropDown(targetValue) {
    parentElement = document.querySelector('#sell-dropdown')
    parentElement.innerHTML = ''
    for (let item of tokenList) {
        if (targetValue.toUpperCase() != item.slice(0, targetValue.length).toUpperCase()) {
            continue
        }
        childElement = document.createElement('li')
        childElement.innerHTML += `<a class="dropdown-item" >${item}</a>`

        childElement.addEventListener('click', (event) => { // Add event listener so change value
            document.querySelector('#dropdownMenuButton2').cryptoID = item
            document.querySelector('#dropdownMenuButton2').innerHTML = `<img src="${tokenJson[item]['image']}">` // Update the button value
            updateEstimatePrice(item, '#estimate-sell-price')
            generateChart(item, 7, '#sell-chart')
            buyTicker = document.querySelector('#dropdownMenuButton1').cryptoID
            generateTwoSeriesChart(item,buyTicker,7)
        })

        parentElement.appendChild(childElement)
    }

}



function updateBuyDropDown(targetValue) {
    parentElement = document.querySelector('#buy-dropdown')
    parentElement.innerHTML = ''
    for (let item of tokenList) {
        if (targetValue.toUpperCase() != item.slice(0, targetValue.length).toUpperCase()) {
            continue
        }
        childElement = document.createElement('li')
        childElement.innerHTML += `<a class="dropdown-item" >${item}</a>`
        childElement.addEventListener('click', (event) => {
            document.querySelector('#dropdownMenuButton1').cryptoID = item
            console.log(tokenJson[item]['image'])
            document.querySelector('#dropdownMenuButton1').innerHTML = `<img src="${tokenJson[item]['image']}">`
            updateEstimatePrice(item, '#estimate-buy-price')
            generateChart(item, 7, '#buy-chart')
            sellTicker = document.querySelector('#dropdownMenuButton2').cryptoID
            generateTwoSeriesChart(sellTicker,item,7)
        })
        parentElement.appendChild(childElement)
    }

}

function updateEstimateSellValue(amount) {
    estimatePrice = document.querySelector('#estimate-sell-price').innerHTML
    estimateValue = estimatePrice * amount
    document.querySelector('#estimate-sell-value').innerHTML = `~$${estimateValue}`
}

function updateEstimateBuyValue(amount) {
    estimatePrice = document.querySelector('#estimate-buy-price').innerHTML
    estimateValue = estimatePrice * amount
    document.querySelector('#estimate-buy-value').innerHTML = `~$${estimateValue}`
}

function clickGraph() {
    document.getElementById('graph-button-id').click()
}

function handleSellAmountError(string) {
    dotCount = 0
    for (let char of string) {
        if (isNaN(Number(char))) {
            if (dotCount == 0 && char == '.') {
                ++dotCount
                continue
            }
            document.querySelector('#sell-amount').style.backgroundColor = '#d8eff2'
            document.querySelector('#sell-amount').style.color = 'white'
            return true
        }
    }
    document.querySelector('#sell-amount').style.backgroundColor = '#d8eff2'
    document.querySelector('#sell-amount').style.color = 'black'
}

function reverseToken() {
    let temp
    temp = document.querySelector('#dropdownMenuButton2').cryptoID
    document.querySelector('#dropdownMenuButton2').cryptoID = document.querySelector('#dropdownMenuButton1').cryptoID
    document.querySelector('#dropdownMenuButton1').cryptoID = temp

    temp = document.querySelector('#dropdownMenuButton2').innerHTML
    document.querySelector('#dropdownMenuButton2').innerHTML = document.querySelector('#dropdownMenuButton1').innerHTML
    document.querySelector('#dropdownMenuButton1').innerHTML = temp
    document.querySelector('#quote-button').click()

}

function navbarInit() {
    navbar = document.querySelector('.nav-link')
    navbar.onmouseover = () => {
        navbar.click()
    }
}


navbarInit()