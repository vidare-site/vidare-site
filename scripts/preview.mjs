import http from 'node:http';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createHandler } from '../deployment/handler.mjs';
import { PAGE_URLS, SITE_URL } from '../src/content/site.js';

const root = fileURLToPath(new URL('../dist', import.meta.url));
const types = { '.html': 'text/html; charset=utf-8', '.js': 'application/javascript', '.css': 'text/css', '.xml': 'application/xml', '.txt': 'text/plain; charset=utf-8', '.svg': 'image/svg+xml', '.webp': 'image/webp', '.png': 'image/png', '.ico': 'image/x-icon', '.mp4': 'video/mp4' };
const app = createHandler({ pages: PAGE_URLS, origin: SITE_URL });
const ASSETS = {
  async fetch(request) {
    let pathname;
    try { pathname = decodeURIComponent(new URL(request.url).pathname); } catch { return new Response(null, { status: 404 }); }
    let file = path.resolve(root, `.${pathname}`);
    if (!file.startsWith(root + '/') && file !== root) return new Response(null, { status: 404 });
    try {
      if ((await fs.stat(file)).isDirectory()) file = path.join(file, 'index.html');
      const bytes = await fs.readFile(file);
      const headers = { 'Content-Type': types[path.extname(file)] || 'application/octet-stream', 'Accept-Ranges': 'bytes' };
      const range = request.headers.get('range')?.match(/^bytes=(\d+)-(\d*)$/);
      if (range) {
        const start = Number(range[1]), end = range[2] ? Math.min(Number(range[2]), bytes.length - 1) : bytes.length - 1;
        if (start > end) return new Response(null, { status: 416 });
        headers['Content-Range'] = `bytes ${start}-${end}/${bytes.length}`;
        return new Response(request.method === 'HEAD' ? null : bytes.subarray(start, end + 1), { status: 206, headers });
      }
      headers['Content-Length'] = String(bytes.length);
      return new Response(request.method === 'HEAD' ? null : bytes, { headers });
    } catch { return new Response('Missing asset', { status: 404 }); }
  },
};
const port = Number(process.env.PORT || 4173);
http.createServer(async (req, res) => {
  try {
    const request = new Request(`http://${req.headers.host}${req.url}`, { method: req.method, headers: req.headers });
    const response = await app.fetch(request, { ASSETS });
    res.writeHead(response.status, Object.fromEntries(response.headers));
    res.end(req.method === 'HEAD' ? undefined : Buffer.from(await response.arrayBuffer()));
  } catch (error) { console.error(error); res.writeHead(500).end('Preview error'); }
}).listen(port, '127.0.0.1', () => console.log(`Local: http://127.0.0.1:${port}/pt`));
