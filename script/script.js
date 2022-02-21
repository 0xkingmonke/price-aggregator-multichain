
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