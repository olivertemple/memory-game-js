const mem = "memoryGame";
const assets = [
  "./",
  "./index.html",
  "./style.css",
  "./mobilestyle.css",
  "./script.js",
  "./resources/bicycle.png",
  "./resources/car.png",
  "./resources/circle.png",
  "./resources/leaf.png",
  "./resources/phone.png",
  "./resources/plane.png",
  "./resources/square.png",
  "./resources/triangle.png",
  "./resources/icon512.png",

];

self.addEventListener("install", installEvent => {
  installEvent.waitUntil(
    caches.open(mem).then(cache => {
      cache.addAll(assets);
    })
  );
});

self.addEventListener("fetch", fetchEvent => {
  fetchEvent.respondWith(
    caches.match(fetchEvent.request).then(res => {
      return res || fetch(fetchEvent.request);
    })
  );
});
