import { createServer } from 'node:http';
import fs from 'node:fs';
import path from 'node:path';

const server = createServer((req, res) => {
    const url = req.url;

    // CSS
    if (url.startsWith('/styles/') && url.endsWith('.css')) {
        const cssPath = path.join(process.cwd(), 'public', 'styles', 'prod.css');
        fs.readFile(cssPath, (err, data) => {
            if (err) {
                res.writeHead(404, { 'Content-Type': 'text/plain' });
                res.end('CSS File Not Found');
                return;
            }
            res.writeHead(200, { 'Content-Type': 'text/css' });
            res.end(data);
        });
        return;
    }

    // JavaScript
    if (url.startsWith('/components/') && url.endsWith('.js')) {
        const jsPath = path.join(process.cwd(), url.slice(1));
        fs.readFile(jsPath, (err, data) => {
            if (err) {
                res.writeHead(404, { 'Content-Type': 'text/plain' });
                res.end('JavaScript File Not Found');
                return;
            }
            res.writeHead(200, { 'Content-Type': 'application/javascript' });
            res.end(data);
        });
        return;
    }

    // Images
    if (url.startsWith('/images/') && (url.endsWith('.png') || url.endsWith('.jpg') || url.endsWith('.jpeg') || url.endsWith('.gif') || url.endsWith('avif'))) {
        const imagePath = path.join(process.cwd(), 'public', 'images', url.slice(8));
        fs.readFile(imagePath, (err, data) => {
            if (err) {
                res.writeHead(404, { 'Content-Type': 'text/plain' });
                res.end('Image File Not Found');
                return;
            }
            const ext = path.extname(imagePath).toLowerCase();
            let contentType = 'image/jpeg'; 
            if (ext === '.png') {
                contentType = 'image/png';
            } else if (ext === '.gif') {
                contentType = 'image/gif';
            } else if (ext === ".avif") {
                contentType = 'image/avif';
            }
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(data);
        });
        return;
    }

    // SVG
    if (url.startsWith('/images/') && url.endsWith('.svg')) {
        const svgPath = path.join(process.cwd(), url.slice(1));
        fs.readFile(svgPath, (err, data) => {
            if (err) {
                res.writeHead(404, { 'Content-Type': 'text/plain' });
                res.end('SVG File Not Found');
                return;
            }
            res.writeHead(200, { 'Content-Type': 'image/svg+xml' });
            res.end(data);
        });
        return;
    }

    // HTML files
    let filePath;
    if (url.startsWith('/inner-information.html')) {
        const query = new URL(req.url, `http://${req.headers.host}`).searchParams;
        const id = query.get('id'); 

        console.log(`${id}`); 

        filePath = path.join(process.cwd(),'public', 'htmls', 'inner-information.html');
    } else {
        switch (url) {
            case '/information.html':
                filePath = path.join(process.cwd(), 'public', 'htmls', 'information.html');
                break;
            case '/oneProduct.html':
                filePath = path.join(process.cwd(), 'public', 'htmls', 'oneProduct.html');
                break;
            case '/products.html':
                filePath = path.join(process.cwd(), 'public', 'htmls', 'oneProduct.html');
                break;
            case '/test.html':
                filePath = path.join(process.cwd(), 'public', 'htmls', 'test.html');
                break;
            case '/turshilt.html':
                filePath = path.join(process.cwd(), 'public', 'htmls', 'turshilt.html');
                break;
            case '/user.html':
                filePath = path.join(process.cwd(), 'public', 'htmls', 'user.html');
                break;
            default:
                filePath = path.join(process.cwd(), 'public', 'htmls', 'index.html');
                break;
        }
    }

    fs.readFile(filePath, (err, data) => {
        if (err) {
            res.writeHead(500, { 'Content-Type': 'text/html' });
            res.end('<p>Error</p>');
            return;
        }
        res.writeHead(200, { 'Content-Type': 'text/html ' });
        res.end(data);
    });
});

// Start server
server.listen(3000, '127.0.0.1', () => {
    console.log('Listening on http://127.0.0.1:3000');
});