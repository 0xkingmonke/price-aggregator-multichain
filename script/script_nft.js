document.querySelector('#card-search-bar-btn').addEventListener('click', async() => {
    contractAddress = document.querySelector('#card-info')['contractAddress']
    tokenID = document.querySelector('#card-search-bar').value
    console.log(tokenID)
    assetData =  await axios(
        {
            method: 'GET',
            url: `https://api.opensea.io/api/v1/asset/${contractAddress}/${tokenID}/?include_orders=true`,
            headers: {
                'X-API-KEY': '01b3549192b24412a66ad25190e04bf2'
            }
        }).then(res => res.data)
        .catch(err => alert('Collection is not available'))
    
    console.log(assetData)
    document.querySelector('.cardPicture').innerHTML = `<img src= "${assetData['image_thumbnail_url']}" alt="Not available"">`

})