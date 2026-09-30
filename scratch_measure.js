const http = require('http');

(async () => {
  const tabs = await new Promise((r, rej) => http.get('http://localhost:9222/json', res => {
    let d = ''; res.on('data', c => d += c); res.on('end', () => r(JSON.parse(d)));
  }).on('error', rej));

  const pageTab = tabs.find(t => t.type === 'page' && t.url.includes('localhost:3000'));
  if (!pageTab) {
    console.log('No page tab found');
    return;
  }
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
      const hero = document.querySelector('.hero-ref');
      const h = hero.getBoundingClientRect();
      const btn = document.querySelector('.hero-ref__pill-btn').getBoundingClientRect();
      const cards = Array.from(document.querySelectorAll('.hero-ref__card'));
      const xOffsets = [-340, -170, 0, 170, 340, 480];

      return cards.map((c, i) => {
        const prevStyle = c.getAttribute('style');
        c.style.transform = \`translateX(\${xOffsets[i]}px) translateY(-65px) rotate(0deg) scale(1.06)\`;
        const r = c.getBoundingClientRect();
        c.setAttribute('style', prevStyle);
        return {
          card: i,
          top: Math.round(r.top),
          bottom: Math.round(r.bottom),
          height: Math.round(r.height),
          spaceAboveHeroBottom: Math.round(h.bottom - r.bottom),
          spaceBelowCTA: Math.round(r.top - btn.bottom)
        };
      });
    })()`,
    returnByValue: true
  });

  console.log('Hover with translateY(-65px):', JSON.stringify(res.result.value, null, 2));
  ws.close();
})();
