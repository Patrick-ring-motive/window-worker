window.fonts=document.fonts;
    try{
    window.𝚕𝚘𝚌𝚊𝚝𝚒𝚘𝚗 = JSON.parse(decodeURIComponent(window.location.href.split('?')[1]));
    window.𝚘𝚛𝚒𝚐𝚒𝚗 = window.𝚕𝚘𝚌𝚊𝚝𝚒𝚘𝚗.origin;
 }catch(e){}
  try{
     window.𝚗𝚊𝚟𝚒𝚐𝚊𝚝𝚘𝚛 = JSON.parse(decodeURIComponent(window.location.href.split('?')[3]));
    }catch(e){}
