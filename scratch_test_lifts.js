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

  const checkHoverPositions = await send('Runtime.evaluate', {
    expression: `(() => {
      const hero = document.querySelector('.hero-ref');
      const h = hero.getBoundingClientRect();
      const btn = document.querySelector('.hero-ref__pill-btn').getBoundingClientRect();
      const cards = Array.from(document.querySelectorAll('.hero-ref__card'));
      const xOffsets = [-340, -170, 0, 170, 340, 480];

      return [-60, -80, -95, -110].map(liftY => {
        return {
          liftY,
          card0: (() => {
            const c = cards[0];
            const prev = c.style.transform;
            c.style.transform = \`translateX(-340px) translateY(\${liftY}px) rotate(0deg) scale(1.05)\`;
            const r = c.getBoundingClientRect();
            c.style.transform = prev;
            return {
              top: Math.round(r.top),
              bottom: Math.round(r.bottom),
              spaceAboveHeroBottom: Math.round(h.bottom - r.bottom)
            };
          })(),
          card2: (() => {
            const c = cards[2];
            const prev = c.style.transform;
            c.style.transform = \`translateX(0px) translateY(\${liftY}px) rotate(0deg) scale(1.05)\`;
            const r = c.getBoundingClientRect();
            c.style.transform = prev;
            return {
              top: Math.round(r.top),
              bottom: Math.round(r.bottom),
              spaceBelowCTA: Math.round(r.top - btn.bottom),
              spaceAboveHeroBottom: Math.round(h.bottom - r.bottom)
            };
          })()
        };
      });
    })()`,
    returnByValue: true
  });

  console.log(JSON.stringify(checkHoverPositions.result.value, null, 2));
  ws.close();
})();
