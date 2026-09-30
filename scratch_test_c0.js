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

  // Find where Card 0 is top-most
  const c0Info = await send('Runtime.evaluate', {
    expression: `(() => {
      const c0 = document.querySelectorAll('.hero-ref__card')[0];
      const r = c0.getBoundingClientRect();
      // Test several points across the top-left of card 0
      const points = [
        { x: r.left + 30, y: r.top + 40 },
        { x: r.left + 60, y: r.top + 50 },
        { x: r.left + 80, y: r.top + 80 },
      ];
      return points.map(p => ({
        point: p,
        el: document.elementFromPoint(p.x, p.y)?.closest('.hero-ref__card')?.getAttribute('aria-label')
      }));
    })()`,
    returnByValue: true
  });
  console.log('Points test:', JSON.stringify(c0Info.result.value, null, 2));

  // Pick point that belongs to card 0
  const validPoint = c0Info.result.value.find(p => p.el && p.el.includes('MSJ ERP')) || c0Info.result.value[0];
  console.log('Hovering point:', validPoint.point);

  await send('Input.dispatchMouseEvent', {
    type: 'mouseMoved',
    x: validPoint.point.x,
    y: validPoint.point.y
  });
  await new Promise(r => setTimeout(r, 600));

  const hoveredCheck = await send('Runtime.evaluate', {
    expression: `(() => {
      const cards = Array.from(document.querySelectorAll('.hero-ref__card'));
      return cards.map(c => ({
        label: c.getAttribute('aria-label'),
        isHovered: c.classList.contains('is-hovered'),
        transform: c.style.transform,
        rect: c.getBoundingClientRect()
      }));
    })()`,
    returnByValue: true
  });
  console.log('Hovered check:', JSON.stringify(hoveredCheck.result.value, null, 2));

  // Capture screenshot of card 0 hovered
  const snap = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync('C:\\Users\\Admin\\.gemini\\antigravity-ide\\brain\\b94d88db-391c-4bc9-87e4-2312addcadc8\\scratch\\snap_card0_verified.png', Buffer.from(snap.data, 'base64'));
  console.log('Saved snap_card0_verified.png');

  ws.close();
})();
