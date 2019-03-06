
'use strict';

console.log("Service worker doing something");

// create the caches for the files
const staticCacheName = "static-v1.1";
let allCaches= [
  staticCacheName
]

// do things to do after install
self.addEventListener('install', event =>{
  event.waitUntil(

    // store the skeleton of the site
    caches.open(staticCacheName)
    .then( cache =>{
      return cache.addAll([
        // html
        '/',
        // images
        // css
        '/css/layout.css',
        '/css/styles.css',
        'https://fonts.googleapis.com/css?family=Roboto',
        // js
        '/js/main.js',
        '/js/SwHelper.js',
        './js/DbHelper.js',
        '/components/ProjectCard.js'
      ])
    })
  )
})

// do things after becomes active
self.addEventListener('activate', event =>{
  
  // delete old caches
  event.waitUntil(
    caches.keys()
    .then (cacheNames =>{
      return Promise.all(
        cacheNames.filter( cacheName =>{ return !allCaches.includes(cacheName) }) // filter out cache names we still want
        .map( cacheName =>{ return caches.delete(cacheName) })  // delete unwanted caches
      )
    })
  )
})

// intercept fetch requests and serve from cache
self.addEventListener('fetch', event =>{
  const requestUrl = new URL(event.request.url);

  // offline first - only get from network if not in cache
  if(requestUrl.origin == location.origin){ // if request origin is from us
    event.respondWith(
      caches.match(event.request)
      .then(response=>{
        return response || fetch(event.request)
      })
    )
  }
})


// listen for if we are told to take control
self.addEventListener('message', event =>{
  if (event.data.action == 'skipWaiting') self.skipWaiting()
})
