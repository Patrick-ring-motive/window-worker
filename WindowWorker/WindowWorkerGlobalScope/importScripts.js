      window.importScripts = function (){
        const arguments_length=arguments.length;
        for (let i = 0; i < arguments_length; i++) {
            const request = new XMLHttpRequest();
            request.open('GET', arguments[i], false); 
            request.send(null);
            if (request.status === 200) {
              try{
                eval?.(request.responseText);
              }catch(e){
                  try{
                    eval(request.responseText);
                  }catch(e){
                      const script = document.createElement('script');
                      script.type = 'text/javascript';
                      script.innerHTML = request.responseText;
                      document.head.appendChild(script);        
                   }
              
              }
            }
        }   
      
      }
