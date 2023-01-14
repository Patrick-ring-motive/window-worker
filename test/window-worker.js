class WindowWorker {
  constructor(workerURL) {
    this.readyId=new Date().getTime();
    this.iframe = this.buildWorker(workerURL,this.readyId);
  }
  
  handleMessage(e,msg){
  
   if(e.data.rid==this.readyId){
     e.data=e.data.msg;
      return msg(e);
   }
  }
  
   set onmessage(msg) {
     let hm=this.handleMessage;
    window.addEventListener("message",function(e,hm,msg){
      
     hm(e,msg);
    
    
    };
  }
  
   postMessage(message,transfer){
   
     return this.iframe.contentWindow.postMessage(message, 'https://windowworker.github.io', transfer);
     
   }
  
  
  async  buildWorker (wURL,trid){
      let wj = await fetch(wURL);
      let wjs=await wj.text();
      let crf = document.createElement('iframe');
      crf.setAttribute('readyId',trid); 
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

};


 


      

