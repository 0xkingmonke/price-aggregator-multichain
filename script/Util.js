// tokenID, tokenList is curated from data.js
async function generateChart(ticker,numberOfDay,DivID) { //numberOfDay ={(1/7/14/30/90/180/365/max}
    ticker = tokenJson[ticker]['id']
    const chartData = async () => {//https://api.coingecko.com/api/v3/coins/bitcoin/ohlc?vs_currency=usd&days=1
        data = await axios.get(`https://api.coingecko.com/api/v3/coins/${ticker}/ohlc?vs_currency=usd&days=${numberOfDay}`).then(res => res.data)
        var options = {
            chart: {
                type: 'candlestick'
            },
            series: [{
                data: data
            }],
            xaxis:{
                type: 'datetime'
            }
        }
        document.querySelector(DivID).innerHTML = ''
        var chart = new ApexCharts(document.querySelector(DivID), options)
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
        if (targetValue != item.slice(0, targetValue.length)) {
            continue
        }
        childElement = document.createElement('li')
        childElement.innerHTML += `<a class="dropdown-item" >${item}</a>`

        childElement.addEventListener('click', (event) => { // Add event listener so change value
            document.querySelector('#dropdownMenuButton2').innerHTML = item // Update the button value
            updateEstimatePrice(tokenJson[item][id],'#estimate-sell-price')
            generateChart(item,7,'#sell-chart')
        })

        parentElement.appendChild(childElement)
    }

}

function updateBuyDropDown(targetValue) {
    parentElement = document.querySelector('#buy-dropdown')
    parentElement.innerHTML = ''
    for (let i of tokenList) {
        if (targetValue != i.slice(0, targetValue.length)) {
            continue
        }
        childElement = document.createElement('li')
        childElement.innerHTML += `<a class="dropdown-item" >${i}</a>`
        childElement.addEventListener('click', (event) => {
            document.querySelector('#dropdownMenuButton1').innerHTML = i
            updateEstimatePrice(i,'#estimate-buy-price')
            generateChart(i,7,'#buy-chart')
        })
        parentElement.appendChild(childElement)
    }
}

function updateEstimateSellValue(amount) {
    estimatePrice = document.querySelector('#estimate-sell-price').innerHTML
    estimateValue = estimatePrice * amount
    document.querySelector('#estimate-sell-value').innerHTML = estimateValue
}

function updateEstimateBuyValue(amount) {
    estimatePrice = document.querySelector('#estimate-buy-price').innerHTML
    estimateValue = estimatePrice * amount
    document.querySelector('#estimate-buy-value').innerHTML = estimateValue
}

