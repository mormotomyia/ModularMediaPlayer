// import { Packet } from "./packet";
import { MediaCanvas, MediaType } from "../src/visuals/media-canvas";
import ReconnectingWebSocket from "reconnecting-websocket";
import { MediaCanvasFactory } from "./visuals/media-canvas-factory";
import { CustomMormoVideo } from "./visuals/custom-video";
//  ?x={"0":%20{"p1":%20{"x":%200,%20"y":%200},%20"p2":%20{"x":%201080,%20"y":%201920},%20"rotate":%20false}}
console.log(window.location.search)
const log = new URLSearchParams(window.location.search)
console.log(JSON.parse(log.get('x')))
console.log(JSON.stringify({'x':'x'}))


const a = {keyframes:
  [
    { transform: 'translateY(-300px)' }
  ], options:{
    // timing options
    duration: 1000,
    iterations: Infinity
  }
}


console.log(JSON.stringify(a))

function container_filler(screens: any){
    for (const property in screens){
        console.log(property)
    }
 }
 
 
 function display_medium(object:{content_id:string,content_type:string}): string{
     // new HTMLElement()
     // document.createElement('div')
     if (object.content_type !== undefined && object.content_id !== undefined){
         return `<div id="${object.content_type}"> ${object.content_id}</div>` 
     }
 }


let websocket = (): ReconnectingWebSocket => {
  const options = {
    maxReconnectionDelay: 10000,
    minReconnectionDelay: 1000 + Math.random() * 4000,
    reconnectionDelayGrowFactor: 1.3,
    minUptime: 5000,
    connectionTimeout: 4000,
    maxRetries: Infinity,
    maxEnqueuedMessages: Infinity,
    startClosed: false,
    debug: false,
  };
  let connection = new ReconnectingWebSocket(
    "ws://localhost:8765",
    [],
    options
  );
  return connection;
};


const test = new MediaCanvasFactory(
  document.getElementById("container"),
  1,
  { x: 1080, y: 1920 },
  {
  0: {
    p1: { x: 0, y: 0 },
    p2: { x: 1080, y: 1920 },
    rotate: false }


  },
     
        

  true
);

test.render();




setTimeout(
  () =>
    test.setMedia(0, 90, [
      {
        element: "0",
        type: MediaType.HTML,
        source: "http://localhost:5051/banner.json",
      }
    ]),
  1200
);


// setTimeout(
//   () =>
//     test.setMedia(0, 5, [
//       {
//         element: "0",
//         type: MediaType.Image,
//         source: "http://localhost:5051/img2.jpg",
//       }
//     ]),
//   2600
// );







// setTimeout(() => test.setMedia(1), 7500);
