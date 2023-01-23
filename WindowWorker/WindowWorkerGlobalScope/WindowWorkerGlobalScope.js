
      window.WindowWorkerLocation = JSON.parse(decodeURIComponent(window.location.href.split('?')[1]));
      window.WindowWorkerNavigator = decodeURIComponent(window.location.href.split('?')[3]);
  
try{

window.WindowWorkerNavigator = JSON.parse(window.WindowWorkerNavigator);

}catch(e){console.log("navigator too long");window.WindowWorkerNavigator =JSON.parse(JSON.stringify(window.navigator)); }

      var ParentOrigin = window.WindowWorkerLocation.origin;
      var readyId = decodeURIComponent(window.location.href.split('?')[2]);  
      
      
     window.WindowWorkerPostMessage = function(message, transfer){
      let data=message;
      
       data.rid=readyId;
     return window.parent.postMessage(data, ParentOrigin, transfer);
        
     }
      const loc = {
         get(window, prop, receiver) {
                  if (prop === "location") {
                    return window.WindowWorkerLocation;
                  }

                  if (prop === "origin") {
                    return window.WindowWorkerLocation.origin;
                  }

                  if (prop === "fonts") {
                    return document.fonts;
                  }


                  if (prop === "navigator") {
                    return window.WindowWorkerNavigator;
                  }


                 return Reflect.get(...arguments);
         },   set(window, prop, value) {
                  if (prop === "onmessage") {
                    window.onmessage = value;
                        return window.onmessage;
                  }


                 return Reflect.set(...arguments);
         }
        };

      var self = new Proxy(window, loc);
      
              self.postMessage = window.WindowWorkerPostMessage;
      
      window.addEventListener("message", (event) => {
        //console.log(event);
          if (event.origin !== ParentOrigin){return;}
        if(document.getElementById('main-script')){return;}
      var WindowWorkerScript = document.createElement('script');
        WindowWorkerScript.id='main-script';
      WindowWorkerScript.innerHTML = 'void async function winworker(){'+decodeURIComponent(event.data.script)+'}();window.parent.postMessage("loaded"+readyId,ParentOrigin);';
      document.body.appendChild(WindowWorkerScript); 
      });
      
      window.parent.postMessage('ready'+readyId,ParentOrigin);
