window-worker [![Build Status](https://travis-ci.com/nolanlawson/pseudo-worker.svg?branch=master)](https://travis-ci.com/nolanlawson/pseudo-worker) [![Coverage Status](https://coveralls.io/repos/nolanlawson/pseudo-worker/badge.svg?branch=master&service=github)](https://coveralls.io/github/nolanlawson/pseudo-worker?branch=master)
 \
Todo: \
Examples \
Docs 

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

Then it's available as `window.WindowWorker`. Or as a polyfill Worker if there is not Worker defined





**Note:** inside the worker, you _must_ use the `self` variable instead 
of the implicit global object. I.e. do this:

```js
self.location
```

Not this:

```js
location
```

Specifically the values for `self.location`,`self.origin`,`self.navigator`,`self.onmessage`, and `self.postMessage` had to be replaced via proxy as they are not mutable on the `window` without major side effects.\
For the sake of completeness I felt it necessary to add those values to the window object using Unicode monospaced characters and camel case with the 'WindowWorker' prefix as shown here:


`self.location = window.WindowWorkerLocation = window.𝚕𝚘𝚌𝚊𝚝𝚒𝚘𝚗`

`self.origin = window.WindowWorkerLocation.origin = window.𝚘𝚛𝚒𝚐𝚒𝚗`

`self.navigator = window.WindowWorkerNavigator = window.𝚗𝚊𝚟𝚒𝚐𝚊𝚝𝚘𝚛`

`self.postMessage = window.WindowWorkerPostMessage`

The self proxy has to explicitly return window.onmessage instead of self.onmessage because apparently the latter causes an invocation error.


You can view the basic example at [https://winwork.vercel.app/examples/index.html](https://winwork.vercel.app/examples/index.html) borrowed from them same mdn example for a basic worker [https://github.com/mdn/dom-examples/tree/main/web-workers/simple-web-worker](https://github.com/mdn/dom-examples/tree/main/web-workers/simple-web-worker).


