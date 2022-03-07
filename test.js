const { default: axios } = require("axios");
const fs = require('fs');


a = [
    {a:1,b:2},
    {a:1,b:4},
    {a:1,b:743},
    {a:1,b:23},
    {a:1,b:3}
]

a = a.sort((x,y) => {
    return x['b'] - y['b']
})
let text = "Hello world!";
b = 'bbb'
let result = b.substring(0,text)


eee = [4,132,4123,41,23,143,1]
console.log(Math.max.apply(Math,eee))
console.log(Math.min.apply(Math,eee))