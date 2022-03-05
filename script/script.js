
document.querySelector('#buy-search').addEventListener('input', (event) => {  // Update dropdown menu for sell side
    updateBuyDropDown(event.target.value)
})

document.querySelector('#sell-search').addEventListener('input', (event) => { // Update dropdown menu for buy side
    updateSellDropDown(event.target.value)
})

document.querySelector('#sell-amount').addEventListener('input', (event) => { //Update estimate total value
    handleSellAmountError(event.target.value)
    updateEstimateSellValue(event.target.value)
})

document.querySelector('#buy-amount').addEventListener('input', (event) => { //Update estimate total value
    updateEstimateBuyValue(event.target.value)
})
document.querySelector('#buy-amount').readOnly = true;


document.querySelector('#graph-button-id').addEventListener('click', () => { //Remember to uncomment
    leftBody = document.querySelector('#left-body')
    routerBody = document.querySelector('#router-body')

    if (leftBody.style.transform == 'translateX(-100%)') {
        leftBody.style.transform = 'translateX(0%)'
        routerBody.style.transform = 'translateX(0%)' //Important Remember to uncomment
        setTimeout(() => { document.querySelector('#router').style.overflow = 'hidden' }, 400)
    } else {
        document.querySelector('#router').style.overflow = 'visible'
        leftBody.style.transform = 'translateX(-100%)'
        routerBody.style.transform = 'translateX(-100%)'
    }
})


document.querySelector('#quote-button').addEventListener('click', () => {
    amount = document.querySelector('#sell-amount').value
    if (handleSellAmountError(amount)) {
        console.log('AMEN')
    }
    tokenA = document.querySelector('#dropdownMenuButton2').innerHTML
    tokenB = document.querySelector('#dropdownMenuButton1').innerHTML
    checkQuotes(tokenA,tokenB,amount)

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
    checkQuotes('USD Coin','Ethereum', 100000)
    addSortEventListener()
})

