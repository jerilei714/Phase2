const http = require('http');
const fs = require('fs');
const path = require('path');
const labServer = http.createServer((req, res) => {
    let fPath = '.' + req.url;

    if (fPath == './') {
        fPath = './PHASE2/index.html';
    }else{
        fPath = './PHASE2' + req.url;
    }

    const ext = path.extname(fPath);
    
    let cType = 'text/html';

    switch(ext){
        case '.css':
            cType = 'text/css';
            break;
        case '.js':
            cType = 'text/javascript';
            break;
    }

    fs.readFile(fPath, (err, content) => {
        if (err){
            if (err.code == 'ENOENT'){
                fs.readFile('./PHASE2/404.html', (err, content) => {
                    res.writeHead(404, { 'Content Type': 'text/html' });
                    res.end(content, 'utf-8');
                });
            }else{
                res.writeHead(500);
                res.end('Server Error: ' + err.code);
            }
        }else{
            res.writeHead(200, { 'Content Type': cType});
            res.end(content, 'utf-8');
        }
    });
});

const PORT = process.env.PORT || 3000;
labServer.listen(PORT, () => {
    console.log('Server running on port ${PORT}');
});