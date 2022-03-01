
document.querySelector('#buy-search').addEventListener('input', (event) => {  // Update dropdown menu for sell side
    updateBuyDropDown(event.target.value)
})

document.querySelector('#sell-search').addEventListener('input', (event) => { // Update dropdown menu for buy side
    updateSellDropDown(event.target.value)
})

document.querySelector('#sell-amount').addEventListener('input', (event) => { //Update estimate total value
    console.log(event.target.value)
    updateEstimateSellValue(event.target.value)
})

document.querySelector('#buy-amount').addEventListener('input', (event) => { //Update estimate total value
    console.log(event.target.value)
    updateEstimateBuyValue(event.target.value)
})





window.addEventListener('DOMContentLoaded', async (event) => {
    console.log('DOM content loaded : Success')
    await getLocalJsonData()
    updateBuyDropDown('')
    updateSellDropDown('')
    updateEstimatePrice('Avalanche', '#estimate-sell-price')
    updateEstimatePrice('Ethereum', '#estimate-buy-price')
    generateChart('Avalanche',7,'#sell-chart')
    generateChart('Ethereum',7,'#buy-chart')
});