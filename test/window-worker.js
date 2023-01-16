window.WindowWorkerEvents=new Map();
window.addEventListener("message",function(e){
      
     if(e.data.rid){
     
       let fun = WindowWorkerEvents.get(e.data.rid);
       e.data=e.data.msg;
       return fun(e);
       
       
       
     }
    
    
});
class WindowWorker {
  constructor(workerURL) {
    this.readyId=""+new Date().getTime();
    this.iframe = this.buildWorker(workerURL,this.readyId);
  }
  

  
   set onmessage(msg) {

    return WindowWorkerEvents.set(this.readyId,msg);

  }

   addEventListener(msgevent,msg){

   if(msgevent=="message"){

return WindowWorkerEvents.set(this.readyId,msg);

   }else{

   return super.addEventListener(msgevent,msg);

   }


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
   //   crf.sandbox="allow-scripts";
      crf.src = 'https://windowworker.github.io/worker/worker.html?'+encodeURIComponent(JSON.stringify(window.location))+'?'+encodeURIComponent(crf.getAttribute('readyId'));
      document.body.appendChild(crf); 
      window.addEventListener("message", (event) => {
    
        let rid = 'ready' + crf.getAttribute('readyId');
      if(event.data===rid){
      console.log(event);
      let data={};
        data.script=encodeURIComponent(wjs);
        crf.contentWindow.postMessage(data,'https://windowworker.github.io');
        crf.setAttribute('active','active');
      }
      });
    return crf;
   }

};


 


      

