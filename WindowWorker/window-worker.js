if(!window.WindowWorkerURL){window.WindowWorkerURL='https://worker-window.vercel.app';}
window.WindowWorkerEvents = new Map();
window.addEventListener("message", function(e) {
  if (e.data.WindowWorkerId) {
    edw = e.data.WindowWorkerId;
    e.data = e.data.WindowWorkerData;
    let funs = window.WindowWorkerEvents.get(edw);
    const funs_length = funs.length;
    for (let i = 0; i < funs_length; i++) {
      try {
        funs[i](e);
      } catch (e) { continue; }
    }
    return;

  }


});
window.WindowWorker = class WindowWorker {
  constructor(workerURL) {


    this.readyId = performance.now() + "" + Math.random();
    this.windowWorkerEvents = [];
    WindowWorkerEvents.set(this.readyId, this.windowWorkerEvents);
    
this.loaded = new Promise((resolve, reject) => {
  this.resolve = resolve;
});

this.iframe = this.buildWorker(workerURL, this.readyId,this.resolve);
    
    return this;
    
  }

  terminate() {
    window.WindowWorkerEvents.delete(this.readyId);
    return document.body.removeChild(this.iframe);

  }

  set onmessage(msg) {
    let wwe = WindowWorkerEvents.get(this.readyId);
    wwe[wwe.length] = msg;
    WindowWorkerEvents.set(this.readyId,wwe);
    return wwe;

  }

  addEventListener(msgevent, msg) {

    if (msgevent == "message") {
      let wwe = WindowWorkerEvents.get(this.readyId);
      wwe[wwe.length] = msg;
      WindowWorkerEvents.set(this.readyId,wwe);
      return wwe;

    } else {

      return super.addEventListener(msgevent, msg);

    }


  }


  postMessage(message, transfer) {

    return this.iframe.contentWindow.postMessage(message, window.WindowWorkerURL, transfer);

  }


  async buildWorker(wURL, trid, res) {
    let wj = await fetch(wURL);
    let wjs = await wj.text();
    let crf = document.createElement('iframe');
    crf.setAttribute('readyId', trid);
    crf.res = res;
    crf.style = 'visibility:hidden;height:0px;width:0px;';
    crf.setAttribute('frameborder', '0');
    crf.referrerpolicy = 'no-referrer';
    //crf.sandbox="allow-scripts allow-top-navigation";
    crf.src = window.WindowWorkerURL+'/worker.html?' + encodeURIComponent(JSON.stringify(window.location)) + '?' + encodeURIComponent(crf.getAttribute('readyId')) + '?' + encodeURIComponent(JSON.stringify(window.navigator));
    document.body.appendChild(crf);
  window.addEventListener("message", (event) => {

      let lid = 'loaded' + crf.getAttribute('readyId');
      if (event.data === lid) {
       this.loaded = crf.res();
      }
  });      window.addEventListener("message", (event) => {

      let rid = 'ready' + crf.getAttribute('readyId');
      if (event.data === rid) {
        let data = {};
        data.script = encodeURIComponent(wjs);
        crf.contentWindow.postMessage(data, window.WindowWorkerURL);
        crf.setAttribute('active', 'active');
      }
    });
    this.iframe = crf;
    return this.iframe;
  }

};




if (typeof Worker === 'undefined') {
  globalThis.Worker = WindowWorker;
}


