const http = require('http');
const fs = require('fs');
const path = require('path')

http.createServer((req, res) => {

    const file = req.url === '/' ? 'index.html' : req.url
    const filePath = path.join(__dirname, 'public', file)
    const extname = path.extname(filePath)

    const allowedFileTypes = ['.html', '.css', '.js']
    const allowed = allowedFileTypes.find(item => item === extname)

    if(!allowed) return

    fs.readFile(

        filePath,
        (error, content) => {

            if(error) console.log(error);
            res.end(content);

        }

    )

}).listen(3000, ()=> console.log('Servidor On!') )