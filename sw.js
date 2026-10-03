const CACHE="kaizen-shell-v14";
const ASSETS=["./","./index.html","./manifest.json","./icons/icon.svg"];
self.addEventListener("install",event=>{event.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)));self.skipWaiting()});
self.addEventListener("activate",event=>{event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))));self.clients.claim()});
self.addEventListener("fetch",event=>{
 const url=new URL(event.request.url);
 if(url.origin!==self.location.origin)return;
 event.respondWith(fetch(event.request).then(response=>{
   const copy=response.clone();caches.open(CACHE).then(c=>c.put(event.request,copy));return response;
 }).catch(()=>caches.match(event.request)));
});