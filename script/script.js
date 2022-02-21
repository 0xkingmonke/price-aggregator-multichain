
const chartData = async () => {

    let data;

    const readData = (async () => {
        data = await axios.get('../data.json').then(res => res.data)
    })
    await readData()
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