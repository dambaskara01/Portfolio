const WebSocket = require('ws');

const wsUrl = 'ws://127.0.0.1:9222/devtools/page/BA09E5FF6593EB34BE1CB4085EA0BC7C';
const ws = new WebSocket(wsUrl);

function send(method, params = {}) {
  return new Promise((resolve) => {
    const id = Math.floor(Math.random() * 100000);
    const handler = (msg) => {
      const res = JSON.parse(msg);
      if (res.id === id) {
        ws.off('message', handler);
        resolve(res.result);
      }
    };
    ws.on('message', handler);
    ws.send(JSON.stringify({ id, method, params }));
  });
}

ws.on('open', async () => {
  const result = await send('Runtime.evaluate', {
    expression: `(() => {
      const hero = document.querySelector('.hero-ref');
      const heroRect = hero.getBoundingClientRect();
      const stage = document.querySelector('.hero-ref__deck-stage');
      const stageRect = stage.getBoundingClientRect();
      const cards = Array.from(document.querySelectorAll('.hero-ref__card')).map((card, i) => {
        const r = card.getBoundingClientRect();
        return {
          index: i,
          top: r.top,
          bottom: r.bottom,
          height: r.height,
          heroBottomDiff: heroRect.bottom - r.bottom
        };
      });
      return {
        hero: { top: heroRect.top, bottom: heroRect.bottom, height: heroRect.height },
        stage: { top: stageRect.top, bottom: stageRect.bottom, height: stageRect.height },
        cards
      };
    })()`,
    returnByValue: true
  });
  console.log(JSON.stringify(result.value, null, 2));
  ws.close();
  process.exit(0);
});
