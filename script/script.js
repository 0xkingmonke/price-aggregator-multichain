// tokenID, tokenList is curated from data.js

function updateDropDown(targetValue) {
    parentElement = document.querySelector('#buy-dropdown')
    parentElement.innerHTML = ''
    for(let i of tokenList){
        if (targetValue != i.slice(0,targetValue.length)) {
            continue
        }
        childElement = document.createElement('li')
        childElement.innerHTML += `<a class="dropdown-item" >${i}</a>`
        childElement.addEventListener('click', (event) => {
            console.log(i)
            document.querySelector('#dropdownMenuButton1').innerHTML = i 
        })
        parentElement.appendChild(childElement)
    }

}



window.addEventListener('DOMContentLoaded', (event) => {
    updateDropDown('')
});


document.querySelector('#buy-search').addEventListener('input', (event)=> {
    updateDropDown(event.target.value)
    console.log(event.target.value)

    console.log(tokenList)
})

const chartData = async () => {
    data = await axios.get('https://api.coingecko.com/api/v3/coins/bitcoin/ohlc?vs_currency=usd&days=7').then(res => res.data)
    var options = {
        chart: {
            type: 'candlestick'
        },
        series: [{
            data: data
        }]
    }
    var chart = new ApexCharts(document.querySelector("#chart"), options)
    chart.render()
}    

chartData()