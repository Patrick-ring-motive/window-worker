class WindowWorker {
  constructor(workerURL) {
    this.iframe = buildWorker(workerURL);
  }
  

}


  
    async function buildWorker(workerURL){
      let wj = await fetch(workerURL);
      let wjs=await wj.text();
      let crf = document.createElement('iframe');
      crf.setAttribute('readyId',new Date().getTime()); 
      crf.style='visibility:hidden;height:0px;width:0px;';
      crf.setAttribute('frameborder','0');
      crf.src = 'https://windowworker.github.io/worker/worker.html?'+encodeURIComponent(window.location.origin)+'?'+encodeURIComponent(crf.getAttribute('readyId'));
      document.body.appendChild(crf); 
      window.addEventListener("message", (event) => {
        console.log(event);
          if (event.origin !== "https://windowworker.github.io")
       return;
        let rid = 'ready' + crf.getAttribute('readyId');
      if(event.data===rid){
      let data={};
        data.script=encodeURIComponent(wjs);
        crf.contentWindow.postMessage(data,'https://windowworker.github.io');
        crf.setAttribute('active','active');
      }
      });
    return crf;
   }


      

