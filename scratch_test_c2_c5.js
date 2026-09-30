const http = require('http');
const fs = require('fs');

(async () => {
  const tabs = await new Promise((r, rej) => http.get('http://localhost:9222/json', res => {
    let d = ''; res.on('data', c => d += c); res.on('end', () => r(JSON.parse(d)));
  }).on('error', rej));

  const pageTab = tabs.find(t => t.type === 'page' && t.url.includes('localhost:3000'));
  const ws = new WebSocket(pageTab.webSocketDebuggerUrl);
  let id = 1;
  const send = (method, params = {}) => new Promise(res => {
    const msgId = id++;
    const handler = (evt) => {
      const msg = JSON.parse(evt.data);
      if (msg.id === msgId) {
        ws.removeEventListener('message', handler);
        res(msg.result);
      }
    };
    ws.addEventListener('message', handler);
    ws.send(JSON.stringify({ id: msgId, method, params }));
  });

  await new Promise(r => ws.addEventListener('open', r));

  // Test Card 2 (yellow card in center)
  const c2Coord = await send('Runtime.evaluate', {
    expression: `(() => {
      const c2 = document.querySelectorAll('.hero-ref__card')[2];
      const r = c2.getBoundingClientRect();
      return { x: r.left + r.width / 2, y: r.top + 40 };
    })()`,
    returnByValue: true
  });

  await send('Input.dispatchMouseEvent', {
    type: 'mouseMoved',
    x: c2Coord.result.value.x,
    y: c2Coord.result.value.y
  });
  await new Promise(r => setTimeout(r, 600));

  const snap2 = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync('C:\\Users\\Admin\\.gemini\\antigravity-ide\\brain\\b94d88db-391c-4bc9-87e4-2312addcadc8\\scratch\\snap_card2_verified.png', Buffer.from(snap2.data, 'base64'));
  console.log('Saved snap_card2_verified.png');

  // Test Card 5 (green card on right)
  const c5Coord = await send('Runtime.evaluate', {
    expression: `(() => {
      const c5 = document.querySelectorAll('.hero-ref__card')[5];
      const r = c5.getBoundingClientRect();
      return { x: r.left + 40, y: r.top + 40 };
    })()`,
    returnByValue: true
  });

  await send('Input.dispatchMouseEvent', {
    type: 'mouseMoved',
    x: c5Coord.result.value.x,
    y: c5Coord.result.value.y
  });
  await new Promise(r => setTimeout(r, 600));

  const snap5 = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync('C:\\Users\\Admin\\.gemini\\antigravity-ide\\brain\\b94d88db-391c-4bc9-87e4-2312addcadc8\\scratch\\snap_card5_verified.png', Buffer.from(snap5.data, 'base64'));
  console.log('Saved snap_card5_verified.png');

  ws.close();
})();
