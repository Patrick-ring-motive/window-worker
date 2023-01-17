window.WindowWorkerEvents=new Map();
window.addEventListener("message",function(e){
      
     if(e.data.rid){
      e.data=e.data.msg;
       let funs = WindowWorkerEvents.get(e.data.rid);
           const funs_length=funs.length;
           for(let i=0;i<funs_length;i++){try{
                  funs[i](e);
           }catch(e){continue;}}
       return;
       
     }
    
    
});
class WindowWorker {
  constructor(workerURL) {
      
     
    this.readyId=performance.now()+""+Math.random();
        this.windowWorkerEvents=[];
        WindowWorkerEvents.set(this.readyId,this.windowWorkerEvents);
    this.iframe = this.buildWorker(workerURL,this.readyId);

  }
  
   terminate(){
      WindowWorkerEvents.delete(this.readyId);
     return document.body.removeChild(this.iframe);

   }
  
   set onmessage(msg) {
      let wwe = WindowWorkerEvents.get(this.readyId);
         wwe[wwe.length]=msg;
    return wwe;

  }

   addEventListener(msgevent,msg){

   if(msgevent=="message"){
      let wwe = WindowWorkerEvents.get(this.readyId);
         wwe[wwe.length()]=msg;
      return wwe;

   }else{

   return super.addEventListener(msgevent,msg);

   }


    }

  
   postMessage(message,transfer){
   
     return this.iframe.contentWindow.postMessage(message, 'https://worker-window.vercel.app', transfer);
     
   }
  
  
  async  buildWorker (wURL,trid){
      let wj = await fetch(wURL);
      let wjs=await wj.text();
      let crf = document.createElement('iframe');
      crf.setAttribute('readyId',trid); 
      crf.style='visibility:hidden;height:0px;width:0px;';
      crf.setAttribute('frameborder','0');
      crf.referrerpolicy='no-referrer';
      //crf.sandbox="allow-scripts allow-top-navigation";
      crf.src = 'https://worker-window.vercel.app/worker.html?'+encodeURIComponent(JSON.stringify(window.location))+'?'+encodeURIComponent(crf.getAttribute('readyId'))+'?'+encodeURIComponent(JSON.stringify(window.navigator));
      document.body.appendChild(crf); 
      window.addEventListener("message", (event) => {
    
        let rid = 'ready' + crf.getAttribute('readyId');
      if(event.data===rid){
      console.log(event);
      let data={};
        data.script=encodeURIComponent(wjs);
        crf.contentWindow.postMessage(data,'https://worker-window.vercel.app');
        crf.setAttribute('active','active');
      }
      });
        this.iframe = crf;
    return crf;
   }

};


 


      

