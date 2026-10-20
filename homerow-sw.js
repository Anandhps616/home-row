var C='home-row-v2';
var FILES=['./','./homerow-app.html','./homerow.webmanifest','./homerow-192.png','./homerow-512.png'];
self.addEventListener('install',function(e){
  e.waitUntil(caches.open(C).then(function(c){return c.addAll(FILES)}));
  self.skipWaiting();
});
self.addEventListener('activate',function(e){
  e.waitUntil(caches.keys().then(function(k){return Promise.all(k.filter(function(x){return x!==C}).map(function(x){return caches.delete(x)}))}).then(function(){return self.clients.claim()}));
});
self.addEventListener('fetch',function(e){
  if(e.request.method!=='GET')return;
  e.respondWith(
    fetch(e.request).then(function(res){
      if(res&&(res.ok||res.type==='opaque')){var cp=res.clone();caches.open(C).then(function(c){c.put(e.request,cp)})}
      return res;
    }).catch(function(){return caches.match(e.request).then(function(r){return r||caches.match('./homerow-app.html')})})
  );
});
