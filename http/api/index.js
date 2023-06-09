const http = require('http');
const URL = require('url');
const fs = require('fs');
const path = require('path')
const data = require('./urls.json');
const { randomUUID } = require('crypto')

function writeFile(cb) {

    fs.writeFile(
        path.join(__dirname, "urls.json"), 
        JSON.stringify(data, null, 2),
        error => {

            if(error) console.log(error)

            cb(JSON.stringify({message: "ok"}))
        })

}

http.createServer((req, res) => {

    const { name, url, del } = URL.parse(req.url, true).query
    const id = randomUUID();

    res.writeHead(200, {

        'Access-Control-Allow-Origin': '*'

    })

    // all resources
    if(!name || !url)
        return res.end(JSON.stringify(data))

    if(del){
        data.urls = data.urls.filter(item => String(item.url) !== String(url))
        return writeFile((message) => res.end(message))
    }
    
    data.urls.push({name, url, id});

    return writeFile((message) => res.end(message))


}).listen(3000, ()=> console.log('Api On!') )