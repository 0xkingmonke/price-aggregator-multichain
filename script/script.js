
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
        console.log('error')
    }
    tokenA = document.querySelector('#dropdownMenuButton1').cryptoID
    tokenB = document.querySelector('#dropdownMenuButton2').cryptoID
    console.log(tokenA,tokenB)
    checkQuotes(tokenA,tokenB,amount)

})

document.querySelector('#more-details').addEventListener('click', () => {
    console.log(document.querySelector('#mobile-show-route').style.display =='block')
    if( document.querySelector('#mobile-show-route').style.display == 'block' ) {
        document.querySelector('#mobile-show-route').style.display = 'none'
        document.querySelector('#more-details').innerText = 'More details'
    } else {
        document.querySelector('#mobile-show-route').style.display = 'block'
        document.querySelector('#more-details').innerText = 'Hide details'
    }
})

document.querySelector('#reverse-order').addEventListener('click', reverseToken)

document.querySelector('.graph-ipad').addEventListener('click',() => {
    console.log('clicking')
    document.querySelector('#ipad-show-route').style.transform = 'translateY(0%)'
    setTimeout(() => {
        document.querySelector('#sync-chart').style.zIndex = 1
    }, 4500)
})

document.querySelector('#ipad-more-details').addEventListener('click',() => {
    console.log('clicking')
    document.querySelector('#ipad-show-route').style.transform = 'translateY(-100%)'
    document.querySelector('#sync-chart').style.zIndex = 0
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
    generateTwoSeriesChart('USD Coin','Ethereum', 7)
    document.querySelector('#dropdownMenuButton1').cryptoID = 'USD Coin'
    document.querySelector('#dropdownMenuButton2').cryptoID = 'Ethereum'
    document.querySelector('#sell-amount').value = 100000
    checkQuotes('USD Coin','Ethereum', 100000)
    await setTimeout(()=>{
        updateEstimateSellValue(10000)
    },2000)

})

