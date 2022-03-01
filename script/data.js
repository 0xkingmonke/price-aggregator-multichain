let tokenJson;
let tokenList;

async function getLocalJsonData() {
    tokenJson = await axios.get('./topTokenWithPlatform.json').then(res=>res.data)
    tokenList = Object.keys(tokenJson)
}




