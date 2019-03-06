export default function ServiceWorkerHelper(workerLocation, openUICallback){

  // check if service worker available in browser
  if( !navigator.serviceWorker ) throw new Error('Service Worker not supported')

  let activeWorker;

  // switch active worker
  const switchWorker = (worker)=>{
    activeWorker = worker; // update active worker
    openUICallback()  // ask user about the update
  }

  // listen for install finish and switch active worker
  const trackInstalling = (worker)=>{
    worker.addEventListener('statechange', ()=>{
      if(worker.state == 'installed') switchWorker(worker)
    })
  }

  // switch to waiting worker now (rather than page refresh)
  const workerSkipWaiting = ()=>{
    if (activeWorker == undefined) throw new Error("No active worker")  // 
    return activeWorker.postMessage({action: 'skipWaitng'})
  }


  navigator.serviceWorker.register(workerLocation)
  .then( reg =>{

    // no existing service worker
    if(!navigator.serviceWorker.controller) return // exit the function - don't need to trigger updateUI

    // registered service worker is waiting 
    if( reg.waiting ) { switchWorker( reg.waiting ); return; } // switch to the new service worker

    // registered service worker is still installing
    if(reg.installing){ trackInstalling(reg.installing) } // listen for when install finished & switchWorker
    
    // listen for updates to newly registered worker
    reg.addEventListener('updatefound', ()=>{ trackInstalling(reg.installing) } )

  })

  return{
    workerSkipWaiting
  }
}