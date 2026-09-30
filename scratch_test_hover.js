const http = require('http');
const fs = require('fs');
const path = require('path');

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

  // Reload page to get fresh state
  await send('Page.reload');
  await new Promise(r => setTimeout(r, 2000));

  // 1. Take a screenshot of the hero with the new headline ("Building the [badge] web.")
  const heroSnap = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync('C:\\Users\\Admin\\.gemini\\antigravity-ide\\brain\\b94d88db-391c-4bc9-87e4-2312addcadc8\\scratch\\snap_headline_badge.png', Buffer.from(heroSnap.data, 'base64'));
  console.log('Saved snap_headline_badge.png');

  // 2. Hover card 0 (MSJ ERP) using real CDP mouseMoved event
  const card0Coords = await send('Runtime.evaluate', {
    expression: `(() => {
      const c0 = document.querySelectorAll('.hero-ref__card')[0];
      const r = c0.getBoundingClientRect();
      return { x: r.left + r.width / 2, y: r.top + 30 };
    })()`,
    returnByValue: true
  });
  console.log('Moving mouse to card 0:', card0Coords.result.value);

  await send('Input.dispatchMouseEvent', {
    type: 'mouseMoved',
    x: card0Coords.result.value.x,
    y: card0Coords.result.value.y
  });
  await new Promise(r => setTimeout(r, 800));

  const card0HoverMetrics = await send('Runtime.evaluate', {
    expression: `(() => {
      const hero = document.querySelector('.hero-ref');
      const h = hero.getBoundingClientRect();
      const btn = document.querySelector('.hero-ref__pill-btn').getBoundingClientRect();
      const card0 = document.querySelectorAll('.hero-ref__card')[0];
      const r = card0.getBoundingClientRect();
      const badge = card0.querySelector('.hero-ref__card-badge').getBoundingClientRect();
      return {
        heroBottom: Math.round(h.bottom),
        btnBottom: Math.round(btn.bottom),
        cardTop: Math.round(r.top),
        cardBottom: Math.round(r.bottom),
        cardHeight: Math.round(r.height),
        badgeBottom: Math.round(badge.bottom),
        spaceAboveHeroBottom: Math.round(h.bottom - r.bottom),
        spaceBelowCTA: Math.round(r.top - btn.bottom),
        fullyInsideHero: r.bottom <= h.bottom && r.top >= btn.bottom
      };
    })()`,
    returnByValue: true
  });
  console.log('Card 0 hover metrics:', JSON.stringify(card0HoverMetrics.result.value, null, 2));

  const card0Snap = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync('C:\\Users\\Admin\\.gemini\\antigravity-ide\\brain\\b94d88db-391c-4bc9-87e4-2312addcadc8\\scratch\\snap_card0_hover.png', Buffer.from(card0Snap.data, 'base64'));
  console.log('Saved snap_card0_hover.png');

  // 3. Hover card 5 (DevMetrics) using real CDP mouseMoved event
  const card5Coords = await send('Runtime.evaluate', {
    expression: `(() => {
      const c5 = document.querySelectorAll('.hero-ref__card')[5];
      const r = c5.getBoundingClientRect();
      return { x: r.left + r.width / 2, y: r.top + 30 };
    })()`,
    returnByValue: true
  });
  console.log('Moving mouse to card 5:', card5Coords.result.value);

  await send('Input.dispatchMouseEvent', {
    type: 'mouseMoved',
    x: card5Coords.result.value.x,
    y: card5Coords.result.value.y
  });
  await new Promise(r => setTimeout(r, 800));

  const card5HoverMetrics = await send('Runtime.evaluate', {
    expression: `(() => {
      const hero = document.querySelector('.hero-ref');
      const h = hero.getBoundingClientRect();
      const btn = document.querySelector('.hero-ref__pill-btn').getBoundingClientRect();
      const card5 = document.querySelectorAll('.hero-ref__card')[5];
      const r = card5.getBoundingClientRect();
      const badge = card5.querySelector('.hero-ref__card-badge').getBoundingClientRect();
      return {
        heroBottom: Math.round(h.bottom),
        btnBottom: Math.round(btn.bottom),
        cardTop: Math.round(r.top),
        cardBottom: Math.round(r.bottom),
        cardHeight: Math.round(r.height),
        badgeBottom: Math.round(badge.bottom),
        spaceAboveHeroBottom: Math.round(h.bottom - r.bottom),
        spaceBelowCTA: Math.round(r.top - btn.bottom),
        fullyInsideHero: r.bottom <= h.bottom && r.top >= btn.bottom
      };
    })()`,
    returnByValue: true
  });
  console.log('Card 5 hover metrics:', JSON.stringify(card5HoverMetrics.result.value, null, 2));

  const card5Snap = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync('C:\\Users\\Admin\\.gemini\\antigravity-ide\\brain\\b94d88db-391c-4bc9-87e4-2312addcadc8\\scratch\\snap_card5_hover.png', Buffer.from(card5Snap.data, 'base64'));
  console.log('Saved snap_card5_hover.png');

  ws.close();
})();
