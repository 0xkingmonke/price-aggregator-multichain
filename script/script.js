
document.querySelector('#buy-search').addEventListener('input', (event) => {  // Update dropdown menu for sell side
    updateBuyDropDown(event.target.value)
})

document.querySelector('#sell-search').addEventListener('input', (event) => { // Update dropdown menu for buy side
    updateSellDropDown(event.target.value)
})

document.querySelector('#sell-amount').addEventListener('input', (event) => { //Update estimate total value
    updateEstimateSellValue(event.target.value)
})

document.querySelector('#buy-amount').addEventListener('input', (event) => { //Update estimate total value
    updateEstimateBuyValue(event.target.value)
})

document.querySelector('#graph-button').addEventListener('click', () => {
    if (document.querySelector('#left-body').style.transform == 'translateX(-100%)') {
        document.querySelector('#left-body').style.transform = 'translateX(0%)'
        document.querySelector('#router-body').style.transform = 'translate(100%,-100%)'

        setTimeout(() => { document.querySelector('#router').style.overflow = 'hidden' }, 400)
    } else {
        document.querySelector('#router').style.overflow = 'visible'
        document.querySelector('#left-body').style.transform = 'translateX(-100%)'
        document.querySelector('#router-body').style.transform = 'translate(0%,-100%)'
    }
})

window.addEventListener('DOMContentLoaded', async (event) => {
    console.log('DOM content loaded : Success')
    await getLocalJsonData()
    updateBuyDropDown('')
    updateSellDropDown('')
    updateEstimatePrice('USD Coin', '#estimate-sell-price')
    updateEstimatePrice('Ethereum', '#estimate-buy-price')
    generateChart('USD Coin', 7, '#sell-chart')
    generateChart('Ethereum', 7, '#buy-chart')
    clickGraph() // testing phase for routing
    checkQuotes("Avalanche",'Ethereum')
})