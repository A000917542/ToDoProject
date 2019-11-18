"use strict";

importScripts('https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js');

workbox.precaching.precacheAndRoute([
    '/index.htm'
  ]);

workbox.routing.registerRoute(
    /\.css$/,
    new workbox.strategies.StaleWhileRevalidate({
        cacheName: 'css-cache',
    })
);

workbox.routing.registerRoute(
    /\.js$/,
    new workbox.strategies.StaleWhileRevalidate({
        cacheName: 'js-cache',
    })
);

workbox.routing.registerRoute(
    /\.htm(l?)$/,
    new workbox.strategies.StaleWhileRevalidate({
        cacheName: 'html-cache',
    })
);

workbox.routing.registerRoute(
    /\.(?:png|jpg|jpeg|svg|gif)$/,
    new workbox.strategies.StaleWhileRevalidate({
        cacheName: 'img-cache',
    })
);

workbox.routing.setDefaultHandler(
    new workbox.strategies.StaleWhileRevalidate()
);