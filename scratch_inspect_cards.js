const http = require('http');

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

  const res = await send('Runtime.evaluate', {
    expression: `(() => {
      const cards = Array.from(document.querySelectorAll('.hero-ref__card'));
      return cards.map((c, i) => {
        const r = c.getBoundingClientRect();
        return {
          index: i,
          className: c.className,
          inlineStyle: c.getAttribute('style'),
          computedTransform: window.getComputedStyle(c).transform,
          rect: { top: Math.round(r.top), bottom: Math.round(r.bottom), height: Math.round(r.height) }
        };
      });
    })()`,
    returnByValue: true
  });

  console.log(JSON.stringify(res.result.value, null, 2));
  ws.close();
})();
