window-worker [![Build Status](https://travis-ci.com/nolanlawson/pseudo-worker.svg?branch=master)](https://travis-ci.com/nolanlawson/pseudo-worker) [![Coverage Status](https://coveralls.io/repos/nolanlawson/pseudo-worker/badge.svg?branch=master&service=github)](https://coveralls.io/github/nolanlawson/pseudo-worker?branch=master)
 \
Todo: \
Examples \
Docs \

A tiny and mostly spec-compliant [WebWorker](https://www.w3.org/TR/workers/) polyfill, 
designed for [browsers that don't support WebWorkers](http://caniuse.com/#feat=webworkers), 
or for browsers that don't support [certain features of WebWorkers](http://html5workertest.com/).

Typically desktop browsers will run isolated frames in independent threads from the main one so you can get the benefits of multithreading. 
Various techniques are utilized to instruct browsers to run the iframe as separate and isolated.




Usage
----


You can use it directly as a script tag:

```html
<script src="https://winwork.vercel.app/WindowWorker/window-worker.js"></script>
```

Then it's available as `window.WindowWorker`. Or for the polyfill Worker if there is not Worker defined





**Note:** inside the worker, you _must_ use the `self` variable instead 
of the implicit global object. I.e. do this:

```js
self.location
```

Not this:

```js
location
```

