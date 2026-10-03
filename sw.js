const CACHE="gamenight-v1791039228";
const ASSETS=["./de.js","./index.html","./manifest.webmanifest","./icon-192.png","./icon-512.png","./icon-512-maskable.png","./qrcode.min.js","./fonts/anton.woff2","./fonts/caveat.woff2","./fonts/nunito.woff2","./fonts/cinzel.woff2","./avatars/a1.webp","./avatars/a2.webp","./avatars/a3.webp","./avatars/a4.webp","./avatars/a5.webp","./avatars/a6.webp","./avatars/a7.webp","./avatars/a8.webp","./avatars/a9.webp","./avatars/a10.webp","./avatars/a11.webp","./avatars/a12.webp","./avatars/a13.webp","./avatars/a14.webp","./avatars/a15.webp","./avatars/a16.webp","./avatars/a17.webp","./avatars/a18.webp","./avatars/a19.webp","./avatars/a20.webp","./avatars/a21.webp","./avatars/a22.webp","./avatars/a23.webp","./avatars/a24.webp","./avatars/a25.webp","./avatars/a26.webp","./avatars/a27.webp","./avatars/a28.webp","./avatars/a29.webp","./avatars/a30.webp","./avatars/a31.webp","./avatars/a32.webp","./avatars/a33.webp"];
self.addEventListener("install",e=>{// every file on its own: one failed download (bad mobile network) must not block the whole update
  e.waitUntil(caches.open(CACHE).then(c=>Promise.all(ASSETS.map(u=>c.add(new Request(u,{cache:"reload"})).catch(()=>{})))).then(()=>self.skipWaiting()))});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k.startsWith("gamenight-")&&k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener("fetch",e=>{
  if(e.request.method!=="GET")return;
  const u=new URL(e.request.url);
  if(u.origin===location.origin&&(e.request.mode==="navigate"||/\/(index\.html)?$/.test(u.pathname))){
    // the page itself: network first (so an update shows up at once), cache when offline
    e.respondWith(fetch(e.request,{cache:"no-cache"}).then(res=>{if(res.ok){const cp=res.clone();caches.open(CACHE).then(c=>c.put("./index.html",cp))}return res}).catch(()=>caches.match("./index.html")));
    return;
  }
  if(u.origin===location.origin){
    // app shell: cache-first, fall back to index.html when offline
    e.respondWith(caches.match(e.request,{ignoreSearch:true}).then(r=>r||fetch(e.request).then(res=>{if(res.status===200){const cp=res.clone();caches.open(CACHE).then(c=>c.put(e.request,cp)).catch(()=>{})}return res})));
    return;
  }
  if(/(^|\.)(fonts\.googleapis\.com|fonts\.gstatic\.com|cdnjs\.cloudflare\.com)$/.test(u.hostname)){
    // fonts + QR library: cache-first with network fallback
    e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request).then(res=>{const cp=res.clone();caches.open(CACHE).then(c=>c.put(e.request,cp));return res}).catch(()=>r)));
  }
  // everything else (the game database, event streams) goes straight to the network
});
